sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        refresh: function(oEvent) {
            MessageToast.show("Refreshing Work Flow.");
            location.reload();
        }

    };
});
