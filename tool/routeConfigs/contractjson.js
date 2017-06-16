exports.config = {
"routeName":"contract",
"moduleName":"contractModule",
"secondModuleName":"contractSecondModule",
"secondFieldsForeignKey": "tContractId",
"proxy": "/proxyBiMai",
"url":{
 "fetchList":"/huaqian/api/v1/contract/search",
 "fetchDetail":"/huaqian/api/v1/contract/get",
 "add":"/huaqian/api/v1/contract/add",
 "update":"/huaqian/api/v1/contract/update",
 "del":"/huaqian/api/v1/contract/delete",
},
"secondUrl":{
 "fetchList":"/huaqian/api/v1/contract/getDetail",
 "add":"/huaqian/api/v1/contract/addDetail",
 "update":"/huaqian/api/v1/contract/updateDetail",
 "del":"/huaqian/api/v1/contract/deleteDetail",
  },
"listFields":[
{
"key":"code",
"name":"编号",
"type": "text"
},
{
"key":"name",
"name":"名称",
"type": "text"
},
{
"key":"firstParty",
"name":"甲方",
"type": "text"
},
{
"key":"secondParty",
"name":"乙方",
"type": "text"
},
{
"key":"contractDate",
"name":"签订日期",
"type": "date"
},
{
"key":"deliveryDate",
"name":"送货日期",
"type": "date"
},
{
"key":"deliveryAddress",
"name":"送货地址",
"type": "text"
},
{
"key":"acceptanceLevel",
"name":"验收标准",
"type": "text"
},
{
"key":"fUser",
"name":"甲方联系人",
"type": "text"
},
{
"key":"fPhone",
"name":"甲方联系电话",
"type": "text"
},
{
"key":"sUser",
"name":"乙方联系人",
"type": "text"
},
{
"key":"sPhone",
"name":"乙方联系电话",
"type": "text"
},
{
"key":"fSignature",
"name":"甲方签章人",
"type": "text"
},
{
"key":"sSignature",
"name":"乙方签章人",
"type": "text"
},
{
"key":"fLocation",
"name":"甲方签章位置",
"type": "text"
},
{
"key":"sLocation",
"name":"乙方签章位置",
"type": "text"
},
{
"key":"fDate",
"name":"甲方签章时间",
"type": "text"
},
{
"key":"sDate",
"name":"乙方签章时间",
"type": "text"
},
{
"key":"contractType",
"name":"合同类型",
"type": "select",
      "data":[
        {
          "value": "采购",
          "name": "C"
        },
        {
          "value": "销售",
          "name": "S"
        }
      ]
},
{
"key":"receivingDate",
"name":"收货日期",
"type": "date"
},
{
"key":"fileId",
"name":"文件ID",
"type": "text"
},
{
"key":"money",
"name":"金额",
"precision": 2,
"type": "number"
},
{
"key":"deliveryDeadline",
"name":"提货期限",
"type": "text"
},
{
"key":"orderCode",
"name":"订单编号",
"type": "text"
},
{
"key":"fSignatureStatus",
"name":"甲方签章状态",
"type": "text"
},
{
"key":"sSignatureStatus",
"name":"乙方签章状态",
"type": "text"
},
{
"key":"financingStatus",
"name":"融资状态",
"type": "select",
      "data":[
        {
          "value": "正常",
          "name": "0"
        },
        {
          "value": "逾期",
          "name": "1"
        },
        {
          "value": "待处置",
          "name": "2"
        },
        {
          "value": "已处置",
          "name": "3"
        }
      ]
},
{
"key":"receivingStatus",
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
"key":"name",
"name":"名称",
"required": true,
"type": "text"
},
{
"key":"firstParty",
"name":"甲方",
"required": true,
"type": "text"
},
{
"key":"secondParty",
"name":"乙方",
"required": true,
"type": "text"
},
{
"key":"contractDate",
"name":"签订日期",
"required": true,
"type": "date"
},
{
"key":"deliveryDate",
"name":"送货日期",
"required": true,
"type": "date"
},
{
"key":"deliveryAddress",
"name":"送货地址",
"required": true,
"type": "text"
},
{
"key":"acceptanceLevel",
"name":"验收标准",
"required": true,
"type": "text"
},
{
"key":"fUser",
"name":"甲方联系人",
"required": true,
"type": "text"
},
{
"key":"fPhone",
"name":"甲方联系电话",
"required": true,
"type": "text"
},
{
"key":"sUser",
"name":"乙方联系人",
"required": true,
"type": "text"
},
{
"key":"sPhone",
"name":"乙方联系电话",
"required": true,
"type": "text"
},
{
"key":"fSignature",
"name":"甲方签章人",
"required": true,
"type": "text"
},
{
"key":"sSignature",
"name":"乙方签章人",
"required": true,
"type": "text"
},
{
"key":"fLocation",
"name":"甲方签章位置",
"required": true,
"type": "text"
},
{
"key":"sLocation",
"name":"乙方签章位置",
"required": true,
"type": "text"
},
{
"key":"fDate",
"name":"甲方签章时间",
"required": true,
"type": "date"
},
{
"key":"sDate",
"name":"乙方签章时间",
"required": true,
"type": "date"
},
{
"key":"contractType",
"name":"合同类型",
"required": true,
"type": "select",
      "data":[
        {
          "value": "采购",
          "name": "C"
        },
        {
          "value": "销售",
          "name": "S"
        }
      ]
},
{
"key":"receivingDate",
"name":"收货日期",
"required": true,
"type": "date"
},
{
"key":"fileId",
"name":"文件ID",
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
"key":"deliveryDeadline",
"name":"提货期限",
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
"key":"fSignatureStatus",
"name":"甲方签章状态",
"required": true,
"type": "text"
},
{
"key":"sSignatureStatus",
"name":"乙方签章状态",
"required": true,
"type": "text"
},
{
"key":"financingStatus",
"name":"融资状态",
"required": true,
"type": "select",
      "data":[
        {
          "value": "正常",
          "name": "0"
        },
        {
          "value": "逾期",
          "name": "1"
        },
        {
          "value": "待处置",
          "name": "2"
        },
        {
          "value": "已处置",
          "name": "3"
        }
      ]
},
{
"key":"receivingStatus",
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
"precision": 2,//精
"required": true,
"type": "number"
},
{
"key":"amount",
"name":"数量",
"precision": 2,//精
"required": true,
"type": "number"
},
{
"key":"total",
"name":"总价",
"required": true,
"type": "text"
},
{
"key":"receivedAmount",
"name":"实收数量",
"precision": 2,//精
"required": true,
"type": "number"
},
{
"key":"differenceAmount",
"name":"差异数量",
"precision": 2,//精
"required": true,
"type": "number"
},
{
"key":"differenceMoney",
"name":"差异金额",
"precision": 2,//精
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
},
{
"key":"differenceStatus",
"name":"差异状态",
"required": true,
"type": "select",
      "data":[
        {
          "value": "未处理",
          "name": "0"
        },
        {
          "value": "已处理",
          "name": "1"
        }
      ]
},
{
"key":"remark",
"name":"备注",
"required": true,
"type": "text"
}
]
}