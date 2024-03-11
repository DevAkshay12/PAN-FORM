sap.ui.define(["sap/m/MessageBox", "sap/m/MessageToast", "sap/ui/core/UIComponent"],

    function (MessageBox, MessageToast, UIComponent,UUID) {
        "use strict";
        function _createUploadController(oExtensionAPI, Entity) {
            var oUploadDialog;

            function setOkButtonEnabled(bOk) {
                oUploadDialog && oUploadDialog.getBeginButton().setEnabled(bOk);
            }

            function setDialogBusy(bBusy) {
                oUploadDialog.setBusy(bBusy)
            }

            function closeDialog() {
                oUploadDialog && oUploadDialog.close()
            }

            function showError(code, target, sMessage) {
                MessageBox.error("Upload failed", { title: "Error" })
            }

            function byId(sId) {
                return sap.ui.core.Fragment.byId("excelUploadDialog", sId);
            }

            return {
                onFileUploadDone:function (oEvent) {
                     
                },
                onBeforeOpen: function (oEvent) {
                    oUploadDialog = oEvent.getSource();
                    oExtensionAPI.addDependent(oUploadDialog);
                },

                onAfterClose: function (oEvent) {
                    oExtensionAPI.removeDependent(oUploadDialog);
                    oUploadDialog.destroy();
                    oUploadDialog = undefined;
                },



                //function import try==============================================================================
                onAfterBinding : async function (oBindingContext)
                {
                     
                    const oExtensionAPI = this.base.getExtensionAPI();
                    oModel = oExtensionAPI.getModel();
                    sFunctionName = "getattachments";
                    oFunction = oModel.bindContext(`/${sFunctionName}(...)`);
                },

                // ================================================================================================


                //                 onOk: function (oEvent) {
                //                     setDialogBusy(true)

                //                     var oFileUploader = byId("uploader");
                //                     var headPar = new sap.ui.unified.FileUploaderParameter();
                //                     headPar.setName('slug');
                //                     headPar.setValue(Entity);
                //                     oFileUploader.removeHeaderParameter('slug');
                //                     oFileUploader.addHeaderParameter(headPar);

                //                     var oFragment = sap.ui.xmlfragment("excelUploadDialog", "project1.ext.fragment.Pdffffffff");

                //                     // Get the FileUploader control by its ID
                //                     var oUploader = sap.ui.core.Fragment.byId("excelUploadDialog", "uploader");

                //                     var selectedFile = oUploader.getValue();
                //  ;

                //                     var sUploadUri = oExtensionAPI._controller.extensionAPI._controller._oAppComponent.getManifestObject().resolveUri("/odata/v4/catalog/ExcelUpload/excel")
                //                     oFileUploader.setUploadUrl(sUploadUri);
                //                     oFileUploader
                //                         .checkFileReadable()
                //                         .then(function () {
                //                             oFileUploader.upload();
                //                         })
                //                         .catch(function (error) {
                //                             showError("The file cannot be read.");
                //                             setDialogBusy(false)
                //                         })
                //                 },
                _getBaseURL: function () {
                     ;
                    var oBaseUrl = this.getOwnerComponent().getManifestEntry("/sap.app/id").replaceAll(".", "/");
                    return jQuery.sap.getModulePath(oBaseUrl)
                },

                /**
                 * on File Change
                 */
                onFileChange: function (oEvent) {
                     
                    var file = oEvent.getParameters("files").files[0];
                    this.file = file;
                },
                onFileUploadDone: function (oEvent) {
                     
                },


                onOk: function (oEvent) {
                  ;
                    let inputString = oEvent.oSource.oPropagatedProperties.oModels.pageInternal.mContexts["/pages/panappbeta::tab1ObjectPage/controls/fe::table::tab1tovendor_data::LineItem::VendorData"].oModel.oData.currentCtxt.sPath;
                    const regex = /PAN_Number='([^']+)'/
                    const match = inputString.match(regex);
                    const invoice_no = match[1];                                                                                                           
                    var oUploadSet = byId("__fileUploader");
                    let src = oEvent.oSource
                    //Upload imaged
                    var reader = new FileReader();
                    reader.onload = function (oEvent) {
                        // get an access to the content of the file
                         ;
                        var file = this.file;
                        this.content = oEvent.currentTarget.result;
                    // new Promise((resolve) => setTimeout(resolve, 50));
                        this.createfile(invoice_no,src);
                    }.bind(this);
                    reader.readAsDataURL(this.file);

                },


                /**
                 *  Create Operation to create an entry in CAP
                 */

                createfile: async function (invoice_no,evententity) {
                     ;
                    var that = this;
                    var invoice_no = invoice_no;

                    var file_ori = this.file;
                     
                    // Data for CAP to create entry
                    var oImageData = {
                        "PAN_Number" : invoice_no,
                        "contentS": this.content,
                        // "content1":this.content,
                        "mediaType": this.file.type,
                        "fileName": this.file.name
                    };

                     
                    let baseUri = evententity.getParent().getParent().getParent().oContainer.getParent().getParent().getParent().getManifestObject()._oBaseUri._string;
                    // let functionname = 'getattachments';
                    // let oFunction = evententity.getModel().bindContext(`/${functionname}(...)`);
                    // oFunction.setParameter('content',this.content);
                    // // oFunction.setParameter('file',this.file);
                    // await oFunction.execute();
                    // const oContext = oFunction.getBoundContext();
                    // const resVal = oContext.getValue();
                    var settings = {
                        url: baseUri+"odata/v4/catalog/attachments",
                        method: "POST",
                        headers: {
                            "Content-type": "application/json"
                        },
                        data: JSON.stringify(oImageData)
                    }

                     
                    const loadData = async () => {
                        var busy = new sap.m.BusyDialog({ text: "Uploading file..." });
                         busy.open();
                    return new Promise((resolve, reject) => {
                         
                        $.ajax(settings)
                            .done(async (results, textStatus, request) => {
                                 
                                var stat = textStatus;
                                if (stat=='success')
                                {
                                    busy.close();
                                    var sMsg = "FILE UPLOADED SUCCESSFULLY";
                                    MessageBox.success(sMsg);
                                }
                                else {
                                    var ermsg = "ERROR UPLOADING THE FILE"
                                    MessageBox.error(ermsg);
                                }
                                 
                                resolve(results.ID);
                                  
                                let eventt = evententity;
                                if(evententity.getParent().getBindingContext() != undefined){
                                     
                                    await evententity.getParent().getBindingContext().refresh();
                                }
                                else {
                                     
                                }
                                
                                
                            
                                // var oUploadSet = this.byId("uploadSet");
                                // oUploadSet.removeAllIncompleteItems();
                                // oUploadSet.getBinding("items").refresh();
                                
                            })
                            .fail((err) => {
                                 

                                reject(err);
                                
                            })
                    })
                };
                 
                await loadData();
                     
                    closeDialog();
                    // location.reload();
                    // return 1;
                    // var file_real = this.content;
                    //  
            
                    // // Remove the data URI prefix
                    // var base64Content = file_real.split(',')[1];
                    
                    // var dataURI = "data:application/pdf;base64," + base64Content;

                    // // Open a new tab
                    // var pdfWindow = window.open("");
                    
                    // // Write HTML content to the new tab with a link to download the PDF
                    // pdfWindow.document.write('<html><head><title>PDF Viewer</title></head><body style="margin:0;"><a href="' + dataURI + '" download="yourFileName.pdf">Download PDF</a></body></html>');

                    // // Decode the base64 content to binary
                    // // var base64Data = atob(base64Content);
                    // // var pdfBlob = new Blob([base64Data], { type: 'application/pdf' });
                    // var file_name = this.file.name;
                    // var mime_type = this.file.type;
                    //  ;
                    // var size = this.file.size;
                    // const binaryData = atob(base64Content);
                    // // Create an ArrayBuffer from the binary data
                    // const arrayBuffer = new ArrayBuffer(binaryData.length);
                    // const uint8Array = new Uint8Array(arrayBuffer);
                    // for (let i = 0; i < binaryData.length; i++) {
                    //     uint8Array[i] = binaryData.charCodeAt(i);
                    // }
                    // // Create a Blob from the ArrayBuffer
                    // const blob = new Blob([arrayBuffer], { type: mime_type });

                    // // Create a File from the Blob
                    // const file2 = new File([blob], file_name, { type: mime_type });
                    // // const file1 = base64ToFile(base64Data, file_name, mime_type);
                    // var url = "https://elipo_backend-shy-echidna-yp.cfapps.us20.hana.ondemand.com/dev/upload";
                    // var formData = new FormData();
                    // formData.append("file", file_ori);
                    // formData.append("mime_type", mime_type);
                    // formData.append("file_name", file_name);
                    // formData.append("file_id", invoice_no);
                    // formData.append("userid", 'einvoiceportal@gmail.com');
                    // fetch(url, {
                    //     method: 'POST',
                    //     body: formData
                    // })
                    //     .then(function (response) {
                    //         if (response.status === 200) {
                    //             return response.text(); // or response.json() if the server responds with JSON
                    //         } else {
                    //             throw new Error("POST request failed with status: " + response.status);
                    //         }
                    //     })
                    //     .then(function (data) {
                    //         var response = JSON.parse(data);

                    //         if (response.statusCode === 200) {
                    //             // Handle the error case
                    //             var sMsg = "File Uploaded Successfully";
                    //             MessageBox.success(sMsg);
                    //             closeDialog();
                    //             console.log("Success: " + response.body);

                    //         } else {
                    //             // Handle the success case
                    //             var sMsg = "Failed to upload";
                    //             MessageBox.error("Failed to upload");
                    //             closeDialog();
                    //             console.log("Error: " + response.body);

                    //         }
                    //         // Handle the response data here
                    //         //    var sMsg = "File Uploaded Successfully";
                    //         //            MessageBox.success(sMsg);
                    //         // console.log("POST request successful. Response data: " + data);
                    //     })
                    //     .catch(function (error) {
                    //         console.error(error);
                    //     });



                    // //     var formData = {

                    // //     "file": this.content,
                    // //     "mime_type": this.file.type,
                    // //     "file_name": this.file.name,
                    // //     "file_id":6078,
                    // //     "userid":'einvoiceportal@gmail.com'

                    // // };


                    //  ;
                    // // var oCAPModel = this.getOwnerComponent().getModel("oCAPModel");
                    // // var sURL = "/MediaFile";
                    // // //Create call for CAP OData Service
                    // // oCAPModel.create(sURL, oImageData, {
                    // //     success: function (oData, oResponse) {
                    // //         var id = oData.id;
                    // //         var sMsg = "File Uploaded Successfully for ID: " + id;
                    // //         MessageBox.success(sMsg);
                    // //     },
                    // //     error: function (jqXHR, textStatus) {

                    // //     },
                    // // });
                },







                onCancel: function (oEvent) {
                     
                    closeDialog();
                },

                onTypeMismatch: function (oEvent) {
                    var sSupportedFileTypes = oEvent
                        .getSource()
                        .getFileType()
                        .map(function (sFileType) {
                            return "*." + sFileType;
                        })
                        .join(", ");

                    showError(
                        "The file type *." +
                        oEvent.getParameter("fileType") +
                        " is not supported. Choose one of the following types: " +
                        sSupportedFileTypes
                    );
                },

                onFileAllowed: function (oEvent) {
                    setOkButtonEnabled(true)
                },

                onFileEmpty: function (oEvent) {
                    setOkButtonEnabled(false)
                },

                onUploadComplete: function (oEvent) {
                    var iStatus = oEvent.getParameter("status");
                    var oFileUploader = oEvent.getSource()

                    oFileUploader.clear();
                    setOkButtonEnabled(false)
                    setDialogBusy(false)

                    if (iStatus >= 400) {
                        var oRawResponse;
                        try {
                            oRawResponse = JSON.parse(oEvent.getParameter("responseRaw"));
                        } catch (e) {
                            oRawResponse = oEvent.getParameter("responseRaw");
                        }
                        if (oRawResponse && oRawResponse.error && oRawResponse.error.message) {
                            showError(oRawResponse.error.code, oRawResponse.error.target, oRawResponse && oRawResponse.error && oRawResponse.error.message);
                        }
                    } else {
                        MessageToast.show("File uploaded successfully");
                        oExtensionAPI.refresh()
                        closeDialog();
                    }
                }
            };
        };


        return {
            upload: function (oBindingContext, aSelectedContexts) {
                this.loadFragment({
                    id: "excelUploadDialog",
                    name: "panappbeta.ext.fragment.Draftattachment",
                    controller: _createUploadController(this, 'MediaFile')
                }).then(function (oDialog) {
                    oDialog.open();
                });
            }
        };
    });

