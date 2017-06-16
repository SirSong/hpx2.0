exports.config = {
    "routeName": "warning",
    "moduleName": "warningModule",
    "proxy": "/proxyHq",
    "url": {
        "fetchList": "/huaqian/api/v1/riskControl/list",
        "add": "/huaqian/api/v1/riskControl/add",
        "update": "/huaqian/api/v1/riskControl/update",
    },
    "listFields": [
        {
            "key": "contractName",
            "name": "合同名称",
            "type": "text"
        },
        {
            "key": "contractCode",
            "name": "合同编号",
            "type": "text"
        },
        {
            "key": "demander",
            "name": "需方",
            "type": "text"
        },
        {
            "key": "inventoryTotalMoney",
            "name": "库存总金额",
            "type": "text"
        },
        {
            "key": "currentValue",
            "name": "当前货值",
            "type": "text"
        },
        {
            "key": "priceLimit",
            "name": "涨跌幅",
            "type": "text"
        },
        {
            "key": "awaitDeposit",
            "name": "待补充保证金",
            "type": "text"
        },
        {
            "key": "abortDate",
            "name": "处理截止日",
            "type": "text"
        },
        {
            "key": "disposeDate",
            "name": "处理日期",
            "type": "text"
        }
    ],
    "serchFormFields": [
        {
            "key": "field1",
            "name": "文本",
            "type": "select",
            "data": [
                {
                    "value": "1",
                    "name": "已处理"
                },
                {
                    "value": "0",
                    "name": "未处理"
                }
            ]
        }
    ],
    "formFields": [
        {
            "key": "contractName",
            "name": "合同名称",
            "required": true,
            "type": "text"
        },
        {
            "key": "contractCode",
            "name": "合同编号",
            "required": true,
            "type": "text"
        },
        {
            "key": "demander",
            "name": "需方",
            "required": true,
            "type": "text"
        },
        {
            "key": "inventoryTotalMoney",
            "name": "库存总金额",
            "required": true,
            "type": "text"
        },
        {
            "key": "currentValue",
            "name": "当前货值",
            "required": true,
            "type": "text"
        },
        {
            "key": "priceLimit",
            "name": "涨跌幅",
            "required": true,
            "type": "text"
        },
        {
            "key": "awaitDeposit",
            "name": "待补充保证金",
            "required": true,
            "type": "text"
        },
        {
            "key": "abortDate",
            "name": "处理截止日",
            "required": true,
            "type": "text"
        },
        {
            "key": "disposeDate",
            "name": "处理日期",
            "required": true,
            "type": "text"
        }
    ]
}