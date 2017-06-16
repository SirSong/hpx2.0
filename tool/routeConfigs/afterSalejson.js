exports.config = {
"routeName":"afterSale",
"moduleName":"afterSaleModule",
"secondModuleName":"afterSaleSecondModule",
"secondFieldsForeignKey": "tAfterSaleId",
"proxy": "/proxyBiMai",
"url":{
 "fetchList":"/huaqian/api/v1/afterSale/search",
 "fetchDetail":"/huaqian/api/v1/afterSale/get",
 "add":"/huaqian/api/v1/afterSale/add",
 "update":"/huaqian/api/v1/afterSale/update",
 "del":"/huaqian/api/v1/afterSale/delete",
},
"secondUrl":{
 "fetchList":"/huaqian/api/v1/afterSale/getDetail",
 "add":"/huaqian/api/v1/afterSale/addDetail",
 "update":"/huaqian/api/v1/afterSale/updateDetail",
 "del":"/huaqian/api/v1/afterSale/deleteDetail",
  },
"listFields":[
{
"key":"code",
"name":"编号",
"type": "text"
},
{
"key":"money",
"name":"金额",
"precision": 2,
"type": "number"
},
{
"key":"receiptsType",
"name":"单据类型",
"type": "select",
      "data":[
        {
          "value": "退款单",
          "name": "T"
        },
        {
          "value": "补发单",
          "name": "F"
        },
        {
          "value": "补购单",
          "name": "G"
        }
      ]   
},
{
"key":"approvalStatus",
"name":"审批状态",
"type": "select",
      "data":[
        {
          "value": "待审批",
          "name": "0"
        },
        {
          "value": "已通过",
          "name": "1"
        },
        {
          "value": "已拒绝",
          "name": "2"
        }
      ] 
},
{
"key":"contractCode",
"name":"合同编号",
"type": "text"
},
{
"key":"orderCode",
"name":"订单编号",
"type": "text"
},
{
"key":"purchaser",
"name":"采购方",
"type": "text"
},
{
"key":"applicationDate",
"name":"申请日期",
"type": "date"
},
{
"key":"paymentStatus",
"name":"付款状态",
"type": "select",
      "data":[
        {
          "value": "待支付",
          "name": "0"
        },
        {
          "value": "已支付",
          "name": "1"
        }
      ]
},
{
"key":"shipmentsStatus",
"name":"收货状态",
"type": "select",
      "data":[
        {
          "value": "待收货",
          "name": "0"
        },
        {
          "value": "已收货",
          "name": "1"
        }
      ]
}
],
"serchFormFields":[
],
"formFields":[
{
"key":"code",
"name":"编号",
"required": true,
"type": "text"
},
{
"key":"money",
"name":"金额",
"precision": 2,//精度
"required": true,
"type": "number"
},
{
"key":"receiptsType",
"name":"单据类型",
"required": true,
"type": "select",
      "data":[
        {
          "value": "退款单",
          "name": "T"
        },
        {
          "value": "补发单",
          "name": "F"
        },
        {
          "value": "补购单",
          "name": "G"
        }
      ]   
},
{
"key":"approvalStatus",
"name":"审批状态",
"required": true,
"type": "select",
      "data":[
        {
          "value": "待审批",
          "name": "0"
        },
        {
          "value": "已通过",
          "name": "1"
        },
        {
          "value": "已拒绝",
          "name": "2"
        }
      ] 
},
{
"key":"contractCode",
"name":"合同编号",
"required": true,
"type": "text"
},
{
"key":"orderCode",
"name":"订单编号",
"required": true,
"type": "text"
},
{
"key":"purchaser",
"name":"采购方",
"required": true,
"type": "text"
},
{
"key":"applicationDate",
"name":"申请日期",
"required": true,
"type": "date"
},
{
"key":"paymentStatus",
"name":"付款状态",
"required": true,
"type": "select",
      "data":[
        {
          "value": "待支付",
          "name": "0"
        },
        {
          "value": "已支付",
          "name": "1"
        }
      ]
},
{
"key":"shipmentsStatus",
"name":"收货状态",
"required": true,
"type": "select",
      "data":[
        {
          "value": "待收货",
          "name": "0"
        },
        {
          "value": "已收货",
          "name": "1"
        }
      ]
}
],
"secondListFields":[
{
"key":"description",
"name":"品名",
"required": true,
"type": "text"
},
{
"key":"model",
"name":"型号",
"required": true,
"type": "text"
},
{
"key":"specification",
"name":"规格",
"required": true,
"type": "text"
},
{
"key":"unit",
"name":"单位",
"required": true,
"type": "text"
},
{
"key":"univalence",
"name":"单价",
"precision": 2,//精度
"required": true,
"type": "number"
},
{
"key":"amount",
"name":"数量",
"precision": 0,//精
"required": true,
"type": "number"
},
{
"key":"total",
"name":"总价",
"precision": 2,//精度
"required": true,
"type": "number"
},
{
"key":"receivedAmount",
"name":"实收数量",
"precision": 2,//精度
"required": true,
"type": "number"
},
{
"key":"differenceAmount",
"name":"差异数量",
"precision": 2,//精度
"required": true,
"type": "number"
},
{
"key":"differenceMoney",
"name":"差异金额",
"precision": 2,//精度
"required": true,
"type": "number"
},
{
"key":"differenceType",
"name":"差异类型",
"required": true,
"type": "select",
      "data":[
        {
          "value": "正常",
          "name": "0"
        },
        {
          "value": "少发",
          "name": "1"
        }
		,
        {
          "value": "多发",
          "name": "2"
        }
      ]
}
]
}