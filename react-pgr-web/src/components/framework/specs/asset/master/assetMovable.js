var dat = {
	"asset.create": {
		"numCols": 12/3,
		"url": "asset-services-maha/assets/_create",
		"tenantIdRequired": true,
		"idJsonPath": "",
		"objectName": "Asset",
		"groups": [
			{
				"label": "ac.create.movable.Header.Details",
				"name": "createAsset",
				"fields": [
						// {
						// 	"name": "NewReferenceNumber",
						// 	"jsonPath": "Asset.code",
						// 	"label": "ac.create.Asset.Id.No",
						// 	"pattern": "^[\s.]*([^\s.][\s.]*){0,100}$",
						// 	"type": "text",
						// 	"isRequired": false,
						// 	"isDisabled": true,
						// 	"requiredErrMsg": "",
						// 	"patternErrMsg": ""
						// },
            {
  						"name": "OldReferenceNumber",
  						"jsonPath": "Asset.oldCode",
  						"label": "ac.create.Old.Asset.Id.No",
  						"pattern": "",
  						"type": "text",
  						"url": "",
  						"isRequired": false,
  						"isDisabled": false,
  						"requiredErrMsg": "",
  						"patternErrMsg": ""
  					},
            {
              "name": "Date",
              "jsonPath": "Asset.dateOfCreation",
              "label": "ac.create.Date",
              "pattern": "",
              "type": "datePicker",
              "isRequired": true,
              "isDisabled": false,
              "requiredErrMsg": "",
              "patternErrMsg": ""
            },
            {
  						"name": "RefNoOfWIP",
  						"jsonPath": "Asset.wipReferenceNo",
  						"label": "ac.create.Ref.WIP.Register",
  						"pattern": "",
  						"type": "text",
  						"url": "",
  						"isRequired": true,
  						"isDisabled": false,
  						"requiredErrMsg": "",
  						"patternErrMsg": ""
  					},
            {
  						"name": "AssetName",
  						"jsonPath": "Asset.name",
  						"label": "ac.create.Asset.Name",
  						"pattern": "",
  						"type": "text",
  						"url": "",
  						"isRequired": true,
  						"isDisabled": false,
  						"requiredErrMsg": "",
  						"patternErrMsg": ""
  					},
						{
  						"name": "AssetCategoryType",
  						"jsonPath": "Asset.assetCategory.assetCategoryType",
  						"label": "Asset Category Type",
  						"pattern": "",
  						"type": "text",
  						"url": "",
  						"isRequired": true,
  						"isDisabled": true,
  						"requiredErrMsg": "",
  						"patternErrMsg": "",
							"defaultValue": "MOVABLE",
							"isHidden": true
  					},
						{
  						"name": "AssetSubType",
  						"jsonPath": "Asset.assetCategory.id",
  						"label": "ac.create.Asset.SubCategory.Name",
  						"pattern": "",
  						"type": "singleValueList",
							"url": "",
							"isRequired": true,
  						"isDisabled": false,
  						"requiredErrMsg": "",
  						"patternErrMsg": ""
  					},
            {
							"name": "Department",
							"jsonPath": "Asset.departmentCode",
							"label": "ac.create.Department",
							"pattern": "",
							"type": "singleValueList",
							"url": "/egov-mdms-service/v1/_get?&masterName=Department&moduleName=common-masters|$..code|$..name",
							"isRequired": true,
							"isDisabled": false,
							"requiredErrMsg": "",
							"patternErrMsg": ""
  					},
            {
  						"name": "NoOfOrder",
  						"jsonPath": "Asset.orderNumber",
  						"label": "ac.create.No.Of.Order",
  						"pattern": "^[a-zA-Z0-9_]*$",
  						"type": "number",
  						"url": "",
  						"isRequired": false,
  						"isDisabled": false,
  						"requiredErrMsg": "",
  						"patternErrMsg": "Please enter valid No of Order (Alpha/Numeric)"
  					},
            {
              "name": "DateOfOrder",
              "jsonPath": "Asset.orderDate",
              "label": "ac.create.Date.Of.Order",
              "pattern": "",
              "type": "datePicker",
              "isRequired": false,
              "isDisabled": false,
              "requiredErrMsg": "",
              "patternErrMsg": ""
            },
            {
              "name": "DateOfAcquisition",
              "jsonPath": "Asset.acquisitionDate",
              "label": "ac.create.Date.Of.Acquisition",
              "pattern": "",
              "type": "datePicker",
              "isRequired": true,
              "isDisabled": false,
              "requiredErrMsg": "",
              "patternErrMsg": ""
            },
            {
  						"name": "OriginalValueofAsset",
  						"jsonPath": "Asset.originalValue",
  						"label": "ac.create.Original.Value.of.Asset",
  						"pattern": "",
  						"type": "text",
  						"url": "",
  						"isRequired": true,
  						"isDisabled": false,
  						"requiredErrMsg": "",
  						"patternErrMsg": ""
  					},
				]},
      {
				"label": "ac.create.Location.Details",
				"name": "LocationField",
        "multiple":false,
        "jsonPath":"",
				"fields": [
					{
            "name": "searchLocation",
						"jsonPathAddress": "Asset.location",
            "jsonPathLng": "Asset.longitude",
						"jsonPathLat": "Asset.latitude",
            "label": "search",
            "pattern": "",
            "type": "googleMaps",
            "url": "",
            "isRequired": false,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "Location",
            "jsonPath": "Asset.location",
            "label": "ac.create.Location",
            "pattern": "",
            "type": "text",
            "url": "",
            "isRequired": false,
            "isDisabled": true,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "Longitude",
            "jsonPath": "Asset.longitude",
            "label": "ac.create.Longitude",
            "pattern": "",
            "type": "text",
            "url": "",
            "isRequired": false,
            "isDisabled": true,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "Latitude",
            "jsonPath": "Asset.latitude",
            "label": "ac.create.Latitude",
            "pattern": "",
            "type": "text",
            "url": "",
            "isRequired": false,
            "isDisabled": true,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "Address",
            "jsonPath": "Asset.address",
            "label": "ac.create.Address",
            "pattern": "",
            "type": "text",
            "url": "",
            "isRequired": true,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          }
				]
			},
      {
				"label": "ac.create.Asset.Details",
				"name": "AssetField",
        "multiple":false,
        "jsonPath":"",
				"fields": [
					{
            "name": "NoofQuantity",
            "jsonPath": "Asset.quantity",
            "label": "ac.create.No.of.Quantity",
            "pattern": "",
            "type": "number",
            "url": "",
            "isRequired": false,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "AnticipatedLifeOfAsset",
            "jsonPath": "Asset.anticipatedLife",
            "label": "ac.create.Anticipated.life.of.Asset",
            "pattern": "",
            "type": "text",
            "url": "",
            "isRequired": true,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
					{
						"name": "ModeofAcquisition",
						"jsonPath": "Asset.modeOfAcquisition",
						"label": "ac.create.Mode.of.Acquisition",
						"pattern": "",
						"type": "singleValueList",
						"url": "",
						"isRequired": true,
						"isDisabled": false,
						"requiredErrMsg": "",
						"patternErrMsg": "",
						"defaultValue": [  {
						"key": "ACQUIRED",
						"value": "ACQUIRED"
					},  {
						"key": "CONSTRUCTION",
						"value": "CONSTRUCTION"
					},  {
						"key": "PURCHASE",
						"value": "PURCHASE"
					}
				]
			},
          {
            "name": "FromWhomAcquired",
            "jsonPath": "Asset.acquiredFrom",
            "label": "ac.create.From.whom.acquired",
            "pattern": "",
            "type": "text",
            "url": "",
            "isRequired": false,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "TitleDocumentsAvailable",
            "jsonPath": "Asset.titleDocumentsAvalable",
            "label": "ac.create.Title.documents.available",
            "pattern": "",
            "type": "text",
            "url": "",
            "isRequired": false,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "SourceOfFunds",
            "jsonPath": "Asset.funSource",
            "label": "ac.create.Source.of.funds",
            "pattern": "",
            "type": "singleValueList",
            "url": "",
            "isRequired": false,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "Warranty",
            "jsonPath": "Asset.warrantyAvailable",
            "label": "ac.create.Warranty",
            "pattern": "",
            "type": "radio",
            "url": "",
            "isRequired": false,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": "",
            "values": [{"label":"Yes", "value":true},{"label":"No", "value":false}],
            "defaultValue":true
          },
          {
            "name": "WarrantyExpiryDate",
            "jsonPath": "Asset.warrantyExpiryDate",
            "label": "ac.create.Warranty.expiry.date",
            "pattern": "",
            "type": "datePicker",
            "url": "",
            "isRequired": false,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
					{
            "name": "AssetDescription",
            "jsonPath": "Asset.description",
            "label": "ac.create.Asset.description",
            "pattern": "",
            "type": "text",
            "url": "",
            "isRequired": true,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
					{
            "name": "DefectLiabilityPeriod",
            "jsonPath": "Asset.defectLiabilityPeriod.year",
            "label": "ac.create.Defect.liability.Period",
            "pattern": "",
            "type": "number",
            "url": "",
            "isRequired": false,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
					{
            "name": "DefectLiabilityPeriod",
            "jsonPath": "Asset.defectLiabilityPeriod.month",
            "label": "ac.create.Defect.liability.Period.month",
            "pattern": "",
            "type": "number",
            "url": "",
            "isRequired": false,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
					{
            "name": "DefectLiabilityPeriod",
            "jsonPath": "Asset.defectLiabilityPeriod.day",
            "label": "ac.create.Defect.liability.Period.day",
            "pattern": "",
            "type": "number",
            "url": "",
            "isRequired": false,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },

          {
            "name": "SecurityDepositRetained",
            "jsonPath": "Asset.securityDepositRetained",
            "label": "ac.create.Security.deposit.retained",
            "pattern": "",
            "type": "number",
            "url": "",
            "isRequired": false,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "SecurityDepositRealized",
            "jsonPath": "Asset.securityDepositRealized",
            "label": "ac.create.Security.deposit.realized",
            "pattern": "",
            "type": "number",
            "url": "",
            "isRequired": false,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "AssetAcountCode",
            "jsonPath": "Asset.assetAccount",
            "label": "ac.create.Asset.account.code",
            "pattern": "",
            "type": "singleValueList",
            "url": "/egf-masters/accountcodepurposes/_search?tenantId=default&name=Fixed Assets|$..name|$..name",
            "isRequired": true,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "AccumulatedDepreciationAccount",
            "jsonPath": "Asset.accumulatedDepreciationAccount",
            "label": "ac.create.Accumulated.Depreciation.Account",
            "pattern": "",
            "type": "singleValueList",
            "url": "/egf-masters/accountcodepurposes/_search?tenantId=default&name=Accumulated Depreciation|$..name|$..name",
            "isRequired": true,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "RevaluationReserveAccount",
            "jsonPath": "Asset.revaluationReserveAccount",
            "label": "ac.create.Revaluation.Reserve.Account",
            "pattern": "",
            "type": "singleValueList",
            "url": "/egf-masters/accountcodepurposes/_search?tenantId=default&name=Revaluation Reserve Account|$..name|$..name",
            "isRequired": true,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "DepreciationExpensesAccount ",
            "jsonPath": "Asset.depreciationExpenseAccount",
            "label": "ac.create.Depreciation.Expenses.Account",
            "pattern": "",
            "type": "singleValueList",
            "url": "/egf-masters/accountcodepurposes/_search?tenantId=default&name=Depreciation Expense Account|$..name|$..name",
            "isRequired": true,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },

				]
			},
      {
				"name": "TableField",
        "jsonPath":"",
				"fields": [
          // {
          //   "name": "AnticipatedLifeOfAsset",
          //   "label": "Anticipated life of Asset",
          //   "type": "dynamicTable"
          //   "resultList": {
          //     "resultHeader": [{"label": "asset.create.test"}],
          //     "resultValues": [[{}, ], [], []]
          //   }
          // },


					{
            "name": "OpeningDate",
            "jsonPath": "Asset.openingDate",
            "label": "ac.create.Opening.date",
            "pattern": "",
            "type": "datePicker",
            "url": "",
            "isRequired": true,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "OpeningWrittenDownValue",
            "jsonPath": "Asset.grossValue",
            "label": "ac.create.Opening.Written.down.Value",
            "pattern": "",
            "type": "number",
            "url": "",
            "isRequired": true,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          // {
          //   "name": "AdditionDate",
          //   "jsonPath": "",
          //   "label": "ac.create.Addition.Date",
          //   "pattern": "",
          //   "type": "datePicker",
          //   "url": "",
          //   "isRequired": false,
          //   "isDisabled": false,
          //   "requiredErrMsg": "",
          //   "patternErrMsg": ""
          // },
          // {
          //   "name": "AdditionValue",
          //   "jsonPath": "",
          //   "label": "ac.create.Addition.Value",
          //   "pattern": "",
          //   "type": "text",
          //   "url": "",
          //   "isRequired": false,
          //   "isDisabled": false,
          //   "requiredErrMsg": "",
          //   "patternErrMsg": ""
          // },
          // {
          //   "name": "RevaluationDate",
          //   "jsonPath": "",
          //   "label": "ac.create.Revaluation.date",
          //   "pattern": "",
          //   "type": "datePicker",
          //   "url": "",
          //   "isRequired": false,
          //   "isDisabled": false,
          //   "requiredErrMsg": "",
          //   "patternErrMsg": ""
          // },
          // {
          //   "name": "RevaluationValue",
          //   "jsonPath": "",
          //   "label": "ac.create.Revaluation.Value",
          //   "pattern": "",
          //   "type": "text",
          //   "url": "",
          //   "isRequired": false,
          //   "isDisabled": false,
          //   "requiredErrMsg": "",
          //   "patternErrMsg": ""
          // },
          // {
          //   "name": "DepreciationDate",
          //   "jsonPath": "",
          //   "label": "ac.create.Depreciation.Date",
          //   "pattern": "",
          //   "type": "datePicker",
          //   "url": "",
          //   "isRequired": false,
          //   "isDisabled": false,
          //   "requiredErrMsg": "",
          //   "patternErrMsg": ""
          // },
          // {
          //   "name": "DepreciationValue",
          //   "jsonPath": "",
          //   "label": "ac.create.Depreciation.Value",
          //   "pattern": "",
          //   "type": "text",
          //   "url": "",
          //   "isRequired": false,
          //   "isDisabled": false,
          //   "requiredErrMsg": "",
          //   "patternErrMsg": ""
          // },
          // {
          //   "name": "Closing date",
          //   "jsonPath": "",
          //   "label": "ac.create.Closing.Date",
          //   "pattern": "",
          //   "type": "datePicker",
          //   "url": "",
          //   "isRequired": false,
          //   "isDisabled": false,
          //   "requiredErrMsg": "",
          //   "patternErrMsg": ""
          // },
          // {
          //   "name": "ClosingValue",
          //   "jsonPath": "",
          //   "label": "ac.create.Closing.written.Down.Value",
          //   "pattern": "",
          //   "type": "datePicker",
          //   "url": "",
          //   "isRequired": false,
          //   "isDisabled": false,
          //   "requiredErrMsg": "",
          //   "patternErrMsg": ""
          // }

				]
			}
		]
	},
	"asset.search": {
		"numCols": 12/3,
		"url": "/asset-services/assets/_search",
		"tenantIdRequired": true,
		"useTimestamp": true,
		"objectName": "Asset",
		"groups": [
			{
				"label": "ac.search.asset.title",
				"name": "createCategoryType",
				"fields": [
					{
						"name": "AssetSearchCode",
						"jsonPath": "code",
						"label": "ac.search.asset.code",
						"pattern": "",
						"type": "text",
						"url": "",
						"isRequired": false,
						"isDisabled": false,
						"requiredErrMsg": "",
						"patternErrMsg": ""
					},
					{
						"name": "AssetSearchName",
						"jsonPath": "name",
						"label": "ac.search.asset.name",
						"pattern": "",
						"type": "text",
						"url": "",
						"isRequired": false,
						"isDisabled": false,
						"requiredErrMsg": "",
						"patternErrMsg": ""
					},
					{
						"name": "AssetSearchAssetCategory",
						"jsonPath": "assetCategory",
						"label": "ac.search.category",
						"pattern": "",
						"type": "singleValueList",
						"url": "",
						"isRequired": false,
						"isDisabled": false,
						"requiredErrMsg": "",
						"patternErrMsg": ""
					},
					{
						"name": "AssetSearchDepartment",
						"jsonPath": "department",
						"label": "ac.search.department",
						"pattern": "",
						"type": "singleValueList",
						"url": "",
						"isRequired": false,
						"isDisabled": false,
						"requiredErrMsg": "",
						"patternErrMsg": ""
					},
					{
						"name": "AssetSearchStatus",
						"jsonPath": "status",
						"label": "ac.search.status",
						"pattern": "",
						"type": "singleValueList",
						"url": "",
						"isRequired": false,
						"isDisabled": false,
						"requiredErrMsg": "",
						"patternErrMsg": ""
					}
				]
			}
		],
		"result": {
			"header": [{label: "ac.create.Asset.account.code"},{label: "ac.create.Asset.Name"}, {label: "ac.create.asset.asset.category.type"}, {label: "ac.create.Department"}, {label: "ac.search.status"}],
			"values": ["code","name", "category", "department", "status"],
			"resultPath": "Asset",
			// "rowClickUrlUpdate": "/update/asset/assetMovable/{id}",
			// "rowClickUrlView": "/view/asset/assetMovable/{id}"
			}
	},
	"asset.view": {
		"numCols": 12/2,
		"url": "/asset-services-maha/assets/_search?id={id}",
		"tenantIdRequired": true,
		"useTimestamp": true,
		"objectName": "Assets",
		"groups": [
			{
				"label": "ac.create.movable.Header.Details",
				"name": "createAsset",
				"fields": [
						{
							"name": "AssetIdNo",
							"jsonPath": "Assets[0].code",
							"label": "ac.create.Asset.Id.No",
							"pattern": "",
							"type": "text",
							"isRequired": false,
							"isDisabled": true,
							"requiredErrMsg": "",
							"patternErrMsg": ""
						},
            {
  						"name": "OldReferenceNumber",
  						"jsonPath": "Assets[0].oldCode",
  						"label": "ac.create.Old.Asset.Id.No",
  						"pattern": "",
  						"type": "text",
  						"url": "",
  						"isRequired": false,
  						"isDisabled": false,
  						"requiredErrMsg": "",
  						"patternErrMsg": ""
  					},
            {
              "name": "Date",
              "jsonPath": "Assets[0].dateOfCreation",
              "label": "ac.create.Date",
              "pattern": "",
              "type": "datePicker",
              "isRequired": true,
              "isDisabled": false,
              "requiredErrMsg": "",
              "patternErrMsg": ""
            },
            {
  						"name": "RefNoOfWIP",
  						"jsonPath": "Assets[0].wipReferenceNo",
  						"label": "ac.create.Ref.WIP.Register",
  						"pattern": "",
  						"type": "text",
  						"url": "",
  						"isRequired": true,
  						"isDisabled": false,
  						"requiredErrMsg": "",
  						"patternErrMsg": ""
  					},
            {
  						"name": "AssetName",
  						"jsonPath": "Assets[0].name",
  						"label": "ac.create.Asset.Name",
  						"pattern": "",
  						"type": "text",
  						"url": "",
  						"isRequired": true,
  						"isDisabled": false,
  						"requiredErrMsg": "",
  						"patternErrMsg": ""
  					},
						{
  						"name": "AssetCategoryType",
  						"jsonPath": "Assets[0].assetCategory.assetCategoryType",
  						"label": "Asset Category Type",
  						"pattern": "",
  						"type": "text",
  						"url": "",
  						"isRequired": true,
  						"isDisabled": true,
  						"requiredErrMsg": "",
  						"patternErrMsg": "",
							"defaultValue": "MOVABLE",
							"isHidden": true
  					},
						{
  						"name": "AssetSubType",
  						"jsonPath": "Assets[0].assetCategory.id",
  						"label": "ac.create.Asset.SubCategory.Name",
  						"pattern": "",
  						"type": "singleValueList",
							"url": "",
							"isRequired": true,
  						"isDisabled": false,
  						"requiredErrMsg": "",
  						"patternErrMsg": ""
  					},
            {
							"name": "Department",
							"jsonPath": "Assets[0].departmentCode",
							"label": "ac.create.Department",
							"pattern": "",
							"type": "singleValueList",
							"url": "/egov-mdms-service/v1/_get?&masterName=Department&moduleName=common-masters|$..code|$..name",
							"isRequired": true,
							"isDisabled": false,
							"requiredErrMsg": "",
							"patternErrMsg": ""
  					},
            {
  						"name": "NoOfOrder",
  						"jsonPath": "Assets[0].orderNumber",
  						"label": "ac.create.No.Of.Order",
  						"pattern": "^[a-zA-Z0-9_]*$",
  						"type": "number",
  						"url": "",
  						"isRequired": false,
  						"isDisabled": false,
  						"requiredErrMsg": "",
  						"patternErrMsg": "Please enter valid No of Order (Alpha/Numeric)"
  					},
            {
              "name": "DateOfOrder",
              "jsonPath": "Assets[0].orderDate",
              "label": "ac.create.Date.Of.Order",
              "pattern": "",
              "type": "datePicker",
              "isRequired": false,
              "isDisabled": false,
              "requiredErrMsg": "",
              "patternErrMsg": ""
            },
            {
              "name": "DateOfAcquisition",
              "jsonPath": "Assets[0].acquisitionDate",
              "label": "ac.create.Date.Of.Acquisition",
              "pattern": "",
              "type": "datePicker",
              "isRequired": true,
              "isDisabled": false,
              "requiredErrMsg": "",
              "patternErrMsg": ""
            },
            {
  						"name": "OriginalValueofAsset",
  						"jsonPath": "Assets[0].originalValue",
  						"label": "ac.create.Original.Value.of.Asset",
  						"pattern": "",
  						"type": "text",
  						"url": "",
  						"isRequired": true,
  						"isDisabled": false,
  						"requiredErrMsg": "",
  						"patternErrMsg": ""
  					},
				]},
      {
				"label": "ac.create.Location.Details",
				"name": "LocationField",
        "multiple":false,
        "jsonPath":"",
				"fields": [
					{
            "name": "searchLocation",
						"jsonPathAddress": "Assets[0].location",
            "jsonPathLng": "Asset.longitude",
						"jsonPathLat": "Asset.latitude",
            "label": "search",
            "pattern": "",
            "type": "googleMaps",
            "url": "",
            "isRequired": false,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "Location",
            "jsonPath": "Assets[0].location",
            "label": "ac.create.Location",
            "pattern": "",
            "type": "text",
            "url": "",
            "isRequired": false,
            "isDisabled": true,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "Longitude",
            "jsonPath": "Assets[0].longitude",
            "label": "ac.create.Longitude",
            "pattern": "",
            "type": "text",
            "url": "",
            "isRequired": false,
            "isDisabled": true,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "Latitude",
            "jsonPath": "Assets[0].latitude",
            "label": "ac.create.Latitude",
            "pattern": "",
            "type": "text",
            "url": "",
            "isRequired": false,
            "isDisabled": true,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "Address",
            "jsonPath": "Assets[0].address",
            "label": "ac.create.Address",
            "pattern": "",
            "type": "text",
            "url": "",
            "isRequired": true,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          }
				]
			},
      {
				"label": "ac.create.Asset.Details",
				"name": "AssetField",
        "multiple":false,
        "jsonPath":"",
				"fields": [
					{
            "name": "NoofQuantity",
            "jsonPath": "Assets[0].quantity",
            "label": "ac.create.No.of.Quantity",
            "pattern": "",
            "type": "number",
            "url": "",
            "isRequired": false,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "AnticipatedLifeOfAsset",
            "jsonPath": "Assets[0].anticipatedLife",
            "label": "ac.create.Anticipated.life.of.Asset",
            "pattern": "",
            "type": "text",
            "url": "",
            "isRequired": true,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
					{
						"name": "ModeofAcquisition",
						"jsonPath": "Assets[0].modeOfAcquisition",
						"label": "ac.create.Mode.of.Acquisition",
						"pattern": "",
						"type": "singleValueList",
						"url": "",
						"isRequired": true,
						"isDisabled": false,
						"requiredErrMsg": "",
						"patternErrMsg": "",
						"defaultValue": [  {
						"key": "ACQUIRED",
						"value": "ACQUIRED"
					},  {
						"key": "CONSTRUCTION",
						"value": "CONSTRUCTION"
					},  {
						"key": "PURCHASE",
						"value": "PURCHASE"
					}
				]
			},
          {
            "name": "FromWhomAcquired",
            "jsonPath": "Assets[0].acquiredFrom",
            "label": "ac.create.From.whom.acquired",
            "pattern": "",
            "type": "text",
            "url": "",
            "isRequired": false,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "TitleDocumentsAvailable",
            "jsonPath": "Assets[0].titleDocumentsAvalable",
            "label": "ac.create.Title.documents.available",
            "pattern": "",
            "type": "text",
            "url": "",
            "isRequired": false,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "SourceOfFunds",
            "jsonPath": "Assets[0].funSource",
            "label": "ac.create.Source.of.funds",
            "pattern": "",
            "type": "singleValueList",
            "url": "",
            "isRequired": false,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "Warranty",
            "jsonPath": "Assets[0].warrantyAvailable",
            "label": "ac.create.Warranty",
            "pattern": "",
            "type": "radio",
            "url": "",
            "isRequired": false,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": "",
            "values": [{"label":"Yes", "value":true},{"label":"No", "value":false}],
            "defaultValue":true
          },
          {
            "name": "WarrantyExpiryDate",
            "jsonPath": "Assets[0].warrantyExpiryDate",
            "label": "ac.create.Warranty.expiry.date",
            "pattern": "",
            "type": "datePicker",
            "url": "",
            "isRequired": false,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
					{
            "name": "DefectLiabilityPeriod",
            "jsonPath": "Assets[0].defectLiabilityPeriod.year",
            "label": "ac.create.Defect.liability.Period",
            "pattern": "",
            "type": "number",
            "url": "",
            "isRequired": false,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
					{
            "name": "DefectLiabilityPeriod",
            "jsonPath": "Assets[0].defectLiabilityPeriod.month",
            "label": "ac.create.Defect.liability.Period.month",
            "pattern": "",
            "type": "number",
            "url": "",
            "isRequired": false,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
					{
            "name": "DefectLiabilityPeriod",
            "jsonPath": "Assets[0].defectLiabilityPeriod.day",
            "label": "ac.create.Defect.liability.Period.day",
            "pattern": "",
            "type": "number",
            "url": "",
            "isRequired": false,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },

          {
            "name": "SecurityDepositRetained",
            "jsonPath": "Assets[0].securityDepositRetained",
            "label": "ac.create.Security.deposit.retained",
            "pattern": "",
            "type": "number",
            "url": "",
            "isRequired": false,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "SecurityDepositRealized",
            "jsonPath": "Assets[0].securityDepositRealized",
            "label": "ac.create.Security.deposit.realized",
            "pattern": "",
            "type": "number",
            "url": "",
            "isRequired": false,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "AssetDescription",
            "jsonPath": "Assets[0].description",
            "label": "ac.create.Asset.description",
            "pattern": "",
            "type": "text",
            "url": "",
            "isRequired": true,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "AssetAcountCode",
            "jsonPath": "Assets[0].assetAccount",
            "label": "ac.create.Asset.account.code",
            "pattern": "",
            "type": "singleValueList",
            "url": "/egf-masters/accountcodepurposes/_search?tenantId=default&name=Fixed Assets|$..name|$..name",
            "isRequired": true,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "AccumulatedDepreciationAccount",
            "jsonPath": "Assets[0].accumulatedDepreciationAccount",
            "label": "ac.create.Accumulated.Depreciation.Account",
            "pattern": "",
            "type": "singleValueList",
            "url": "/egf-masters/accountcodepurposes/_search?tenantId=default&name=Accumulated Depreciation|$..name|$..name",
            "isRequired": true,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "RevaluationReserveAccount",
            "jsonPath": "Assets[0].revaluationReserveAccount",
            "label": "ac.create.Revaluation.Reserve.Account",
            "pattern": "",
            "type": "singleValueList",
            "url": "/egf-masters/accountcodepurposes/_search?tenantId=default&name=Revaluation Reserve Account|$..name|$..name",
            "isRequired": true,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "DepreciationExpensesAccount ",
            "jsonPath": "Assets[0].depreciationExpenseAccount",
            "label": "ac.create.Depreciation.Expenses.Account",
            "pattern": "",
            "type": "singleValueList",
            "url": "/egf-masters/accountcodepurposes/_search?tenantId=default&name=Depreciation Expense Account|$..name|$..name",
            "isRequired": true,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },

				]
			},
      {
				"name": "TableField",
        "jsonPath":"",
				"fields": [
          // {
          //   "name": "AnticipatedLifeOfAsset",
          //   "label": "Anticipated life of Asset",
          //   "type": "dynamicTable"
          //   "resultList": {
          //     "resultHeader": [{"label": "asset.create.test"}],
          //     "resultValues": [[{}, ], [], []]
          //   }
          // },


					{
            "name": "OpeningDate",
            "jsonPath": "Assets[0].openingDate",
            "label": "ac.create.Opening.date",
            "pattern": "",
            "type": "datePicker",
            "url": "",
            "isRequired": true,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "OpeningWrittenDownValue",
            "jsonPath": "Assets[0].grossValue",
            "label": "ac.create.Opening.Written.down.Value",
            "pattern": "",
            "type": "number",
            "url": "",
            "isRequired": true,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          // {
          //   "name": "AdditionDate",
          //   "jsonPath": "Assets[0]",
          //   "label": "ac.create.Addition.Date",
          //   "pattern": "",
          //   "type": "datePicker",
          //   "url": "",
          //   "isRequired": false,
          //   "isDisabled": false,
          //   "requiredErrMsg": "",
          //   "patternErrMsg": ""
          // },
          // {
          //   "name": "AdditionValue",
          //   "jsonPath": "Assets[0]",
          //   "label": "ac.create.Addition.Value",
          //   "pattern": "",
          //   "type": "text",
          //   "url": "",
          //   "isRequired": false,
          //   "isDisabled": false,
          //   "requiredErrMsg": "",
          //   "patternErrMsg": ""
          // },
          // {
          //   "name": "RevaluationDate",
          //   "jsonPath": "Assets[0]",
          //   "label": "ac.create.Revaluation.date",
          //   "pattern": "",
          //   "type": "datePicker",
          //   "url": "",
          //   "isRequired": false,
          //   "isDisabled": false,
          //   "requiredErrMsg": "",
          //   "patternErrMsg": ""
          // },
          // {
          //   "name": "RevaluationValue",
          //   "jsonPath": "Assets[0]",
          //   "label": "ac.create.Revaluation.Value",
          //   "pattern": "",
          //   "type": "text",
          //   "url": "",
          //   "isRequired": false,
          //   "isDisabled": false,
          //   "requiredErrMsg": "",
          //   "patternErrMsg": ""
          // },
          // {
          //   "name": "DepreciationDate",
          //   "jsonPath": "Assets[0]",
          //   "label": "ac.create.Depreciation.Date",
          //   "pattern": "",
          //   "type": "datePicker",
          //   "url": "",
          //   "isRequired": false,
          //   "isDisabled": false,
          //   "requiredErrMsg": "",
          //   "patternErrMsg": ""
          // },
          // {
          //   "name": "DepreciationValue",
          //   "jsonPath": "Assets[0]",
          //   "label": "ac.create.Depreciation.Value",
          //   "pattern": "",
          //   "type": "text",
          //   "url": "",
          //   "isRequired": false,
          //   "isDisabled": false,
          //   "requiredErrMsg": "",
          //   "patternErrMsg": ""
          // },
          // {
          //   "name": "Closing date",
          //   "jsonPath": "Assets[0]",
          //   "label": "ac.create.Closing.Date",
          //   "pattern": "",
          //   "type": "datePicker",
          //   "url": "",
          //   "isRequired": false,
          //   "isDisabled": false,
          //   "requiredErrMsg": "",
          //   "patternErrMsg": ""
          // },
          // {
          //   "name": "ClosingValue",
          //   "jsonPath": "Assets[0]",
          //   "label": "ac.create.Closing.written.Down.Value",
          //   "pattern": "",
          //   "type": "datePicker",
          //   "url": "",
          //   "isRequired": false,
          //   "isDisabled": false,
          //   "requiredErrMsg": "",
          //   "patternErrMsg": ""
          // }

				]
			}
		]
	},
	"asset.update": {
		"numCols": 12/2,
		"searchUrl": "/asset-services/assets/_search?ids={id}",
		"url": "",
		"tenantIdRequired": true,
		"useTimestamp": true,
		"objectName": "Asset[0]",
		"groups": [
			{
				"label": "ac.create.movable.Header.Details",
				"name": "createAsset",
				"fields": [
						{
							"name": "NewReferenceNumber",
							"jsonPath": "",
							"label": "ac.create.Asset.Id.No",
							"pattern": "^[\s.]*([^\s.][\s.]*){0,100}$",
							"type": "text",
							"isRequired": false,
							"isDisabled": false,
							"requiredErrMsg": "",
							"patternErrMsg": ""
						},
            {
  						"name": "OldReferenceNumber",
  						"jsonPath": "",
  						"label": "ac.create.Old.Asset.Id.No",
  						"pattern": "",
  						"type": "text",
  						"url": "",
  						"isRequired": false,
  						"isDisabled": false,
  						"requiredErrMsg": "",
  						"patternErrMsg": ""
  					},
            {
              "name": "Date",
              "jsonPath": "",
              "label": "ac.create.Date",
              "pattern": "",
              "type": "datePicker",
              "isRequired": true,
              "isDisabled": false,
              "requiredErrMsg": "",
              "patternErrMsg": ""
            },
            {
  						"name": "RefNoOfWIP",
  						"jsonPath": "",
  						"label": "ac.create.Ref.WIP.Register",
  						"pattern": "",
  						"type": "singleValueList",
  						"url": "",
  						"isRequired": true,
  						"isDisabled": false,
  						"requiredErrMsg": "",
  						"patternErrMsg": ""
  					},
            {
  						"name": "AssetName",
  						"jsonPath": "",
  						"label": "ac.create.Asset.Name",
  						"pattern": "",
  						"type": "text",
  						"url": "",
  						"isRequired": true,
  						"isDisabled": false,
  						"requiredErrMsg": "",
  						"patternErrMsg": ""
  					},
            {
  						"name": "AssetCategoryType",
  						"jsonPath": "",
  						"label": "ac.create.Asset.Category",
  						"pattern": "",
  						"type": "singleValueList",
  						"url": "",
  						"isRequired": true,
  						"isDisabled": false,
  						"requiredErrMsg": "",
  						"patternErrMsg": ""
  					},
            {
  						"name": "Department",
  						"jsonPath": "",
  						"label": "ac.create.Department",
  						"pattern": "",
  						"type": "singleValueList",
  						"url": "",
  						"isRequired": true,
  						"isDisabled": false,
  						"requiredErrMsg": "",
  						"patternErrMsg": ""
  					},
            {
  						"name": "NoOfOrder",
  						"jsonPath": "",
  						"label": "ac.create.No.Of.Order",
  						"pattern": "",
  						"type": "number",
  						"url": "",
  						"isRequired": false,
  						"isDisabled": false,
  						"requiredErrMsg": "",
  						"patternErrMsg": ""
  					},
            {
              "name": "DateOfOrder",
              "jsonPath": "",
              "label": "ac.create.Date.Of.Order",
              "pattern": "",
              "type": "datePicker",
              "isRequired": false,
              "isDisabled": false,
              "requiredErrMsg": "",
              "patternErrMsg": ""
            },
            {
              "name": "DateOfAcquisition",
              "jsonPath": "",
              "label": "ac.create.Date.Of.Acquisition",
              "pattern": "",
              "type": "datePicker",
              "isRequired": true,
              "isDisabled": false,
              "requiredErrMsg": "",
              "patternErrMsg": ""
            },
            {
  						"name": "OriginalValueofAsset",
  						"jsonPath": "",
  						"label": "ac.create.Original.Value.of.Asset",
  						"pattern": "",
  						"type": "text",
  						"url": "",
  						"isRequired": true,
  						"isDisabled": false,
  						"requiredErrMsg": "",
  						"patternErrMsg": ""
  					},
				]},
      {
				"label": "ac.create.Location.Details",
				"name": "LocationField",
        "multiple":false,
        "jsonPath":"",
				"fields": [
          {
            "name": "Location",
            "jsonPath": "",
            "label": "ac.create.Location",
            "pattern": "",
            "type": "singleValueList",
            "url": "",
            "isRequired": false,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "Longitude",
            "jsonPath": "",
            "label": "ac.create.Longitude",
            "pattern": "",
            "type": "text",
            "url": "",
            "isRequired": false,
            "isDisabled": true,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "Latitude",
            "jsonPath": "",
            "label": "ac.create.Latitude",
            "pattern": "",
            "type": "text",
            "url": "",
            "isRequired": false,
            "isDisabled": true,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "Address",
            "jsonPath": "",
            "label": "ac.create.Address",
            "pattern": "",
            "type": "text",
            "url": "",
            "isRequired": true,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "NoofQuantity",
            "jsonPath": "",
            "label": "ac.create.No.of.Quantity",
            "pattern": "",
            "type": "number",
            "url": "",
            "isRequired": false,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          }]
			},
      {
				"label": "ac.create.Asset.Details",
				"name": "AssetField",
        "multiple":false,
        "jsonPath":"",
				"fields": [
          {
            "name": "AnticipatedLifeOfAsset",
            "jsonPath": "",
            "label": "ac.create.Anticipated.life.of.Asset",
            "pattern": "",
            "type": "text",
            "url": "",
            "isRequired": false,
            "isDisabled": true,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "ModeofAcquisition",
            "jsonPath": "",
            "label": "ac.create.Mode.of.Acquisition",
            "pattern": "",
            "type": "singleValueList",
            "url": "",
            "isRequired": false,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "FromWhomAcquired",
            "jsonPath": "",
            "label": "ac.create.From.whom.acquired",
            "pattern": "",
            "type": "text",
            "url": "",
            "isRequired": true,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "TitleDocumentsAvailable",
            "jsonPath": "",
            "label": "ac.create.Title.documents.available",
            "pattern": "",
            "type": "text",
            "url": "",
            "isRequired": false,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "SourceOfFunds",
            "jsonPath": "",
            "label": "ac.create.Source.of.funds",
            "pattern": "",
            "type": "singleValueList",
            "url": "",
            "isRequired": false,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "Warranty",
            "jsonPath": "",
            "label": "ac.create.Warranty",
            "pattern": "",
            "type": "radio",
            "url": "",
            "isRequired": false,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": "",
            "values": [{"label":"Yes", "value":true},{"label":"No", "value":false}],
            "defaultValue":true
          },
          {
            "name": "WarrantyExpiryDate",
            "jsonPath": "",
            "label": "ac.create.Warranty.expiry.date",
            "pattern": "",
            "type": "datePicker",
            "url": "",
            "isRequired": false,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "DefectLiabilityPeriod",
            "jsonPath": "",
            "label": "ac.create.Defect.liability.Period",
            "pattern": "",
            "type": "number",
            "url": "",
            "isRequired": false,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "SecurityDepositRetained",
            "jsonPath": "",
            "label": "ac.create.Security.deposit.retained",
            "pattern": "",
            "type": "text",
            "url": "",
            "isRequired": false,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "SecurityDepositRealized",
            "jsonPath": "",
            "label": "ac.create.Security.deposit.realized",
            "pattern": "",
            "type": "text",
            "url": "",
            "isRequired": false,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "AssetDescription",
            "jsonPath": "",
            "label": "ac.create.Asset.description",
            "pattern": "",
            "type": "text",
            "url": "",
            "isRequired": true,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "AssetAcountCode",
            "jsonPath": "",
            "label": "ac.create.Asset.account.code",
            "pattern": "",
            "type": "singleValueList",
            "url": "",
            "isRequired": true,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "AccumulatedDepreciationAccount",
            "jsonPath": "",
            "label": "ac.create.Accumulated.Depreciation.Account",
            "pattern": "",
            "type": "singleValueList",
            "url": "",
            "isRequired": true,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "RevaluationReserveAccount",
            "jsonPath": "",
            "label": "ac.create.Revaluation.Reserve.Account",
            "pattern": "",
            "type": "singleValueList",
            "url": "",
            "isRequired": true,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "DepreciationExpensesAccount ",
            "jsonPath": "",
            "label": "ac.create.Depreciation.Expenses.Account",
            "pattern": "",
            "type": "singleValueList",
            "url": "",
            "isRequired": true,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },

				]
			},
      {
				"name": "TableField",
        "jsonPath":"",
				"fields": [
          // {
          //   "name": "AnticipatedLifeOfAsset",
          //   "label": "Anticipated life of Asset",
          //   "type": "dynamicTable"
          //   "resultList": {
          //     "resultHeader": [{"label": "asset.create.test"}],
          //     "resultValues": [[{}, ], [], []]
          //   }
          // },
          {
            "name": "OpeningDate",
            "jsonPath": "",
            "label": "ac.create.Opening.date",
            "pattern": "",
            "type": "datePicker",
            "url": "",
            "isRequired": true,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "OpeningWrittenDownValue",
            "jsonPath": "",
            "label": "ac.create.Opening.Written.down.Value",
            "pattern": "",
            "type": "number",
            "url": "",
            "isRequired": true,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "AdditionDate",
            "jsonPath": "",
            "label": "ac.create.Addition.Date",
            "pattern": "",
            "type": "datePicker",
            "url": "",
            "isRequired": false,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "AdditionValue",
            "jsonPath": "",
            "label": "ac.create.Addition.Value",
            "pattern": "",
            "type": "text",
            "url": "",
            "isRequired": false,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "RevaluationDate",
            "jsonPath": "",
            "label": "ac.create.Revaluation.date",
            "pattern": "",
            "type": "datePicker",
            "url": "",
            "isRequired": false,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "RevaluationValue",
            "jsonPath": "",
            "label": "ac.create.Revaluation.Value",
            "pattern": "",
            "type": "text",
            "url": "",
            "isRequired": false,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "DepreciationDate",
            "jsonPath": "",
            "label": "ac.create.Depreciation.Date",
            "pattern": "",
            "type": "datePicker",
            "url": "",
            "isRequired": false,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "DepreciationValue",
            "jsonPath": "",
            "label": "ac.create.Depreciation.Value",
            "pattern": "",
            "type": "text",
            "url": "",
            "isRequired": false,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "Closing date",
            "jsonPath": "",
            "label": "ac.create.Closing.Date",
            "pattern": "",
            "type": "datePicker",
            "url": "",
            "isRequired": false,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          },
          {
            "name": "ClosingValue",
            "jsonPath": "",
            "label": "ac.create.Closing.written.Down.Value",
            "pattern": "",
            "type": "datePicker",
            "url": "",
            "isRequired": false,
            "isDisabled": false,
            "requiredErrMsg": "",
            "patternErrMsg": ""
          }

				]
			}
		]
	}
}

export default dat;
