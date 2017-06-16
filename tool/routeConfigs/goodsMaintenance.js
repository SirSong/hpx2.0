exports.config = {
    "routeName": "goodsMaintenance",
    "moduleName": "goodsMaintenanceModule",
    "proxy": "/proxyHq",
    "url": {
        "fetchList": "/huaqian/api/v1/goodsMaintenance/list",
        "fetchDetail": "/huaqian/api/v1/goodsMaintenance/query",
        "add": "/huaqian/api/v1/goodsMaintenance/add",
        "update": "/huaqian/api/v1/goodsMaintenance/update",
        "del": "/huaqian/api/v1/goodsMaintenance/delete",
    },
    "listFields": [
        {
            "key": "description",
            "name": "品名",
            "type": "text"
        },
        {
            "key": "specification",
            "name": "规格",
            "type": "text"
        },
        {
            "key": "model",
            "name": "型号",
            "type": "text"
        },
        {
            "key": "unit",
            "name": "计量单位",
            "type": "text"
        },
        {
            "key": "univalence",
            "name": "单价",
            "type": "text"
        },
        {
            "key": "offerDate",
            "name": "报价日期",
            "type": "text"
        },
        {
            "key": "remark",
            "name": "备注",
            "type": "text"
        }
    ],
    "serchFormFields": [
        {
            "key": "field1",
            "name": "文本",
            "type": "text",
        },
        {
            "key": "field2",
            "name": "日期",
            "type": "date"
        },
        {
            "key": "field3",
            "name": "日期范围",
            "type": "dateRange"
        },
    ],
    "formFields": [
        {
            "key": "description",
            "name": "品名",
            "required": true,
            "type": "text"
        },
        {
            "key": "specification",
            "name": "规格",
            "required": true,
            "type": "text"
        },
        {
            "key": "model",
            "name": "型号",
            "required": true,
            "type": "text"
        },
        {
            "key": "unit",
            "name": "计量单位",
            "required": true,
            "type": "text"
        },
        {
            "key": "univalence",
            "name": "单价",
            "required": true,
            "type": "number"
        },
        {
            "key": "offerDate",
            "name": "报价日期",
            "required": true,
            "type": "date"
        },
        {
            "key": "remark",
            "name": "备注",
            "required": true,
            "type": "text"
        }
    ]
}