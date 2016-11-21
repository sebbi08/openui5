/*!
 * ${copyright}
 */

// Provides control sap.ui.table.RowActionItem.
sap.ui.define(['sap/ui/core/Element', './library', 'sap/ui/unified/MenuItem'],
	function(Element, library, MenuItem) {
	"use strict";

	// shortcuts
	var RowActionType = library.RowActionType;


	/**
	 * Constructor for a new RowActionItem.
	 *
	 * @param {string} [sId] id for the new control, generated automatically if no id is given
	 * @param {object} [mSettings] initial settings for the new control
	 *
	 * @class
	 * An action items to be displayed in a <code>RowAction</code> control.
	 * This element must only be used in the context of the <code>sap.ui.table.Table</code> control to define row actions.
	 * @extends sap.ui.core.Element
	 *
	 * @author SAP SE
	 * @version ${version}
	 * @since 1.45.0
	 *
	 * @constructor
	 * @public
	 * @alias sap.ui.table.RowActionItem
	 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
	 */
	var Item = Element.extend("sap.ui.table.RowActionItem", /** @lends sap.ui.table.RowActionItem.prototype */ { metadata : {

		library : "sap.ui.table",
		properties : {
			/**
			 * The icon of the item.
			 */
			icon : {type : "sap.ui.core.URI", group : "Data", defaultValue : null},

			/**
			 * Whether the item should be visible on the screen.
			 */
			visible : {type : "boolean", group : "Misc", defaultValue : true},

			/**
			 * The text of the item. It is used as tooltip and for accessibility purposes.
			 */
			text : {type : "string", group : "Misc", defaultValue : ""},

			/**
			 * The type of the item.
			 * Setting the type ensures default values for the properties <code>icon</code> and <code>text</code>.
			 * If an icon or text is set explicitly this setting is used.
			 */
			type : {type : "sap.ui.table.RowActionType", group : "Behavior", defaultValue : RowActionType.Custom}
		},
		events : {
			/**
			 * The <code>press</code> is fired when the user triggers the corresponding action.
			 */
			press: {
				/**
				 * The item which was pressed.
				 */
				item : {type : "sap.ui.table.RowActionItem"},
				/**
				 * The table row to which the pressed item belongs to.
				 */
				row : {type : "sap.ui.table.Row"}
			}
		}

	}});

	Item.prototype.exit = function() {
		if (this._menuItem) {
			this._menuItem.destroy();
			this._menuItem = null;
		}
	};

	/*
	 * @see JSDoc generated by SAPUI5 control API generator
	 */
	Item.prototype.setIcon = function(sIcon) {
		this.setProperty("icon", sIcon, true);
		this._updateRowAction();
		return this;
	};

	/*
	 * @see JSDoc generated by SAPUI5 control API generator
	 */
	Item.prototype.setText = function(sText) {
		this.setProperty("text", sText, true);
		this._updateRowAction();
		return this;
	};

	/*
	 * @see JSDoc generated by SAPUI5 control API generator
	 */
	Item.prototype.setType = function(sType) {
		this.setProperty("type", sType, true);
		this._updateRowAction();
		return this;
	};

	/*
	 * @see JSDoc generated by SAPUI5 control API generator
	 */
	Item.prototype.setVisible = function(bVisible) {
		this.setProperty("visible", bVisible, true);
		this._updateRowAction(true);
		return this;
	};

	/*
	 * @see JSDoc generated by SAPUI5 control API generator
	 */
	Item.prototype.setTooltip = function(vTooltip) {
		this.setAggregation("tooltip", vTooltip, true);
		this._updateRowAction();
		return this;
	};

	Item.prototype._doFirePress = function() {
		var oParent = this.getParent();
		this.firePress({item: this, row: oParent && oParent._getRow ? oParent._getRow() : null});
	};

	Item.prototype._getMenuItem = function() {
		if (!this._menuItem) {
			var that = this;
			this._menuItem = new MenuItem({
				select: function(oEvent) {
					that._doFirePress();
				}
			});
		}
		this._menuItem.setIcon(this._getIcon());
		this._menuItem.setVisible(this.getVisible());
		this._menuItem.setText(this._getText(false));
		return this._menuItem;
	};

	Item.prototype._getIcon = function() {
		var oIcon = this.getIcon();
		if (oIcon) {
			return oIcon;
		}
		if (this.getType() == RowActionType.Navigation) {
			return "sap-icon://navigation-right-arrow";
		}
		return null;
	};

	Item.prototype._getText = function(bPreferTooltip) {
		var sText = bPreferTooltip ? (this.getTooltip_AsString() || this.getText()) : (this.getText() || this.getTooltip_AsString());
		if (sText) {
			return sText;
		}
		if (this.getType() == RowActionType.Navigation) {
			return this.getParent()._oResBundle.getText("TBL_ROW_ACTION_NAVIGATE");
		}
		return null;
	};

	Item.prototype._syncIcon = function(oIcon) {
		oIcon.setSrc(this._getIcon());
		oIcon.setTooltip(this._getText(true));
	};

	Item.prototype._updateRowAction = function(bForce) {
		var oParent = this.getParent();
		if (oParent && oParent._updateIcons) {
			oParent._updateIcons(bForce);
		}
	};

	return Item;

});
