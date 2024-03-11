sap.ui.define([
    "sap/m/MessageToast",
    "sap/ui/core/routing/History"
], function(MessageToast,History) {
    'use strict';
    

    var oBusyDialog=new sap.m.BusyDialog("oBusyDialog");


    return {
        send: async function(oEvent) { 


            oBusyDialog.open();
            // let oExtensionAPI = this.base.getExtensionAPI();
            let oModel = oEvent.getModel();
            let sFunctionName = "sendforapproval";
            let oFunction = oModel.bindContext(`/${sFunctionName}(...)`);
            let appr_url = window.location.href;
            var pieces = appr_url.split("(");
			var res = pieces[1];
            var res1 = res.split("'");
            let comp_url = "https://btp-dev-0or0hi20.launchpad.cfapps.eu10.hana.ondemand.com/site?siteId=94a17d9a-05b5-425d-b51d-2cd74a2c2762#approval-display?sap-ui-app-id-hint=saas_approuter_approval&/tab1('"+res1[1]+")";
            // let oFunction = oModel.bindContext(`/Books`);
            // let data = {some: "data"};
            let body={
                "url":comp_url,
                "PAN_Number":res1[1],
                "buttonclicked":"sendforApproval"
            };
            oFunction.setParameter("data",JSON.stringify(body));

            await oFunction.execute();
            let oContext = oFunction.getBoundContext();
						 
			let result = oContext.getObject();
            console.log(result);

            if(result){
                
                const oHistory = History.getInstance();
                const sPreviousHash = oHistory.getPreviousHash();
                MessageToast.show("PANForm Submitted for Approval");
                // let oRouter=sap.ui.core.UIComponent.getRouterFor(this);
                
                oBusyDialog.close();
                // oRouter.navTo("tab1List");
                // this.extensionAPI.refresh()
                // this.getBindingContext().refresh();
                if (sPreviousHash !== undefined) {
                window.history.go(-1);
                };
                    // const oRouter = this.getOwnerComponent().getRouter();
                    // oRouter.navTo("tab1List", {}, true);
                // }
                // this.getRouting().navigateToRoute("tab1List",{},true);
                // this.extensionAPI.refresh("panappbeta::tab1List--fe::table::tab1::LineItem");
            }
            
             
            // let url = "/odata/v4/catalog/attachments";
            // let surl=this.base.getAppComponent().getManifestObject()._oBaseUri._string;
            // // let url=this.getEditFlow().getAppComponent().getManifestObject().resolveUri('/odata/v4/catalog/attachments');
            // let url = surl+"odata/v4/catalog/attachments";
            // $.ajax({url:url,
            // type:"POST",
            // data: JSON.stringify(body),
            // contentType: 'application/json',
            // dataType:"xml/html/script/json",
            // success:function(result){ 
            //     console.log(result);
            // },
            // error:function(e){
            //      
            // }
            // }
            // );
        }
    };
});
