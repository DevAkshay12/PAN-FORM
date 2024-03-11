const cds = require('@sap/cds');
const{Readable }= require('stream')
const {jwtDecode} = require('jwt-decode');
const { getMaxListeners } = require('events');
const axios = require('axios');
module.exports = cds.service.impl(async function () {
    let {
        attachments,tab1,tab2,tab3,vendor_data,Fvendor_responseoo,PAYMENT_TERM_DETAILS,WORKFLOW_HISTORY,PAN_PRICE_DETAILS,PAN_Payment_Method_Drop,PAN_Comments ,
        PAN_Details_APR,PAN_WEB_EVENT_APR,PAN_TYPE_APR,PAN_vendor_data_APR,PAN_vendor_response_APR,PAN_PAYMENT_TERM_DETAILS_APR,PAN_PRICE_DETAILS_APR,PAN_WORKFLOW_HISTORY_APR,PAN_attachments_APR,PAN_Payment_Method_Drop_APR,PAN_Comments_APR
    } = this.entities;

const AribaSrv = await cds.connect.to('ARIBA_DEV');
const c1re = await cds.connect.to('iflow1');

this.before('READ',tab1,async (req)=>{ 
    var vcap = JSON.parse(process.env.VCAP_SERVICES);
        var panformDest;
        // let auth = req?.headers?.authorization;
        // console.log(auth);
        // console.log(vcap);
        vcap.destination.forEach((dest)=>{
            if (dest?.name != undefined && dest?.name == "Plantmappingfinal-destination-service"){
                panformDest = dest;
            }
        });
        // panformDest = vcap.destination[0];
        console.log(panformDest);


        var tokenurl = panformDest.credentials.url + "/oauth/token?grant_type=client_credentials";
        var basicAuth = panformDest.credentials.clientid + ":" + panformDest.credentials.clientsecret;
        var basicAuth = btoa(basicAuth);
        var basicStr = "Basic " + basicAuth;
         

        var axiosTokenResp = await axios.request({
            url: tokenurl,
            method :'get',
            headers:{
                Authorization : basicStr
            }
        })
        var accesstoken = axiosTokenResp.data.access_token;
        
        var authDest = axiosTokenResp.data.token_type + " " + accesstoken;
        console.log(authDest);
        console.log(panformDest.credentials);

        var destinationurl = panformDest.credentials.uri + "/destination-configuration/v1/destinations/Plantmappingfinal-srv-api"
        console.log(destinationurl);
        var destinationResp = await axios.request({
            url: destinationurl,
            method:'get',
            headers:{
                Authorization : authDest
            }
        })

        var baseSrvUrl = destinationResp?.data?.destinationConfiguration?.URL;
        // let pan = await SELECT.from(tab1);
//         try{
//         // pan.forEach(async element => {
//         for(let i =0;i<pan.length;i++){
//         if(pan[i].PAN_Number!='pan12'){
//         var reqUrl = baseSrvUrl + `/odata/v4/my/plant/${pan[i].Plant_Code}`
//         var srvResp = await axios.request({
//             url: reqUrl,
//             method: 'get'
//         });
//         console.log(srvResp);
//     }
//     }
// }catch(error){
//     console.log(error);
// }

        // console.log(srvResp?.data?.value[1]);
    // })
    // quality domain
    // https://tata-projects-limited-tpl-ariba-uat-dzu885iy-tpl-aruat-48c5f432.cfapps.eu10-004.hana.ondemand.com
    // test domain
    // https://tata-projects-limited-btp-dev-0or0hi20-dev-space-plantm790a9887.cfapps.eu10-004.hana.ondemand.com
    try {
        let pan = await SELECT.from(tab1);
        // pan.forEach(async element => {
        for(let i =0;i<pan.length;i++){
            if(pan[i].Plant_Code){
                var reqUrl = baseSrvUrl + `/odata/v4/my/plant/${pan[i].Plant_Code}`
                
                try{
                    var srvResp = await axios.request({
                        url: reqUrl,
                        method: 'get'
                    });
                    console.log(srvResp);
            // console.log();
            if(srvResp){
            let srv = await UPDATE(tab1,pan[i].PAN_Number).with({SBG:`${srvResp.data.SBG}`,SBU:`${srvResp.data.SBU}`});  
            console.log(srv);
            }
                }catch(error){ 
                    await UPDATE(tab1,pan[i].PAN_Number).with({SBG:null,SBU:null})   
                    console.log(error.message);
                }
            }
        // }); 
        }
        
    } catch (error) {
        console.log(error);
    }

//   return req;

});

// this.on('CREATE',PAYMENT_TERM_DETAILS.drafts,async(req)=>{
//     let data = 'anything';
//     console.log(data);
// });
this.on('updatee', async (req) => {
    let value = JSON.parse(req.data.ID);
    
    let res=await UPDATE(vendor_data.drafts, {
        PAN_Number:value.PAN_Number,
        Proposed_Vendor_Code:value.Proposed_Vendor_Code
    }).with({ Vendor_CE_Date: value.Vendor_CE_Date });
    console.log(res);
    return res;
});

this.on('Listdata', async (req)=>{
    let data = JSON.parse(req.data.ID);
    let auth = req?.headers?.authorization;
        // let response;
        if(auth != undefined){
            let token = auth.split(" ");
            if (token[0]=='Basic'){
                let decod = atob(token[1]);
                let decode = decod.split(":");
                var decoded={
                    "user_name":decode[0]
                }
            }else if(token[0]=='Bearer'){
            var decoded = jwtDecode(token[1]);
            }
        }
    let res = await SELECT.from(tab1).where`created_by = ${decoded['user_name']} and ltrim(rtrim(task_id))!=''`;
    console.log(res);
    // let dat = {
    //     res:res
    // }
    return JSON.stringify(res);
})
this.on ("getcomments",async (req)=>{
    req.data.ID = JSON.parse(req.data.ID);
    let data = await SELECT.from(PAN_Comments).where `PAN_Number = ${req.data.ID}`;
    console.log(data);
    return JSON.stringify(data);

});
this.on ("switch_control",async (req)=>{
    let ID = JSON.parse(req.data.ID);
    let srv = await SELECT.from(WORKFLOW_HISTORY).where`PAN_Number=${ID.PAN_Number}`;
    let data;
    for(let i=0;i<srv.length;i++){
        let control;
    if(srv[i].level==ID.level){
    if(srv[i].Notification_Status=='true'){
        control="false";
    }else{
        control="true";
    }
    data = await UPDATE(WORKFLOW_HISTORY.drafts,({"PAN_Number":ID.PAN_Number,
    "level":ID.level
    })).with({
        "Notification_Status":control
    });
}
}
    console.log(data);
    return JSON.stringify(data);

});
this.on("draft",async (req)=>{
    let pan_number = JSON.parse(req.data.ID);
    console.log(pan_number);
    var ret=0;
    let data = await SELECT.from(Fvendor_responseoo.drafts).where`PAN_Number=${pan_number}`;
    for(let i =0;i<data.length;i++){
        let data1 = data[i];
        // delete data[i].IsActiveEntity;
        // delete data[i].HasActiveEntity;
        // delete data[i].HasDraftEntity;
        // delete data[i].DraftAdministrativeData_DraftUUID;
        // delete data[i].Scope_and_Responsibilities;

        var resp=await DELETE.from(Fvendor_responseoo).where`Proposed_Vendor_Code=${data1["Proposed_Vendor_Code"]} and PAN_Number=${data1["PAN_Number"]}`;
        ret = ret + resp;
    }
    return JSON.stringify(ret);
    
})
this.on('getsync',async (req)=>{
    let data = JSON.parse(req.data.data);
    let auth = req?.headers?.authorization;
        // let response;
        if(auth != undefined){
            let token = auth.split(" ");
            if (token[0]=='Basic'){
                let decod = atob(token[1]);
                let decode = decod.split(":");
                var decoded={
                    "user_name":decode[0]
                }
            }else if(token[0]=='Bearer'){
            var decoded = jwtDecode(token[1]);
            }
        }
    try{
    let url = "https://tata-projects-limited-btp-dev-0or0hi20-dev-space-sync-p3561cac7.cfapps.eu10-004.hana.ondemand.com/odata/v4/catalog/postUserDataDate(userName='VGR',fromDate='"+data.fromdate+"',toDate='"+data.todate+"')";
    const res = await axios.get(url,{
        timeout:120000
    });
}catch(error){
 return JSON.stringify(error);
}
    console.log(res)
    return JSON.stringify(res.data);
    // let body={
    //     "fromdate":data.fromdate,
    //     "todate":data.todate,
    //     "user_name"
    // }  
})
this.on('InsertData',async (req)=>{
    let resp1=await SELECT.from(tab1);
    for(let i = 0;i<resp1.length;i++){
        let ind  = 0;
        let status = ""

        let resp2 = resp1[i];
        switch(resp1[i].status){
            case 'Pending for Approval':
                ind = 2;
                break;
            case 'Justification Needed':
                ind = 2;
                break;
            case 'Rejected':
                ind = 1;
                break;
            case 'Approved':
                ind = 3
                break;
            case 'draft':
                ind = 0;
                break;
            case 'New':
                ind = 0;
                break;
            default:{
                ind  = 0;
                let srv = await UPDATE(tab1,resp1[i].PAN_Number).with({
                    "status":'New'
                });
                break;
            }
        }
        await UPDATE(tab1,resp1[i].PAN_Number).with({
            'statusInd':ind
        });
        if(resp1[i].status=='New'){
            let hist = await SELECT.from(WORKFLOW_HISTORY).where`PAN_Number=${resp1[i].PAN_Number}`;
            if(hist.length!=0){
                let del = await DELETE.from(WORKFLOW_HISTORY).where`PAN_Number=${resp1[i].PAN_Number}`;
                console.log(del);
            }
            
                // let url = "/opu/odata/sap/ZARB_BTP_APPROVAL_SRV/fimpAprovals?plant='"+resp2['Plant_Code']+"'&docType='"+resp2["Order_Type_OR_Document_tyFuuidpe"]+"'&amount='"+resp2["Final_proposed_Value"]+"'&purGroup='"+resp2["BUORPurchasing_Group"]+"'";
                let url = "/opu/odata/sap/ZARB_BTP_APPROVAL_SRV/fimpAprovals?plant=%27"+resp2['Plant_Code']+"%27&docType=%27"+resp2["Order_Type_OR_Document_tyFuuidpe"]+"%27&amount=%27"+resp2["Final_proposed_Value"]+"%27&purGroup=%27"+resp2["BUORPurchasing_Group"]+"%27";
                // let url = "/opu/odata/sap/ZARB_BTP_APPROVAL_SRV/fimpAprovals?plant=%27 %27&plantCode=%27"+resp2["Plant_Code"]+"%27&sbg=%27"+resp2["SBG"]+"%27&sub=%27"+resp2["SBU"]+"%27";
                let response = await AribaSrv.get(url);
                console.log(response);
                for(j=0;j<response.length;j++){
                    let a=[];
                    let b={
                        "idd":j.toString(),
                        "PAN_Number":resp1[i].PAN_Number,
                        "Employee_ID" : response[j].empId,
                        "level" : response[j].level,
                        "Approved_by": "",
                        "Employee_Name" : response[j].empName,
                            "Title" : response[j].title,                         
                            "Notification_Status" : "false",
                            "Result" : "",
                            "Begin_DateAND_Time": "",
                            "End_DateAND_Time": "",
                            "Days_Taken" : "",
                            "Remarks" : ""
                    }
                    a.push(b);
                    await INSERT.into(WORKFLOW_HISTORY).entries(a);
                // }
                
            }
        }
        
    }
    return "success";
});
    //  this.before('READ',PAN_Details_APR,async (req)=>{
    //     let auth = req?.headers?.authorization;
        
    //     if(auth != undefined){
    //         let token = auth.split(" ");
    //         var decoded = jwtDecode(token[1]);
    //         console.log(decoded["user_name"]);
    //     }

    //     let body ={
    //         "pankey" : "PAN123",
    //         "status" : "status Test",
    //         "url" : " ",
    //         "buttonClicked" : "Approved",
    //         "panToAttachNavi" : []
    //     }
        
    //     let response = await AribaSrv.post('/opu/odata/sap/ZARB_BTP_ATTACHMENT_SRV/panHeaderSet',body);
    //     console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    //     console.log(response);
    //     console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

    //  });
    // this.on ("getcomments",async (req)=>{
    //     let data = await SELECT.from(PAN_Comments).where `PAN_Number = ${req.data.ID}`;
    //     console.log(data);
    //     return JSON.stringify(data);

    // });
    // const c5re = await cds.connect.to('iflow1');
    // const AribaSrv = await cds.connect.to('ARIBA_DEV');
    // this.before('READ', tab1, async (req) => {
    //     if(req.params.length==0){
    //     try {
    //         await cds.tx(req).run(DELETE(tab1));
    //         await cds.tx(req).run(DELETE(tab2));
    //         await cds.tx(req).run(DELETE(tab3));
    //         await cds.tx(req).run(DELETE(vendor_data));
    //         await cds.tx(req).run(DELETE(Fvendor_responseoo));
    //         await cds.tx(req).run(DELETE(PAN_PRICE_DETAILS));
    //         await cds.tx(req).run(DELETE(PAYMENT_TERM_DETAILS));
    //         await cds.tx(req).run(DELETE(WORKFLOW_HISTORY));
    //         await cds.tx(req).run(DELETE(WORKFLOW_HISTORY_EMP));
    //         await cds.tx(req).run(DELETE(attachments));
    //         await cds.tx(req).run(DELETE(PAN_proj));
    //         resp1 = await c5re.get("/tab1");//("/tab1?$filter=status eq 'New'");
    //         resp2 = await c5re.get('/tab2');
    //         resp10 = await c5re.get('/tab3');
    //         resp3 = await c5re.get('/vendor_data');
    //         var data2 = [];
    //         resp3.value.forEach(element => {
    //             element = {...element,Proposed_Vendor_Code_nav : `${element.Proposed_Vendor_Code} / ${element.Vendor_Name}`}
    //             data2.push(element);
    //         });
    //         resp4 = await c5re.get('/Fvendor_responseoo');
    //         resp9 = await c5re.get('/PAN_PRICE_DETAILS');
    //         resp5 = await c5re.get('/PAYMENT_TERM_DETAILS');
    //         resp6 = await c5re.get('/WORKFLOW_HISTORY');
    //         resp6.value.forEach(element =>{
    //             if(element.Notification_Status == 'on')
    //             element.Notification_Status = "true";
    //         else element.Notification_Status = "false";
    //         });
    //         resp7 = await c5re.get('/WORKFLOW_HISTORY_EMP');
    //         resp8 = await c5re.get('/attachments');
    //         resp11 = await c5re.get('/PAN_proj');
    //         const data = resp1.value;
            
    //         await INSERT.into(tab1).entries(data);
    //         await INSERT.into(tab2).entries(resp2.value);
    //         await INSERT.into(tab3).entries(resp10.value);
    //         await INSERT.into(vendor_data).entries(data2);
    //         await INSERT.into(Fvendor_responseoo).entries(resp4.value);
    //         await INSERT.into(PAN_PRICE_DETAILS).entries(resp9.value);
    //         await INSERT.into(PAYMENT_TERM_DETAILS).entries(resp5.value);
    //         await INSERT.into(WORKFLOW_HISTORY).entries(resp6.value);
    //         await INSERT.into(WORKFLOW_HISTORY_EMP).entries(resp7.value);
    //         await INSERT.into(attachments).entries(resp8.value);
    //         await INSERT.into(PAN_proj).entries(resp11.value);
    //         return req;
    //     } 
    
    //     catch (error) {
    //         req.error(500, error.message);
    //     }
    // }
    // // return req;
    // });
    this.on('sendforapproval',async(req)=>{ 
        let auth = req?.headers?.authorization;
        let response;
        if(auth != undefined){
            var token = auth.split(" ");
            if (token[0]=='Basic'){
                let decod = atob(token[1]);
                let decode = decod.split(":");
                var decoded={
                    "user_name":decode[0]
                }
            }else if(token[0]=='Bearer'){
            var decoded = jwtDecode(token[1]);
            }
        }   
        console.log("#########USER###########");
        console.log(token);
        console.log(decoded);
        console.log(req.data);
        let data = JSON.parse(req.data.data);
        let resp1 = await SELECT.from(tab1).where`PAN_Number=${data.PAN_Number}`
        if(resp1[0].status=='Justification Needed'){
            response=await UPDATE(tab1,data.PAN_Number).with({
                "status":'Pending for Approval'
            });
            let comm = await SELECT.from(tab1).where`PAN_Number = ${data.PAN_Number}`
            var commentss = null;
            if(comm[0].Comments){
                let ComEnt = {
                    PAN_Number : data.PAN_Number,
                    user : decoded['user_name'],
                    Comments : comm[0].Comments, 
                    status:data.buttonclicked
                };
             commentss = comm[0].Comments;
             await INSERT.into(PAN_Comments).entries(ComEnt);
             await UPDATE(tab1,data.PAN_Number).with({
                "Comments":""
             });
            }
        }else{
        // req._.odataRes.setHeader("Access-Control-Allow-Origin",'*');
        const options =  { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',hour12:false };
        var currentDate1 = new Date().toLocaleDateString('en-IN', options);
        // let dateup = await UPDATE(tab1,data.PAN_Number).with({
        //                 "submitted_date":currentDate1
        // });
        // let body = {
        //     "pankey" : "PAN3",
        //     "file" : "pan.pdf",
        //     "content" : "PGRhdGEgeG1sbnM6eGZhPSJodHRwOi8vd3d3LnhmYS5vcmcvc2NoZW1hL3hmYS1kYXRhLzEuMC8iPjxBVFRBQ0hNRU5UPjxEQVRBIHhmYTpkYXRhTm9kZT0iZGF0YUdyb3VwIj48RklMRU5BTUU+UERGZmlsZTwvRklMRU5BTUU+PENPTlRFTlQ+QVNERkE8L0NPTlRFTlQ+PE1FRElBVFlQRT5QREY8L01FRElBVFlQRT48L0RBVEE+PC9BVFR",
        //     "media" : "PDF",
        //     "buttonClicked" : "sendforApproval"
        //   };
        let comm = await SELECT.from(tab1).where`PAN_Number = ${data.PAN_Number}`
        var commentss = null;
        if(comm[0].Comments){
            let ComEnt = {
                PAN_Number : data.PAN_Number,
                user : decoded['user_name'],
                Comments : comm[0].Comments, 
                status:data.buttonclicked
            };
         commentss = comm[0].Comments;
         await INSERT.into(PAN_Comments).entries(ComEnt);
         await UPDATE(tab1,data.PAN_Number).with({
            "Comments":""
         });
        }
        let data_m = await SELECT.from(tab1).where`PAN_Number=${data.PAN_Number}`;
        data_m = data_m[0];
        data_m.created_by=decoded['user_name'];
        data_m.status='Pending for Approval';
        data_m.submitted_date=currentDate1;
        data_m.submitted_by=decoded['user_name'];
        let data1 = await SELECT.from(tab2).where`PAN_Number=${data.PAN_Number}`;
        let data2 = await SELECT.from(tab3).where`PAN_Number=${data.PAN_Number}`;
        let data3 = await SELECT.from(WORKFLOW_HISTORY).where`PAN_Number=${data.PAN_Number}`;
        // for(let i = 0;i<data3.length;i++){
        //     let data3c = await SELECT.from(WORKFLOW_HISTORY_EMP).where`PAN_Number=${req.data.data} and level=${data3[i].idd}`;
        //     data3[i] ={...data,WFtoWFE:data3c};
        // };
        // let data4 = await SELECT.from(attachments).where`PAN_Number=${req.data.data}`;
        let data5 = await SELECT.from(vendor_data).where`PAN_Number=${data.PAN_Number}`;
        for(let i = 0;i<data5.length;i++){
            let data5c = await SELECT.from(Fvendor_responseoo).where`PAN_Number=${data.PAN_Number} and Proposed_Vendor_Code=${data5[i].Proposed_Vendor_Code}`;
            let data5c1 = await SELECT.from(PAYMENT_TERM_DETAILS).where`PAN_Number=${data.PAN_Number} and Proposed_Vendor_Code=${data5[i].Proposed_Vendor_Code}`;
            let data5c2 = await SELECT.from(PAN_PRICE_DETAILS).where`PAN_Number=${data.PAN_Number} and Proposed_Vendor_Code=${data5[i].Proposed_Vendor_Code}`;
            data5[i] = {...data5[i],vendtovenr:data5c[0],vendtoptd:data5c1,vendtopd:data5c2};
        };
        // let data6 = await SELECT.from(PAN_proj).where`PAN_Number=${data.PAN_Number}`;
        let data7 = await SELECT.from(PAN_Comments).where`PAN_Number=${data.PAN_Number}`;
        data_m = {...data_m,tab1totab2:data1,tab1totab3:data2,tab1toWORKFLOW_HISTORY:data3,tab1tovendor_data:data5,tab1tocom:data7};

        let main_data=[]
        // let change_sta = await SELECT.from(PAN_attachments_APR).where`PAN_Number=${data.PAN_Number}`;
        // change_sta.forEach(each=>{
        //     let j = 0;
        //     main_data.push({
        //         "pankey" :  data.PAN_Number,
        //         "file" : each.fileName,
        //         "content" : each.contentS,
        //         "media" : each.mediaType,
        //         "remarks" : " "
        //     });
        // })
        
        let body ={
            "pankey" : data.PAN_Number,
            "status" : "status Test",
            "url" : data.url,
            "buttonClicked" : data.buttonclicked,
            "panToAttachNavi" :main_data,
            "json":JSON.stringify(data_m)
        }
        try{
        
        response = await AribaSrv.post('/opu/odata/sap/ZARB_BTP_ATTACHMENT_SRV/panHeaderSet',body);
        console.log(response);
        console.log("resssssssssssssssssssssssssssssssssssssssssssssssssssss");
        }catch(error){
            return "error"
        }
        let srv = await UPDATE(tab1,data.PAN_Number).with({
            "status":"Pending for Approval",
            "total_levels_of_approval":response["totalLevel"],
            "Current_level_of_approval":response["currentLevel"],
            "Sap_workitem_id":response["workitemId"],
            "statusInd":2,
            "submitted_by":decoded['user_name'],
            "created_by":decoded['user_name'],
            "submitted_date":currentDate1
        });
        let up={
            "Begin_DateAND_Time": currentDate1.toString(),
            "Remarks": currentDate1.toString()
        }
        let key = await SELECT.from(WORKFLOW_HISTORY).where`PAN_Number=${data.PAN_Number}`
        var wh;
        for(let i=0;i<key.length;i++){
        wh=await UPDATE(WORKFLOW_HISTORY,({
            "idd":key[i].idd,
            "PAN_Number":data.PAN_Number
        })).with(up);
        }
    }
        // let comm = await SELECT.from(tab1).where`PAN_Number = ${data.PAN_Number}`
        // var commentss = null;
        // if(comm[0].Comments){
        //     let ComEnt = {
        //         PAN_Number : data.PAN_Number,
        //         user : decoded['user_name'],
        //         Comments : comm[0].Comments, 
        //         status:data.buttonclicked
        //     };
        //  commentss = comm[0].Comments;
        //  await INSERT.into(PAN_Comments).entries(ComEnt);
        //  await UPDATE(tab1,data.PAN_Number).with({
        //     "Comments":""
        //  });
        // }
        
        

        // let change_stat = await c5re.get(`/tab1?$filter=PAN_Number eq '${data.PAN_Number}'`);
        // change_stat.value[0].status = "Pending for Approval";
        // // await c5re.put(`/tab1/${data.PAN_Number}`,change_stat.value[0]);
        // let respbody ={
        //     "pankey":data.PAN_Number,
        //     "buttonClicked":data.buttonclicked,
        //     "flag":"X",
        //     "json":JSON.stringify(data_m)
        // }
        // let resp = await AribaSrv.post('/opu/odata/sap/ZARB_BTP_GENERATEFORM_SRV/formSet',respbody);
        // console.log(resp);
        
      


/////
        return JSON.stringify(response);
        // return "response"

    });


//     this.on('getuser',async (req)=>{
//         let auth = req?.headers?.authorization;
        
//         if(auth != undefined){
//             let token = auth.split(" ");
//             var decoded = jwtDecode(token[1]);
//         }    
//         const data = JSON.parse( req.data.data);
//         // const buttonClicked = jsonr.status;
//         // req.data.ID = jsonr.key;
//             // let data = JSON.parse(req.data.data);
//             // req._.odataRes.setHeader("Access-Control-Allow-Origin",'*');
//             // let body = {
//             //     "pankey" : "PAN3",
//             //     "file" : "pan.pdf",
//             //     "content" : "PGRhdGEgeG1sbnM6eGZhPSJodHRwOi8vd3d3LnhmYS5vcmcvc2NoZW1hL3hmYS1kYXRhLzEuMC8iPjxBVFRBQ0hNRU5UPjxEQVRBIHhmYTpkYXRhTm9kZT0iZGF0YUdyb3VwIj48RklMRU5BTUU+UERGZmlsZTwvRklMRU5BTUU+PENPTlRFTlQ+QVNERkE8L0NPTlRFTlQ+PE1FRElBVFlQRT5QREY8L01FRElBVFlQRT48L0RBVEE+PC9BVFR",
//             //     "media" : "PDF",
//             //     "buttonClicked" : "sendforApproval"
//             //   };
  
//             let main_data=[]
//             // let change_sta = await SELECT.from(PAN_attachments_APR).where`PAN_Number=${req.data.ID}`;
//             // change_sta.forEach(each=>{
//             //     let j = 0;
//             //     main_data.push({
//             //         "pankey" :  req.data.ID,
//             //         "file" : each.fileName,
//             //         "content" : each.contentS,
//             //         "media" : each.mediaType,
//             //         "remarks" : " "
//             //     });
//             // })
//             let data_m = await SELECT.from(PAN_Details_APR).where`PAN_Number=${data.PAN_Number}`;
//             data_m = data_m[0];
//             let data1 = await SELECT.from(PAN_WEB_EVENT_APR).where`PAN_Number=${req.data.ID}`;
//             let data2 = await SELECT.from(PAN_TYPE_APR).where`PAN_Number=${req.data.ID}`;
//             let data3 = await SELECT.from(PAN_WORKFLOW_HISTORY_APR).where`PAN_Number=${req.data.ID}`;
//             // for(let i = 0;i<data3.length;i++){
//             //     let data3c = await SELECT.from(WORKFLOW_HISTORY_EMP).where`PAN_Number=${req.data.data} and level=${data3[i].idd}`;
//             //     data3[i] ={...data,WFtoWFE:data3c};
//             // };
//             // let data4 = await SELECT.from(attachments).where`PAN_Number=${req.data.data}`;
//             let data5 = await SELECT.from(PAN_vendor_data_APR).where`PAN_Number=${req.data.ID}`;
//             for(let i = 0;i<data5.length;i++){
//                 let data5c = await SELECT.from(PAN_vendor_response_APR).where`PAN_Number=${req.data.ID} and Proposed_Vendor_Code=${data5[i].Proposed_Vendor_Code}`;
//                 let data5c1 = await SELECT.from(PAN_PAYMENT_TERM_DETAILS_APR).where`PAN_Number=${req.data.ID} and Proposed_Vendor_Code=${data5[i].Proposed_Vendor_Code}`;
//                 let data5c2 = await SELECT.from(PAN_PRICE_DETAILS_APR).where`PAN_Number=${req.data.ID} and Proposed_Vendor_Code=${data5[i].Proposed_Vendor_Code}`;
//                 data5[i] = {...data5[i],vendtovenr:data5c[0],vendtoptd:data5c1,vendtopd:data5c2};
//             };
//             let data6 = await SELECT.from(PAN_proj_APR).where`PAN_Number=${req.data.ID}`;
//             let data7 = await SELECT.from(PAN_Comments_APR).where`PAN_Number=${req.data.ID}`;
//             data_m = {...data_m,tab1totab2:data1,tab1totab3:data2,tab1toWORKFLOW_HISTORY:data3,tab1tovendor_data:data5,tab1topp:data6,tab1tocom:data7};
//             let body ={
//                 "pankey" : req.data.ID,
//                 "status" : buttonClicked,
//                 "url" : " ",
//                 "buttonClicked" : buttonClicked,
//                 "panToAttachNavi" :main_data,
//                 "json": JSON.stringify(data_m)
//             }
            
//             let dummyRes = await AribaSrv.post('/opu/odata/sap/ZARB_BTP_ATTACHMENT_SRV/panHeaderSet',body);
//             console.log(dummyRes);

//             // console.log("resssssssssssssssssssssssssssssssssssssssssssssssssssss");
//             // let srv = await UPDATE(tab1,data.PAN_Number).with({"status":"Pending for Approval"});
//             // let change_stat = await c5re.get(`/tab1?$filter=PAN_Number eq '${data.PAN_Number}'`);
//             // change_stat.value[0].status = "Pending for Approval";
//             // await c5re.put(`/tab1/${data.PAN_Number}`,change_stat.value[0]);
           
//             // const dummyRes={
//             //     buttonClicked:"Approved",
//             //     status:"Approved",
//             //     currentLevel:"1",
//             //     workitemId:"000000027515"
//             // };
//             //    let entries={Result:dummyRes.status};
//         //    let reins =  await SELECT.from(PAN_WORKFLOW_HISTORY_APR).where`PAN_Number = ${req.data.ID} and level = ${dummyRes.currentLevel}`;
//         //     await DELETE.from(PAN_WORKFLOW_HISTORY_APR).where`PAN_Number = ${req.data.ID} and level = ${dummyRes.currentLevel}`;
//         //     reins.forEach(rein =>{
//         //         rein.Result = buttonClicked;
//         //     });
           
//             if(dummyRes.currentLevel == '0' )
//             await UPDATE(PAN_WORKFLOW_HISTORY_APR,req.data.ID).with({
//                 "Result":buttonClicked
//             });
//             else
//             await UPDATE(PAN_WORKFLOW_HISTORY_APR,{PAN_Number : req.data.ID,level : dummyRes.currentLevel}).with({
//                 "Result":buttonClicked
//             });
//                 let ret = {
//                     user : decoded["user_name"],
//                     status : dummyRes.status,
//                     currentLevel : dummyRes.currentLevel,
//                     workitemId:dummyRes.workitemId
//                 }
          
//             //      let respbody ={
//             //     "pankey": req.data.ID,
//             //     "buttonClicked":buttonClicked,
//             //     "flag":"X",
//             //     "json":JSON.stringify(data_m)
//             // }
//             // let resp = await AribaSrv.post('/opu/odata/sap/ZARB_BTP_GENERATEFORM_SRV/formSet',respbody);
//             // console.log(resp);
//                 // return JSON.stringify(ret);
//             // }
//             // let ret = {
//             //     user : "user",
//             //     status : null,
//             //     currentLevel : dummyRes.currentLevel,
//             //     workitemId:dummyRes.workitemId
//             // }
//             // let panD = await SELECT.from(PAN_Details_APR).where`PAN_Number = req.data.ID`
//             var status = "Pending for Approval";
//             if(ret.currentLevel == '0')
//              status = ret.status;
//             let comm = await SELECT.from(PAN_Details_APR).where`PAN_Number = ${req.data.ID}`
//             // var commentss = null;
//             if(comm[0].Comments != null ){
//                 let ComEnt = {
//                     PAN_Number : req.data.ID,
//                     user : decoded["user_name"],
//                     Comments : comm[0].Comments, 
//                     status:buttonClicked
//                 };
//             //  commentss = comm[0].Comments;
//              await INSERT.into(PAN_Comments_APR).entries(ComEnt);
//             }
//             await UPDATE(PAN_Details_APR,req.data.ID).with({
//                 "status" : status,
//                 "Current_level_of_approval":ret.currentLevel,
//                 "Sap_workitem_id":ret.workitemId,
//                 "Comments" : null
//             })



           


//             return JSON.stringify(ret);
//     });
// //     this.on('Comments' ,async (req) => { 
        
//         let auth = req?.headers?.authorization;
        
// if(auth != undefined){
//     let token = auth.split(" ");
//     var decoded = jwtDecode(token[1]);
// }       
//         body = {
//             PAN_Number :req.data.PAN_Number, 
//             user : decoded["user_name"],
//             Comments : req.data.data, 
//             status: "NA"
//           }
//       await INSERT.into(PAN_Comments).entries(body);
//     //    req.data.Comments = " ";
//        return "done";
// });

    // this.on('finalApprove',async (req) => {
        // if(('PAN_Number' in req.params[0])&&('IsActiveEntity' in req.params[0])){
        //     let  app_data = JSON.parse(req.data.data);
        //     let data = await SELECT.from(tab1).where`PAN_Number=${app_data.pankey}`;
        //     data = data[0];
        //     let data1 = await SELECT.from(tab2).where`PAN_Number=${app_data.pankey}`;
        //     let data2 = await SELECT.from(tab3).where`PAN_Number=${app_data.pankey}`;
        //     let data3 = await SELECT.from(WORKFLOW_HISTORY).where`PAN_Number=${app_data.pankey}`;
        //     // for(let i = 0;i<data3.length;i++){
        //     //     let data3c = await SELECT.from(WORKFLOW_HISTORY_EMP).where`PAN_Number=${app_data.pankey} and level=${data3[i].idd}`;
        //     //     data3[i] ={...data,WFtoWFE:data3c};
        //     // };
        //     let data4 = await SELECT.from(attachments).where`PAN_Number=${app_data.pankey}`;
        //     let data5 = await SELECT.from(vendor_data).where`PAN_Number=${app_data.pankey}`;
        //     for(let i = 0;i<data5.length;i++){
        //         let data5c = await SELECT.from(Fvendor_responseoo).where`PAN_Number=${app_data.pankey} and Proposed_Vendor_Code=${data5[i].Proposed_Vendor_Code}`;
        //         let data5c1 = await SELECT.from(PAYMENT_TERM_DETAILS).where`PAN_Number=${app_data.pankey} and Proposed_Vendor_Code=${data5[i].Proposed_Vendor_Code}`;
        //         let data5c2 = await SELECT.from(PAN_PRICE_DETAILS).where`PAN_Number=${app_data.pankey} and Proposed_Vendor_Code=${data5[i].Proposed_Vendor_Code}`;
        //         data5[i] = {...data,vendtovenr:data5c[0],vendtoptd:data5c1,vendtopd:data5c2};
        //     };
        //     let data6 = await SELECT.from(PAN_proj).where`PAN_Number=${app_data.pankey}`;
        // data = {...data,tab1totab2:data1,tab1totab3:data2,tab1toWORKFLOW_HISTORY:data3,tab1topdf:data4,tab1tovendor_data:data5,tab1topp:data6};
        //     // var callback = request.query.callback;
        //     // var jsonp = callback + '(' + data + ');';
        //     // res.send(jsonp);
        //     let body = {
        //         "pankey" : app_data.pankey,
        //         "flag" : app_data.flag,
        //         "json" : JSON.stringify(data),
        //         "buttonClicked" : app_data.buttonClicked
        //         }
        //     // let response = await AribaSrv.post('/opu/odata/sap/ZARB_BTP_GENERATEFORM_SRV/formSet',body);
        //     // console.log(response);
        //     let up = await UPDATE(tab1,app_data.pankey).with({"status":app_data.buttonClicked});
        //     return JSON.stringify("response"); 
        
    // });

    // this.on("Reject",async(req)=>{
    //     let data = JSON.parse(req.data.data);
        
    //     let response = await UPDATE(tab1,data.PAN_Number).with({"status":data.buttonClicked});
    //     return JSON.stringify(response);
    // });

    this.on('getData',async (req) => {
        // if(('PAN_Number' in req.params[0])&&('IsActiveEntity' in req.params[0])){
            console.log(req.data.ID);
            req.data.ID = JSON.parse(req.data.ID);
            let data = await SELECT.from(tab1).where`PAN_Number=${req.data.ID}`;
            // var callback = request.query.callback;
            // var jsonp = callback + '(' + data + ');';
            // res.send(jsonp);
            if (data){
            return data[0].status;  
            }else{
                return data;
            }
        
    });

    // this.before('READ', tab2, async (req) => { 
    //     try {
    //         resp = await c5re.get('/tab2');
    //         const data = resp.value;
    //         await cds.tx(req).run(DELETE(tab2));
    //         await INSERT.into(tab2).entries(data);
    //         return req;
    //     } 
    //     catch (error) {
    //         req.error(500, err.message);
    //     }
    // });
    // this.before('READ', vendor_data, async (req) => { 
    //     try {
    //         resp = await c5re.get('/vendor_data');
    //         const data = resp.value;
    //         await cds.tx(req).run(DELETE(vendor_data));
    //         await INSERT.into(vendor_data).entries(data);
    //         // return req;

    //         if(req.params.length== 2){
    //             resp = await c5re.get('/PAYMENT_TERM_DETAILS');
    //             const data = resp.value;
    //             var data1=[]
    //             for(let i=0;i<data.length;i++){
    //                 if ((req.params[0].PAN_Number === data[i].PAN_Number) && (req.params[1].Proposed_Vendor_Code===data[i].Proposed_Vendor_Code)){
    //                         data1.push(data[i]);
    //                 }
    //             }
    //             await cds.tx(req).run(DELETE(PAYMENT_TERM_DETAILS));
    //             await INSERT.into(PAYMENT_TERM_DETAILS).entries(data1);
    //             // resp1 = await c5re.get('/Fvendor_responseoo');
    //             // const data1 = resp1.value;
    //             // await cds.tx(req).run(DELETE(Fvendor_responseoo));
    //             // await INSERT.into(Fvendor_responseoo).entries(data1);
    //             // return req;
    //         }
            
    // }catch (error) {
    //     req.error(500, err.message);
    // }
       
    // });
    // this.before('READ', Fvendor_responseoo, async (req) => { 
    //     try {
    //         resp = await c5re.get('/Fvendor_responseoo');
    //         const data = resp.value;
    //         await cds.tx(req).run(DELETE(Fvendor_responseoo));
    //         await INSERT.into(Fvendor_responseoo).entries(data);
    //         return req;
    //     } 
    //     catch (error) {
    //         req.error(500, err.message);
    //     }
    // });
    // this.before('READ', PAYMENT_TERM_DETAILS, async (req) => { 
    //     try {
    //         resp = await c5re.get('/PAYMENT_TERM_DETAILS');
    //         const data = resp.value;
    //         await cds.tx(req).run(DELETE(PAYMENT_TERM_DETAILS));
    //         await INSERT.into(PAYMENT_TERM_DETAILS).entries(data);
    //         // return req;
    //     } 
    //     catch (error) {
    //         req.error(500, err.message);
    //     }
    // });
    // this.before('READ', WORKFLOW_HISTORY, async (req) => { 
    //     try {
    //         resp = await c5re.get('/WORKFLOW_HISTORY');
    //         const data = resp.value;
    //         await cds.tx(req).run(DELETE(WORKFLOW_HISTORY));
    //         await INSERT.into(WORKFLOW_HISTORY).entries(data);
    //         return req;
    //     } 
    //     catch (error) {
    //         req.error(500, err.message);
    //     }
    // });
    // this.before('READ', WORKFLOW_HISTORY_EMP, async (req) => { 
    //     try {
    //         resp = await c5re.get('/WORKFLOW_HISTORY_EMP');
    //         const data = resp.value;
    //         await cds.tx(req).run(DELETE(WORKFLOW_HISTORY_EMP));
    //         await INSERT.into(WORKFLOW_HISTORY_EMP).entries(data);
    //         return req;
    //     } 
    //     catch (error) {
    //         req.error(500, err.message);
    //     }
    // });
    // this.on('getPdfUrl', async (req) => {
    //      
    //     console.log(re1.params);
    //     const fileLinkValue = req.params;
    //     return fileLinkValue;
    // });

    this.on("getuserinfo",async (req) =>{
        // let data = await SELECT.from(WORKFLOW_HISTORY_EMP).where`PAN_Number=${req.data.ID}`;
        // return data[0].Employee_ID;
        var data;
        req.data.ID = JSON.parse(req.data.ID);
        let dat = await SELECT.from(tab1).where`PAN_Number = ${req.data.ID}`;
        if(dat[0].status !='Justification Needed'){
        data = await UPDATE(tab1,req.data.ID).with({
            "status":"draft"
        });
    }
        return JSON.stringify(data);
    });


    // this.before('READ', attachments, async (req) => { 
    //     try {
    //         // req.params.id[0];
    //         const a =await SELECT.from(attachments);
    //         var first = a;
    //         let data = [];
    //         // a.forEach(element => {
    //         //     if()
    //         // });
    //         console.log("hey!");
    //     } catch (error) {
            
    //     }

    // });


    // this.before('CREATE', 'attachments',async (req) => {
    //      
    //     // console.log('Create called')
     // req.data.url = `/media/attachments(${req.data.idd})/content`;


        // await UPDATE(attachments).set({content1:req.data.content}).where({ idd: req.data.idd });
        // req.data.ID1 = req.data.ID;
        // const entry = {
        //     Enquiry_no :req.data.Enquiry_no,
        //     content:req.data.content,
        //     fileName:req.data.fileName,
        //     mediaType:req.data.mediaType,
        // }; 
    // });


    // this.on("READ", attachments, async (req, next) => {
    //     if (!req.data.idd) {
    //         return next();
    //     }
    //     //Fetch the url from where the req is triggered
    //     const url = req._.req.path;
    //     //If the request url contains keyword "content"
    //     // then read the media content
    //     if (url.includes("content")) {
    //         const uid = req.data.idd;
    //         console.log("attachments read is working")
    //         var tx = cds.transaction(req);
    //         // Fetch the media obj from database
    //         var query = await SELECT.from(attachments,uid).columns(`contentS`);
    //        var mediaObj1=  await SELECT `contentS,mediaType`.from (attachments) .where `idd = ${uid}`;
    //         // var mediaObj = await tx.run(
    //         //     SELECT.one.from("attachments", ["contentS", "mediaType"]).where({idd:uid})
    //         // );

    //         if (mediaObj1.length <= 0) {
    //             req.reject(404, "Media not found for the ID");
    //             return;
    //         }
    //         var decodedMedia = "";
    //         decodedMedia = new Buffer.from(
    //             mediaObj1[0].contentS.toString().split(";base64,").pop(),
    //             "base64"
    //         );
    //         return _formatResult(decodedMedia, mediaObj1[0].mediaType);
    //     } else return next();
    // });

    // function _formatResult(decodedMedia, mediaType) {
    //     const readable = new Readable();
    //     const result = new Array();
    //     readable.push(decodedMedia);
    //     readable.push(null);
    //     return {
    //         value: readable,
    //         '*@odata.mediaContentType': mediaType
    //     }
    // }
      

    // this.on('getattachments', async (req) => {
    //       console.log(req?.data);
    //       return "function succesfully executed";

    // });


 

    this.before('CREATE', 'attachments', req => {
         
        console.log('Create called')
        console.log(JSON.stringify(req.data))
        // req.data.fileName = req.data.ID
        // req.data.url = `/odata/v4/catalog/attachments(ID=${req.data.ID},PAN_Number='${req.data.PAN_Number}')/content`
        req.data.url = `attachments(ID=${req.data.ID},PAN_Number='${req.data.PAN_Number}')/content`
        req.data.fileName = req._.odataReq._body.fileName;
        req.data.mediaType = req._.odataReq._body.mediaType;
        // req.data.IsActiveEntity=true
    })

    this.after('CREATE','attachments',req => {
         
        console.log(req);
    })

    this.before('READ', 'attachments', async req => {
        // response = await AribaSrv.get('/sap/opu/odata/sap/ZARB_BTP_ATTACHMENT_SRV/panHeaderSet');
        //  
        //check content-type
        console.log('content-type: ', req.headers['content-type'])
    });
    this.on("flag",async (req) => {
        if(req.data.case == 'discard')
        {
            // let del = await DELETE.from(Files).where `size=${1}`;
            let del = await DELETE.from(attachments).where `size=${1} and PAN_Number=${req.data.ID}`;
            // let data = await SELECT.from(Files).where  `id1=${req.data.ID}`;
            console.log(del);
            return "deleted successfully";
        }
        else {
            const val = 2;
            var check = await SELECT.from(attachments).where `PAN_Number=${req.data.ID}`;
            console.log(check);
            for (let i = 0; i < check.length; i++) {
                if (check[i].size !=2)  
                {
                    var sel_id = check[i].PAN_Number;
                    const saved = await UPDATE(attachments).set({size: val}).where({PAN_Number : sel_id});
                        console.log(saved);
                return "saved successfully";
                }
            }
            // const saved = await UPDATE(Files).set({size: val}).where({id1 : req.data.ID});
            // console.log(saved);
            // return "saved successfully";
        }
    
            });

});


///////attachemnt code start

////attachment code end