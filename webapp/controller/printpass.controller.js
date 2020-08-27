sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
], function (Controller, MessageBox) {
	"use strict";

	return Controller.extend("poc.zvms.controller.printpass", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf poc.zvms.view.printpass
		 */
		onInit: function () {
			this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this._oRouter.getRoute("printpass").attachPatternMatched(this._onEditMatched, this);

		},

		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		_onNavBack: function () {
			var that = this;
			//	that._clearData();
			this.getRouter().navTo("ManageVisitor", {}, true);

		},

		_onEditMatched: function (oEvent) {
			var oParameters = oEvent.getParameters();
			var oModel = this.getView().getModel();

			var that = this;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var txtVisitorId = this.getView().byId("txtVisiId");
			var txtFullName = this.getView().byId("txtFullName");
			var txtGateNo = this.getView().byId("txtGateNo");
			var txtMobileNumber = this.getView().byId("txtMbNo");
			var txtWhomtoMeet = this.getView().byId("txtWhmToMeet");
			var txtCompanyName = this.getView().byId("txtcmpName");
			var txtVisitdate = this.getView().byId("txtVisitDate");
			var txtInTime = this.getView().byId("txtInTime");

			var txtImage = this.getView().byId("idimage");

			if (oParameters.arguments.printid !== "" || oParameters.arguments.printid !== null) {

				this.printid = oParameters.arguments.printid;

				for (var i = 0; i < oModel.getData().Visitors.length; i++) {
					if (oModel.getData().Visitors[i].VisitorId.toString() === this.printid) {
						txtVisitorId.setText(this.printid);
						txtFullName.setText(oModel.getData().Visitors[i].FullName);
						txtGateNo.setText(oModel.getData().Visitors[i].GateNo);
						txtMobileNumber.setText(oModel.getData().Visitors[i].MobileNo);
						txtWhomtoMeet.setText(oModel.getData().Visitors[i].WhoomToMeet);
						txtVisitdate.setText(oModel.getData().Visitors[i].VisitDate);
						txtInTime.setText(oModel.getData().Visitors[i].InTime);

						txtImage.setSrc(oModel.getData().Visitors[i].AuthorPicUrl);

						var that = this;
						that.onPrint();
						return false;
					}
				}

			} else {
				MessageBox.error("Incorrect Data");
			}
		},

		onPrint: function () {
			//	window.print();
			setTimeout(function () {
				window.print();

			}, 500);

			/*var that = this;
			window.onafterprint = that.AfterPrint();*/
		},

	/*	AfterPrint: function () {

				setTimeout(function () {
						var that = this;
					this.getRouter().navTo("ManageVisitor", {}, true);

				}, 700);

				var that = this;
				//	that._clearData();
			}*/
			/**
			 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
			 * (NOT before the first rendering! onInit() is used for that one!).
			 * @memberOf poc.zvms.view.printpass
			 */
			//	onBeforeRendering: function() {
			//
			//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf poc.zvms.view.printpass
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf poc.zvms.view.printpass
		 */
		//	onExit: function() {
		//
		//	}

	});

});