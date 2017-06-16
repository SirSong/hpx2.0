exports.config = {
    "routeName": "interestRate",
    "moduleName": "interestRateModule",
    "proxy": "/proxyHq",
    "url": {
        "fetchList": "/huaqian/api/v1/enterprises/interestRate/search",
        "fetchDetail": "/huaqian/api/v1/interestRate/enterprises/{eid}/projectId/{pid}",
        "add": "/huaqian/api/v1/interestRate",
        "update": "/huaqian/api/v1/interestRate",
    },
    "listFields": [
        {
            "key": "annual",
            "name": "年化利率",
            "type": "text"
        },
        {
            "key": "defaultInterest",
            "name": "罚息利率",
            "type": "text"
        },
        {
            "key": "moratorium",
            "name": "逾期宽限期",
            "type": "text"
        },
        {
            "key": "lineOfCredit",
            "name": "授信额度",
            "type": "text"
        },
        {
            "key": "creditPeriodBegin",
            "name": "授信期限-开始",
            "type": "date"
        },
        {
            "key": "creditPeriodOver",
            "name": "授信期限-结束",
            "type": "date"
        },
        {
            "key": "marginRatio",
            "name": "保证金比例",
            "type": "text"
        },
        {
            "key": "stopLossLine",
            "name": "止损线",
            "type": "text"
        },
        {
            "key": "marginCalls",
            "name": "追加保证金天数",
            "type": "text"
        },
        {
            "key": "deliveryDeadline",
            "name": "提货期限",
            "type": "text"
        },
        {
            "key": "remainingCredit",
            "name": "剩余授信额度",
            "type": "text"
        }
    ],
    "serchFormFields": [
        {
            "key": "field1",
            "name": "文本",
            "type": "text"
        },
        {
            "key": "field2",
            "name": "日期",
            "type": "date"
        },
        {
            "key": "field3",
            "name": "日期范围",
            "type": "dateRange",
            "startKey": "startKeyName",
            "endKey": "endKeyName"
        },
        {
            "key": "field4",
            "name": "国家",
            "type": "select",
            "data": [
                {
                    "value": "china",
                    "name": "中国"
                },
                {
                    "value": "usa",
                    "name": "美国"
                }
            ]
        }
    ],
    "formFields": [
         {
            "key": "enterpriseId",
            "name": "EID",
            "required": true,
            "type": "text"
        },
         {
            "key": "projectId",
            "name": "PID",
            "required": true,
            "type": "text"
        },
        {
            "key": "annual",
            "name": "年化利率",
            "required": true,
            "type": "number"
        },
        {
            "key": "defaultInterest",
            "name": "罚息利率",
            "required": true,
            "type": "number"
        },
        {
            "key": "moratorium",
            "name": "逾期宽限期",
            "required": true,
            "type": "text"
        },
        {
            "key": "lineOfCredit",
            "name": "授信额度",
            "required": true,
            "type": "number"
        },
        {
            "key": "creditPeriodBegin",
            "name": "授信期限-开始",
            "required": true,
            "type": "date"
        },
        {
            "key": "creditPeriodOver",
            "name": "授信期限-结束",
            "required": true,
            "type": "date"
        },
        {
            "key": "marginRatio",
            "name": "保证金比例",
            "required": true,
            "type": "number"
        },
        {
            "key": "stopLossLine",
            "name": "止损线",
            "required": true,
            "type": "number"
        },
        {
            "key": "marginCalls",
            "name": "追加保证金天数",
            "required": true,
            "type": "text"
        },
        {
            "key": "deliveryDeadline",
            "name": "提货期限",
            "required": true,
            "type": "text"
        },
        {
            "key": "remainingCredit",
            "name": "剩余授信额度",
            "required": true,
            "type": "number"
        }
    ]
}