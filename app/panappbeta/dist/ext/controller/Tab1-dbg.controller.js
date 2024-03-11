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
		return result.value;
	};

	return ControllerExtension.extend('panappbeta.ext.controller.Tab1', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created.
			 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			 * @memberOf panappbeta.ext.controller.Tab1
			 */
			onInit: function () { 
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
				// this.getExtensionAPI.refresh();
			},
			
			onAfterRendering: function () { 
				console.log("rendering");		
				// this.func = async function(oEvent){ 
				// 	const oModel = this.base.getExtensionAPI().getModel();
				// 	let sFunctionName = "sendforapproval";
				// 	let oFunction = oModel.bindContext(`/${sFunctionName}(...)`);
				// 	let appr_url = window.location.href;
				// 	var pieces = appr_url.split("(");
				// }
				// this.base.getExtensionAPI().getIntentBasedNavigation().navigateOutbound(this.func.bind(this));

			
			},
			routing: {
				onBeforeBinding:async function(oBindingContext){   
					// setTimeout(function() {
					// 	const LineItem1 = sap.ui.getCore().byId("project1::parentList--fe::table::parent::LineItem");
					// 	// const longestString = getLongestString(LineItem1, 1); // Assuming the name column is at index 1
					// 	// const width = calculateWidth(longestString);
					// 	// LineItem1.getColumns()[1].setWidth(width);
					// }, 6000);
					// this.getView().getContent()[0].getContent().getContent().getColumns()[1].setVisible(false);
					this.getView().getContent()[0].getHeader().getContent()[0].setVisible(true);
					if(this.getView().getContent()[0].getContent().getContent().getColumns()[1].getPropertyKey()=="draftStatus"){
					this.getView().getContent()[0].getContent().getContent().getColumns()[1].destroy();
					}
					let oExtensionAPI = this.base.getExtensionAPI();
					var headers=[];
					// this.getView().getContent()[0].getHeader().getContent()[0].getItems()[0].getContent().addFilterItem(new sap.m.Button({
					// 	text:"Sync",
					// 	press: async function(oEvent){ 
					// 		console.log(oEvent);
					// 	}
					// }));
					let oModel = oExtensionAPI.getModel();
					let data = {some: "data"};
					let result =await Fimport(oModel,'InsertData',data);
					// let sFunctionName = "InsertData";
					// let oFunction = oModel.bindContext(`/${sFunctionName}(...)`);
					// // let oFunction = oModel.bindContext(`/Books`);
					
					// oFunction.setParameter("ID",JSON.stringify(data));
					// // oFunction.setParameter("Book",{ID:3, title: "BookTitle", stock:10000});
					// await oFunction.execute();
					// // console.log(response);

					// let oContext = oFunction.getBoundContext();

					// let result = oContext.getObject();
					// console.log(result);
					let fname = 'Listdata';
					// let func = oModel.bindContext(`/${fname}(...)`);
					// // let data1 = {some: "data"};
					// func.setParameter('ID',JSON.stringify(data));
					// await func.execute();
					// let cont = func.getBoundContext();
					// // let res = cont.getObject();
					// let res =await Fimport(oModel,fname,data);
					// let dat = JSON.parse(res);
					// console.log(res);
					// for(let i=0;i<this.getView().getContent()[0].getContent().getContent().getColumns().length;i++){
					// 	let header =this.getView().getContent()[0].getContent().getContent().getColumns()[i].getDataProperty().toString();
					// 	let len=header.length+2;
					// 	for (let j =0;j<dat.length;j++){
					// 		let temp = dat[j];
					// 		if(len){
					// 			if(temp[header].length>len){
					// 				len = temp[header].length;
					// 			}
					// 		} else{
					// 			len = temp[header].length;
					// 		}
					// 	}
					// 	let width = len * 8 + 20 + "px"; 
					// 	this.getView().getContent()[0].getContent().getContent().getColumns()[i].setWidth(width);
					// };




				},
				onAfterBinding:function (oEvent) { 
					 
					this.base.getView().getContent()[0].getContent().getContent().getColumns()[0].setHAlign('Left');
				}
			}
		}
	});
});
