sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        translate: function ()
         {
        //     this.loadFragment({
        //         // id: "excelUploadDialog",
        //         name: "panappbeta.ext.fragment.translate",
        //         // controller: _createUploadController(this, 'MediaFile')
        //     })
        // this._Dialog = sap.ui.jsfragment("ActionSheet.fragment.js",this);

        // this._Dialog.open();
        // this._getDialog().open();
        // this.oDialog().open()
        if (!this.oDefaultDialog) {
            this.oDefaultDialog = new Dialog({
                title: "Available Products",
                content: [
                    new StandardListItem({
                        title: "Product 1",
                        counter: 10
                    }),
                    new StandardListItem({
                        title: "Product 2",
                        counter: 15
                    }),
                    // Add more items as needed
                ],
                beginButton: new Button({
                    type: ButtonType.Emphasized,
                    text: "OK",
                    press: function () {
                        this.oDefaultDialog.close();
                    }.bind(this)
                }),
                endButton: new Button({
                    text: "Close",
                    press: function () {
                        this.oDefaultDialog.close();
                    }.bind(this)
                })
            });

            // to get access to the controller's model
            this.getView().addDependent(this.oDefaultDialog);
        }

        this.oDefaultDialog.open();
        }
        
    };
});
