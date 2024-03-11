sap.ui.define(["sap/m/MessageBox",
    "sap/m/MessageToast", "sap/ui/core/UIComponent"
], function (MessageBox, MessageToast, UIComponent) {
    'use strict';

    var oDialogInstance, Data;

    function _createUploadController(oExtensionAPI, Entity) {
        var oUploadDialog;

        function setOkButtonEnabled(bOk) {
            oUploadDialog && oUploadDialog.getBeginButton().setEnabled(bOk);
        }

        function setDialogBusy(bBusy) {
            oUploadDialog.setBusy(bBusy);
        }

        function closeDialog() {
            oUploadDialog && oUploadDialog.close();
        }

        function showError(code, target, sMessage) {
            MessageBox.error("Upload failed", { title: "Error" });
        }

        function byId(sId) {
            return sap.ui.core.Fragment.byId("excelUploadDialog", sId);
        }

        return {
            onBeforeOpen: function (oEvent) {
                 ;
            },
            onCancel: function (oEvent) {
                 ;
                // Close the dialog
                oDialogInstance && oDialogInstance.close();
            }
        };
    }

    return {
        demo: function (oBindingContext, aSelectedContexts,oEvent) {
            var that = this;
            this.loadFragment({
                id: "excelUploadDialog" + new Date().getTime(), // Unique ID
                name: "panappbeta.ext.fragment.timeline",
                controller: _createUploadController(this, 'MediaFile')
            }).then(async function (oDialog) {
                 ;
                function generateUniqueId() {
                    // Generate a random number
                    var randomNumber = Math.floor(Math.random() * 1000000);

                    // Get the current timestamp
                    var timestamp = new Date().getTime();

                    // Combine timestamp and random number to create a unique ID
                    var uniqueId = timestamp + '-' + randomNumber;

                    return uniqueId;
                }

                 
                let functionname = 'getcomments';
                let oFunction = oEvent.getModel().bindContext(`/${functionname}(...)`);
                console.log();
                const id = oEvent.oHeaderContext.sPath;
                const regex = /PAN_Number='([^']+)'/;
                const match = id.match(regex);
                const panNumber = match ? match[1] : null;
                oFunction.setParameter('ID',panNumber);
                await oFunction.execute();
                const oContext = oFunction.getBoundContext();
                let resVal = oContext.getValue();
               resVal = JSON.parse(resVal.value);

                const data = [];
                const entry = resVal[0];
                if (entry == undefined){
                    // MessageToast.show("no comments found");
                    oDialog.mAggregations.content[0].destroyItems();
                    var oTimelineItem = new sap.suite.ui.commons.TimelineItem({
                        // id: `${"item" + generateUniqueId()}`,
                        // dateTime: `${data[i].dateTime}`,
                        // title: `${data[i].lname}`,
                        // userNameClickable: false,
                        // userNameClicked: "onUserNameClick",
                        // select: "onPressItems",
                        // userPicture: "Photo",
                        text: 'No Comments Found',
                        // userName: `${data[i].firsname}`,
                    });
                    oDialog.mAggregations.content[0].addItem(oTimelineItem);
                    oDialog.mAggregations.content[0].addItem(new sap.m.Button(`${"button"+generateUniqueId()}`,{
                        text: "Cancel",
                        press: function (oEvent) {
                             ;
                            oDialog.close();
                        },
                        layoutData: new sap.m.FlexItemData({ // Add layoutData for flexible item behavior
                            growFactor: 5,
                            alignSelf: "End" // Align the button to the end (right)
                        })
                    }));
    
                }

                else 
                {
                
                resVal.forEach(entry => {
                    const createdAt = entry.createdAt;
                    const createdBy = entry.createdBy;
                    const modifiedAt = entry.modifiedAt;
                    const modifiedBy = entry.modifiedBy;
                    const idd = entry.idd;
                    const pannum = entry.PAN_Number;
                    const user = entry.user;
                    const comments = entry.Comments;
                    const status = entry.status;  
                    
                    data.push({
                        firsname : user,
                        lname : status,
                        comment : comments,
                        dateTime : createdAt,
                        // dateTime : "dfghjk",
                    })
                });

// Extracting values and storing them with headers


                oDialogInstance = oDialog;
                // const data = [
                //     {
                //         firsname: "Dhanush", lname: "G",comment : "Time paused in the embrace of the seaside, where memories and moments intertwined."
                //     },
                //     {
                //         firsname: "Akshay ", lname: "B R",comment : "The old oak tree stood tall, its branches reaching for the heavens above.In its shade, memories lingered, whispered by the rustling leaves."
                //     },
                //     {
                //         firsname: "Dhanush", lname: "K", comment : "The moon whispered secrets to the silent earth, as stars painted stories across the night sky"
                        
                //     },
                // ];

                var len = data.length;
                console.log(len);


                // const lastname = ["Gangatkar","Bhat","Rozario"];
                oDialog.mAggregations.content[0].destroyItems();

                for (let i = 0; i < data.length; i++) {
                     
                    // var currentDate = new Date();
                    // var currentDateTime = currentDate.toISOString();
                    var oTimelineItem = new sap.suite.ui.commons.TimelineItem({
                        id: `${"item" + generateUniqueId()}`,
                        dateTime: `${data[i].dateTime}`,
                        title: `${data[i].lname}`,
                        userNameClickable: false,
                        userNameClicked: "onUserNameClick",
                        select: "onPressItems",
                        userPicture: "Photo",
                        text: `${data[i].comment}`,
                        userName: `${data[i].firsname}`,
                    });
                    oDialog.mAggregations.content[0].addItem(oTimelineItem);
                }

                oDialog.mAggregations.content[0].addItem(new sap.m.Button(`${"button"+generateUniqueId()}`,{
                    text: "Cancel",
                    press: function (oEvent) {
                         ;
                        oDialog.close();
                    },
                    layoutData: new sap.m.FlexItemData({ // Add layoutData for flexible item behavior
                        growFactor: 5,
                        alignSelf: "End" // Align the button to the end (right)
                    })
                }));

            }



                oDialog.open();
            });
        }
    };
});
