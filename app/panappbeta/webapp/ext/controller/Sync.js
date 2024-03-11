sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';
    var oBusyDialog=new sap.m.BusyDialog();
    
    return {
        Sync: function(oEvent) { 
            // oScroll.addContent(new sap.uxap.ObjectPageSubSection({
            //     // title: `Level ${levelArray[0].level}`
            // }));
            var  that = this.getModel();
                  var oElem = oEvent;
                    if (!this.oDialog){
                        this.oDialog = new sap.m.Dialog({
                            title:"Pick a Date",
                            beginButton: new sap.m.Button({
                                text: "Confirm",
                                type: "Emphasized",
                                press:async function(oEvent,that){
                                    oBusyDialog.open();
                                     
                                    let fromDate = this.getParent().getContent()[0].getItems()[0].getDateValue();
                                    let toDate = this.getParent().getContent()[0].getItems()[2].getDateValue();

                                    let fromEpochTimeMs = Math.floor(fromDate.getTime());
                                    let toEpochTimeMs = Math.floor(toDate.getTime());
                                    if(fromDate > toDate){
                                        MessageToast.show("From date should not be greater than the To date");
                                        return
                                    } else {
                                        let functionname = 'getsync';
                                        let oFunction = sap.ui.getCore().byId("panappbeta::tab1List--fe::table::tab1::LineItem").getModel().bindContext(`/${functionname}(...)`);
                                        console.log();
                                        let data={
                                            "fromdate":fromEpochTimeMs,
                                            "todate":toEpochTimeMs
                                        };
                                        oFunction.setParameter('data',JSON.stringify(data));
                                        await oFunction.execute();
                                        const oContext = oFunction.getBoundContext();
                                        let resVal = oContext.getValue();
                                        resVal = JSON.parse(resVal.value);
                                        this.getParent().close();
                                        // oBusyDialog.close();
                                    }
                                    oBusyDialog.close();
                                    
                                }
                            }),
                            endButton: new sap.m.Button({
                                text: "Cancel",
                                press: function(oEvent){
                                     
                                    this.getParent().close();
                                }
                            })
                        })

                        this.oDialog.addContent(new sap.m.HBox({
                            width: "100%"
                        }))
                        let dHBox = this.oDialog.getContent()[0];
                        dHBox.addItem(new sap.m.DatePicker("FromDatePicker", {
                            initialFocusedDateValue: new Date(),
                            placeholder: "From",
                            required: true,
                            showCurrentDateButton: true
                        }))
                        dHBox.addItem(new sap.m.ToolbarSpacer({
                            width: "100px"
                        }))
                        dHBox.addItem(new sap.m.DatePicker("ToDatePicker",{
                            initialFocusedDateValue: new Date(),
                            placeholder: "To",
                            required: true,
                            showCurrentDateButton: true
                        }))
                    }
                    this.oDialog.open();
        }
    };
});
