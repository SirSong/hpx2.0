exports.config = {
"routeName":"salesOrder",
"moduleName":"salesOrderModule",
"secondModuleName":"salesOrderSecondModule",
"secondFieldsForeignKey": "tSalesId",
"proxy": "/proxyBiMai",
"url":{
 "fetchList":"/huaqian/api/v1/salesOrder/search",
 "fetchDetail":"/huaqian/api/v1/salesOrder/get",
 "add":"/huaqian/api/v1/salesOrder/add",
 "update":"/huaqian/api/v1/salesOrder/update",
 "del":"/huaqian/api/v1/salesOrder/delete",
},
"secondUrl":{
 "fetchList":"/huaqian/api/v1/salesOrder/getDetail",
 "add":"/huaqian/api/v1/salesOrder/addDetail",
 "update":"/huaqian/api/v1/salesOrder/updateDetail",
 "del":"/huaqian/api/v1/salesOrder/deleteDetail",
  },
"listFields":[
{
"key":"name",
"name":"名称",
"type": "text"
},
{
"key":"code",
"name":"编码",
"type": "text"
},
{
"key":"demander",
"name":"需方",
"type": "text"
},
{
"key":"supplier",
"name":"供方",
"type": "text"
},
{
"key":"totalMoney",
"name":"总金额",
"precision": 2,
"type": "number"
},
{
"key":"deposit",
"name":"保证金",
"precision": 2,
"type": "number"
},
{
      "key": "demanderConState",
      "name": "需方确认状态",
      "type": "select",
      "data":[
        {
          "value": "是",
          "name": "1"
        },
        {
          "value": "否",
          "name": "0"
        }
      ]
},
{
      "key": "supplierConState",
      "name": "供方确认状态",
      "type": "select",
      "data":[
        {
          "value": "是",
          "name": "1"
        },
        {
          "value": "否",
          "name": "0"
        }
      ]
},
{
      "key": "orderStatus",
      "name": "订单状态",
      "type": "select",
      "data":[
        {
          "value": "退款",
          "name": "1"
        },
        {
          "value": "订单",
          "name": "0"
        },
        {
          "value": "补货",
          "name": "2"
        }
      ]
},
{
      "key": "approvalStatus",
      "name": "审批状态",
      "type": "select",
      "data":[
        {
          "value": "已审批",
          "name": "1"
        },
        {
          "value": "待审批",
          "name": "0"
        }
      ]
},
{
      "key": "paymentStatus",
      "name": "付款状态",
      "type": "select",
      "data":[
        {
          "value": "已付款",
          "name": "1"
        },
        {
          "value": "待付款",
          "name": "0"
        }
      ]
},
{
      "key": "genContract",
      "name": "是否生成采购合同",
      "type": "select",
      "data":[
        {
          "value": "是",
          "name": "1"
        },
        {
          "value": "否",
          "name": "0"
        }
      ]
}
],
"serchFormFields":[
],
"formFields":[
{
"key":"name",
"name":"名称",
"required": true,
"type": "text"
},
{
"key":"code",
"name":"编码",
"required": true,
"type": "text"
},
{
"key":"demander",
"name":"需方",
"required": true,
"type": "text"
},
{
"key":"supplier",
"name":"供方",
"required": true,
"type": "text"
},
{
"key":"totalMoney",
"name":"总金额",
"required": true,
"type": "text"
},
{
"key":"deposit",
"name":"保证金",
"required": true,
"type": "text"
},
{
      "key": "demanderConState",
      "name": "需方确认状态",
	  "required": true,
      "type": "select",
      "data":[
        {
          "value": "是",
          "name": "1"
        },
        {
          "value": "否",
          "name": "0"
        }
      ]
},
{
      "key": "supplierConState",
      "name": "供方确认状态",
	  "required": true,
      "type": "select",
      "data":[
        {
          "value": "是",
          "name": "1"
        },
        {
          "value": "否",
          "name": "0"
        }
      ]
},
{
      "key": "orderStatus",
      "name": "订单状态",
	  "required": true,
      "type": "select",
      "data":[
        {
          "value": "退款",
          "name": "1"
        },
        {
          "value": "订单",
          "name": "0"
        },
        {
          "value": "补货",
          "name": "2"
        }
      ]
},
{
      "key": "approvalStatus",
      "name": "审批状态",
	  "required": true,
      "type": "select",
      "data":[
        {
          "value": "已审批",
          "name": "1"
        },
        {
          "value": "待审批",
          "name": "0"
        }
      ]
},
{
      "key": "paymentStatus",
      "name": "付款状态",
	  "required": true,
      "type": "select",
      "data":[
        {
          "value": "已付款",
          "name": "1"
        },
        {
          "value": "待付款",
          "name": "0"
        }
      ]
},
{
      "key": "genContract",
      "name": "是否生成采购合同",
	  "required": true,
      "type": "select",
      "data":[
        {
          "value": "是",
          "name": "1"
        },
        {
          "value": "否",
          "name": "0"
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
"precision": 2,//精
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
"precision": 2,//精
"required": true,
"type": "number"
},
{
"key":"remark",
"name":"备注",
"required": true,
"type": "text"
},
{
"key":"confirmAmount",
"name":"确认数量",
"precision": 0,//精
"required": true,
"type": "number"
},
{
"key":"sentAmount",
"name":"已发数量 ",
"precision": 0,//精
"required": true,
"type": "number"
}
]
}