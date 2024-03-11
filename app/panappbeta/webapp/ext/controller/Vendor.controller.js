sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';
	const Fimport= async function(oModel,name,data){
		 
		console.log(oModel);
		let oFunction = oModel.bindContext(`/${name}(...)`);
					// let oFunction = oModel.bindContext(`/Books`);
					
		oFunction.setParameter("ID",JSON.stringify(data));
					// oFunction.setParameter("Book",{ID:3, title: "BookTitle", stock:10000});
		await oFunction.execute();
					// console.log(response);

		let oContext = oFunction.getBoundContext();

		let result = oContext.getObject();
		// console.log(result);
		if (result) {
			return result.value;
		} else {
			return "";
		}
	};

	return ControllerExtension.extend('panappbeta.ext.controller.Vendor', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf panappbeta.ext.controller.Vendor
             */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			},
			// editFlow: {

			// 	onBeforeSave: async function (mParameters) {
			// 		debugger

			// 		sap.ui.getCore().byId('plantproject1::plantObjectPage--fe::FormContainer::GeneratedFacet1').getFormElements()[1].getFields()[1].setVisible(false);
			// 		sap.ui.getCore().byId('plantproject1::plantObjectPage--fe::FormContainer::GeneratedFacet1').getFormElements()[1].getFields()[0].setVisible(true);
			// 		return null;
			// 	},
			// 	// onBeforeEdit: function (mParameters) {debugger

			// 	// 	// return this._createDialog("Do y//ou want to edit this really nice... object ?");
			// 	// 	// return MessageToast.show("Edit successful");
			// 	// },
			// 	onBeforeDiscard: function (mParameters) {
			// 		debugger
			// 		// return this._createDialog("Do you want to cancel this really nice... object ?");
			// 		// sap.ui.getCore().byId('plantproject1::plantObjectPage--fe::FormContainer::GeneratedFacet1').getFormElements()[1].getFields()[1].setValue(null)
			// 		// return MessageToast.show("Edit successful");
			// 		sap.ui.getCore().byId('plantproject1::plantObjectPage--fe::FormContainer::GeneratedFacet1').getFormElements()[1].getFields()[1].setVisible(false);
			// 		sap.ui.getCore().byId('plantproject1::plantObjectPage--fe::FormContainer::GeneratedFacet1').getFormElements()[1].getFields()[0].setVisible(true);
			// 		return null;
			// 	},
			// 	// onBeforeCreate: function (mParameters) {debugger
			// 	// 	// return this._createDialog("Do you want to create ?");
			// 	// },
			// 	// onBeforeDelete: function (mParameters) {debugger
			// 	// 	// return this._createDialog("Do you want to delete this really nice... object ?");
			// 	// },
			// 	// onAfterSave: function (mParameters) {debugger
			// 	// 	return MessageToast.show("Save successful");
			// 	// },
				// onAfterEdit: function (mParameters) {
				// 	debugger
				// 	sap.ui.getCore().byId('panappbeta::tab1_tab1tovendor_dataObjectPage--fe::FormContainer::VendorResponse').getFormElements()[5].getFields()[1].setValue(sap.ui.getCore().byId('plantproject1::plantObjectPage--fe::FormContainer::GeneratedFacet1').getFormElements()[1].getFields()[0].getValue());
				// 	sap.ui.getCore().byId('panappbeta::tab1_tab1tovendor_dataObjectPage--fe::FormContainer::VendorResponse').getFormElements()[5].getFields()[1].setVisible(true);
				// 	sap.ui.getCore().byId('panappbeta::tab1_tab1tovendor_dataObjectPage--fe::FormContainer::VendorResponse').getFormElements()[5].getFields()[0].setVisible(false);

				// 	// return null;

				// },
			// 	// onAfterDiscard: function (mParameters) {debugger
			// 	// 	return MessageToast.show("Discard successful");
			// 	// },
			// 	// onAfterCreate: function (mParameters) {debugger
			// 	// 	return MessageToast.show("Create successful");
			// 	// },
			// 	// onAfterDelete: function (mParameters) {debugger
			// 	// 	return MessageToast.show("Delete successful");
			// 	// }
			// },
			routing:{
				
				onBeforeBinding:async function(oBindingContext){ 
					const oModel = this.base.getExtensionAPI().getModel();
					var that = this;
					this.getView().getContent()[0].getSections()[0].setVisible(false);
					const v =this.getView().getContent()[0].getHeaderTitle().mAggregations._actionsToolbar.getContent()[4].mProperties.visible;
					debugger
					var result1;
					if(this.getView().getContent()[0].getHeaderTitle().mAggregations._actionsToolbar.getContent()[4].mProperties.visible==true){
					var sFunctionName = "getData";
					// oFunction = oModel.bindContext(`/${Name}(...)`);
					   var complete_url = window.location.href;
					   var pieces = complete_url.split("(");
					   var res = pieces[1];
					//    var res = pieces[1];
            		   var res1 = res.split("'");
					   var data = res1[1];
					
					//    let oFunction = oModel.bindContext(`/${sFunctionName}(...)`);
					//    oFunction.setParameter("ID",data);
					//    await oFunction.execute(); 
					   //  var oContext = oFunction.getBoundContext();
						
					   //  var res = oContext.getObject();
					   //   
					   // await oFunction.execute();
						 
					//    let oContext1 = oFunction.getBoundContext();
						// 
					//    let result1 = oContext1.getObject();
					result1 = await Fimport(oModel,sFunctionName,data);
					}
					   if ((result1==='Pending for Approval')||(result1==='Approved')||(result1==='Rejected')){
						that.getView().getContent()[0].setShowEditHeaderButton(false);
						that.getView().getContent()[0].getHeaderTitle().mAggregations._actionsToolbar.getContent()[1].setEnabled(false);
						that.getView().getContent()[0].getHeaderTitle().mAggregations._actionsToolbar.getContent()[1].setVisible(false);
						that.getView().getContent()[0].getHeaderTitle().mAggregations._actionsToolbar.getContent()[1].destroy();
					   }
					//    var frag4 = this.base.getView().getContent()[0]
					// frag4.attachSectionChange(function(){ 
					// 	var section = this.getScrollingSectionId()
					// 	if (section == "panappbeta::tab1_tab1tovendor_dataObjectPage--fe::FacetSection::VendorResponse"){debugger
					// 	sap.ui.getCore().byId('panappbeta::tab1_tab1tovendor_dataObjectPage--fe::FormContainer::VendorResponse').getFormElements()[5].getFields()[0].setVisible(false);		
					// 	sap.ui.getCore().byId('panappbeta::tab1_tab1tovendor_dataObjectPage--fe::FormContainer::VendorResponse').getFormElements()[5].addField(new sap.m.DatePicker("panappbeta::tab1_tab1tovendor_dataObjectPage--fe::FormContainer::VendorResponse::FormElement::DataField::Vendor_CE_Date::Field", {
					// 			change: async function (event) {
					// 				debugger
					// 				// var oModel = this.base.getExtensionAPI().getModel();
					// 				// sap.ui.getCore().byId('plantproject1::plantObjectPage--fe::FormContainer::GeneratedFacet1').getFormElements()[1].getFields()[0].setValue(sap.ui.getCore().byId('plantproject1::plantObjectPage--fe::FormContainer::GeneratedFacet1').getFormElements()[1].getFields()[1].getValue());
					// 				// var Name = 'updatee';
					// 				// let oFunction = oModel.bindContext(`/${Name}(...)`);
					// 				// oFunction.setParameter("ID", event.mParameters.value + "," + event.oSource.oPropagatedProperties.oBindingContexts.undefined.oBinding.sReducedPath);
					// 				// await oFunction.execute();
					// 			}
					// 		}));
						// }
					// });
				},
				onAfterBinding:async function(oBindingContext){ 
					
					var frag4 = this.base.getView().getContent()[0]
					frag4.attachSectionChange(function(){ 
						var section = this.getScrollingSectionId()
						if (section == "panappbeta::tab1_tab1tovendor_dataObjectPage--fe::FacetSection::VendorResponse"){debugger
							// if(sap.ui.getCore().byId('panappbeta::tab1_tab1tovendor_dataObjectPage--fe::FormContainer::VendorResponse').getFormElements()[5].getFields()[0].getValue()){
							// 	let date = sap.ui.getCore().byId('panappbeta::tab1_tab1tovendor_dataObjectPage--fe::FormContainer::VendorResponse').getFormElements()[5].getFields()[0].getValue();
							// 	sap.ui.getCore().byId('panappbeta::tab1_tab1tovendor_dataObjectPage--fe::FormContainer::VendorResponse').getFormElements()[5].getFields()[1].setDateValue(date.toLocaleDateString());
							// }else{
							// 	sap.ui.getCore().byId('panappbeta::tab1_tab1tovendor_dataObjectPage--fe::FormContainer::VendorResponse').getFormElements()[5].getField()[1].setDateValue();
							// }
							// if(sap.ui.getCore().byId('panappbeta::tab1_tab1tovendor_dataObjectPage--fe::FormContainer::VendorResponse').getFormElements()[5].getFields()[0].getEditable()==true){
							// 	sap.ui.getCore().byId('panappbeta::tab1_tab1tovendor_dataObjectPage--fe::FormContainer::VendorResponse').getFormElements()[5].getFields()[0].getContent().setVisible(false);
							// 	sap.ui.getCore().byId('panappbeta::tab1_tab1tovendor_dataObjectPage--fe::FormContainer::VendorResponse').getFormElements()[5].getFields()[1].setVisible(true);
									
							// 	}else{
							// 		sap.ui.getCore().byId('panappbeta::tab1_tab1tovendor_dataObjectPage--fe::FormContainer::VendorResponse').getFormElements()[5].getFields()[0].getContent().setVisible(true);
							// 		sap.ui.getCore().byId('panappbeta::tab1_tab1tovendor_dataObjectPage--fe::FormContainer::VendorResponse').getFormElements()[5].getFields()[1].setVisible(false);
							// 	}
						// 	sap.ui.getCore().byId('panappbeta::tab1_tab1tovendor_dataObjectPage--fe::FormContainer::VendorResponse').getFormElements()[5].addField(new sap.m.DatePicker("id1", {
						// 		change: async function (event) {
						// 			debugger
						// 			// var oModel = this.base.getExtensionAPI().getModel();
						// 			// sap.ui.getCore().byId('plantproject1::plantObjectPage--fe::FormContainer::GeneratedFacet1').getFormElements()[1].getFields()[0].setValue(sap.ui.getCore().byId('plantproject1::plantObjectPage--fe::FormContainer::GeneratedFacet1').getFormElements()[1].getFields()[1].getValue());
						// 			var Name = 'updatee';
						// 			let oFunction = oModel.bindContext(`/${Name}(...)`);
						// 			oFunction.setParameter("ID", event.mParameters.value + "," + event.oSource.oPropagatedProperties.oBindingContexts.undefined.oBinding.sReducedPath);
						// 			await oFunction.execute();
						// 		}
						// 	}));
						// debugger
						// sap.ui.getCore().byId('panappbeta::tab1_tab1tovendor_dataObjectPage--fe::FormContainer::VendorResponse').getFormElements()[5].getFields()[0].setVisible(false);
						// sap.ui.getCore().byId('panappbeta::tab1_tab1tovendor_dataObjectPage--fe::FormContainer::VendorResponse').getFormElements()[5].getFields()[0].setEditable(false)
						// sap.ui.getCore().byId('panappbeta::tab1_tab1tovendor_dataObjectPage--fe::FormContainer::VendorResponse').getFormElements()[5].getFields()[1].setVisible(true);
						}else{
						
							var columns = sap.ui.getCore().byId(`${section}`).mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations.columns;
							debugger
							if(columns != undefined )
							columns.forEach(col =>{ 
								var colName = col.mProperties.dataProperty;
								var colheader=col.getHeader();
								var mLength = colheader.length;	debugger	
								var valuevendor = sap.ui.getCore().byId(`${section}`).mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations._content.mBindingInfos.rows.binding.oCache.getValue()
											const maxLength = Math.max(...valuevendor.map(item => (item[colName].length ?? 8)));
								if(maxLength > mLength)
									mLength = maxLength; 
							if(mLength>50){
								mLength=50;
							}
							const width = (mLength+2) * 8 + 20 + "px"; 

							col.setWidth(width);
							
										});	
									}
					   });
					   let sObj = {sorters : [{descending: false , name:"Property::slNo"}]}; 
					   await sap.ui.getCore().byId('panappbeta::tab1_tab1tovendor_dataObjectPage--fe::table::vendtoptd::LineItem::PAYMENT_TERM_DETAILS').setSortConditions(sObj);
					   const url =location.href;
					const regex = /PAN_Number='([^']+)'/;
					const match = url.match(regex);
					const filter_Number = match ? match[1] : null;

					let filter = {PAN_Number:[
						{
							"operator": "EQ",
							"values": [
								filter_Number
							],
							"validated": "NotValidated"
						}
					]};
					sap.ui.getCore().byId('panappbeta::tab1_tab1tovendor_dataObjectPage--fe::table::vendtopd::LineItem::PAN_PRICE_DETAILS').setFilterConditions(filter);
					sap.ui.getCore().byId('panappbeta::tab1_tab1tovendor_dataObjectPage--fe::table::vendtoptd::LineItem::PAYMENT_TERM_DETAILS').setFilterConditions(filter);
				// 	debugger
				// 	// sap.ui.getCore().byId('plantproject1::plantObjectPage--fe::FormContainer::GeneratedFacet1').addFormElement(new sap.ui.layout.form.FormElement({
				// 	// 	label:"hello"
				// 	// }));
				// 	var oModel = this.base.getExtensionAPI().getModel();
				// 	// sap.ui.getCore().byId('plantproject1::plantObjectPage--fe::FormContainer::GeneratedFacet1').getFormElements()[1].setVisible(false)
				// 	// sap.ui.getCore().byId('plantproject1::plantObjectPage--fe::FormContainer::GeneratedFacet1').getFormElements()[1].removeAllFields();
				// debugger
				// let path = window.location.hash;
				// let data1 = path.split("tab1tovendor_data");
				// let data2=data1[0].split("PAN_Number=");
				// data2=data2[1].split(",")
				// let data3=data1[1].split("Proposed_Vendor_Code=");
				// data3 = data3[1].split(",")
				// if(sap.ui.getCore().byId('panappbeta::tab1_tab1tovendor_dataObjectPage--fe::FormContainer::VendorResponse').getFormElements()[5].getFields().length==1){
				// sap.ui.getCore().byId('panappbeta::tab1_tab1tovendor_dataObjectPage--fe::FormContainer::VendorResponse').getFormElements()[5].addField(new sap.m.DatePicker({id:"id1", 
				
						
				// 				change: async function (event) {
				// 					debugger
				// 					var oModel = this.getParent().getParent().getParent().getParent().getModel();
				// 					sap.ui.getCore().byId('panappbeta::tab1_tab1tovendor_dataObjectPage--fe::FormContainer::VendorResponse').getFormElements()[5].getFields()[0].getContent().getContentEdit()[0].setValue(sap.ui.getCore().byId('panappbeta::tab1_tab1tovendor_dataObjectPage--fe::FormContainer::VendorResponse').getFormElements()[5].getFields()[1].getValue());
				// 					var Name = 'updatee';
				// 					debugger
				// 					let oFunction = oModel.bindContext(`/${Name}(...)`);
				// 					let path = event.oSource.oPropagatedProperties.oBindingContexts.undefined.oBinding.sReducedPath;
				// 					let data1 = path.split("tab1tovendor_data");
				// 					let data2=data1[0].split("PAN_Number=");
				// 					data2=data2[1].split(",")
				// 					let data3=data1[1].split("Proposed_Vendor_Code=");
				// 					data3 = data3[1].split(",")
				// 					let body = {
				// 						PAN_Number:data2[0],
				// 						Proposed_Vendor_Code:data3[0],
				// 						Vendor_CE_Date:event.mParameters.value
				// 					};
				// 					// oFunction.setParameter("ID", event.mParameters.value + "," + event.oSource.oPropagatedProperties.oBindingContexts.undefined.oBinding.sReducedPath);
				// 					oFunction.setParameter("ID",JSON.stringify(body));
				// 					let result = await oFunction.execute();
				// 					console.log(result);
				// 					// event.mParameters.setDateValue();
				// 				}
				// 			}));
				// 		}
				// 		debugger		
				// if(sap.ui.getCore().byId('panappbeta::tab1_tab1tovendor_dataObjectPage--fe::FormContainer::VendorResponse').getFormElements()[5].getFields()[0].getEditable()==true){
				// sap.ui.getCore().byId('panappbeta::tab1_tab1tovendor_dataObjectPage--fe::FormContainer::VendorResponse').getFormElements()[5].getFields()[0].getContent().setVisible(false);
				// sap.ui.getCore().byId('panappbeta::tab1_tab1tovendor_dataObjectPage--fe::FormContainer::VendorResponse').getFormElements()[5].getFields()[1].setVisible(true);
					
				// }else{
				// 	sap.ui.getCore().byId('panappbeta::tab1_tab1tovendor_dataObjectPage--fe::FormContainer::VendorResponse').getFormElements()[5].getFields()[0].getContent().setVisible(true);
				// 	sap.ui.getCore().byId('panappbeta::tab1_tab1tovendor_dataObjectPage--fe::FormContainer::VendorResponse').getFormElements()[5].getFields()[1].setVisible(false);
				// }
				// sap.ui.getCore().byId('panappbeta::tab1_tab1tovendor_dataObjectPage--fe::FormContainer::VendorResponse').getFormElements()[5].getFields()[1];

				// sap.ui.getCore().byId('panappbeta::tab1_tab1tovendor_dataObjectPage--fe::FormContainer::VendorResponse').getFormElements()[5].addField(new sap.m.DatePicker("panappbeta::tab1_tab1tovendor_dataObjectPage--fe::FormContainer::VendorResponse::FormElement::DataField::Vendor_CE_Date::Field", {
				// 				change: async function (event) {
				// 					debugger
				// 					// var oModel = this.base.getExtensionAPI().getModel();
				// 					// sap.ui.getCore().byId('plantproject1::plantObjectPage--fe::FormContainer::GeneratedFacet1').getFormElements()[1].getFields()[0].setValue(sap.ui.getCore().byId('plantproject1::plantObjectPage--fe::FormContainer::GeneratedFacet1').getFormElements()[1].getFields()[1].getValue());
				// 					// var Name = 'updatee';
				// 					// let oFunction = oModel.bindContext(`/${Name}(...)`);
				// 					// oFunction.setParameter("ID", event.mParameters.value + "," + event.oSource.oPropagatedProperties.oBindingContexts.undefined.oBinding.sReducedPath);
				// 					// await oFunction.execute();
				// 				}
				// 			}));
				// 		debugger
						
						// sap.ui.getCore().byId('panappbeta::tab1_tab1tovendor_dataObjectPage--fe::FormContainer::VendorResponse').getFormElements()[5].getFields()[0].setEditable(false)
						// sap.ui.getCore().byId('panappbeta::tab1_tab1tovendor_dataObjectPage--fe::FormContainer::VendorResponse').getFormElements()[5].getFields()[1].setVisible(true);
					
				},
			}
		}
	});
});
