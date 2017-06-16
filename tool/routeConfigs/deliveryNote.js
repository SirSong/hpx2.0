exports.config = {
"routeName":"deliveryNote",
"moduleName":"deliveryNoteModule",
"secondModuleName":"deliveryNoteGoodsModule",
"secondFieldsForeignKey": "tOrderDetailId",
"proxy": "/proxyBiMai",
"url":{
 "fetchList":"/huaqian/api/v1/deliveryNote/search",
 "fetchDetail":"/huaqian/api/v1/deliveryNote/get",
 "add":"/huaqian/api/v1/deliveryNote/add",
 "update":"/huaqian/api/v1/deliveryNote/update",
 "del":"/huaqian/api/v1/deliveryNote/delete",
},
"secondUrl":{
 "fetchList":"/huaqian/api/v1/deliveryNote/getDetail",
 "add":"/huaqian/api/v1/deliveryNote/addDetail",
 "update":"/huaqian/api/v1/deliveryNote/updateDetail",
 "del":"/huaqian/api/v1/deliveryNote/deleteDetail",
  },
"listFields":[
{
"key":"code",
"name":"编号",
"type": "text"
},
{
"key":"batchNumber",
"name":"提货批次号",
"type": "text"
},
{
      "key": "batch",
      "name": "是否分批提货",
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
"key":"approvalStatus",
"name":"审批状态",
"type": "text"
},
{
"key":"fixationMoney",
"name":"固定金额",
"precision": 2,
"type": "number"
},
{
"key":"floatMoney",
"name":"浮动金额",
"precision": 2,
"type": "number"
},
{
"key":"cost",
"name":"资金成本",
"precision": 2,
"type": "number"
},
{
"key":"lateCharge",
"name":"罚息",
"precision": 2,
"type": "number"
},
{
"key":"storageCharge",
"name":"仓储费",
"precision": 2,
"type": "number"
},
{
"key":"transportCharge",
"name":"运输费",
"precision": 2,
"type": "number"
},
{
"key":"depositDeduction",
"name":"保证金抵扣额",
"precision": 2,
"type": "number"
},
{
"key":"totalMoney",
"name":"总金额",
"precision": 2,
"type": "number"
}
],
"serchFormFields":[
{
"key":"code",
"name":"编号",
"type": "text"
},
{
"key":"approvalStatus",
"name":"审批状态",
"type": "text"
}
],
"formFields":[
{
"key":"code",
"name":"编号",
"required": true,
"type": "text"
},
{
"key":"batchNumber",
"name":"提货批次号",
"required": true,
"type": "text"
},
{
"key":"batch",
"name":"是否分批提货",
"required": true,
"type": "text"
},
{
"key":"approvalStatus",
"name":"审批状态",
"required": true,
"type": "text"
},
{
"key":"fixationMoney",
"name":"固定金额",
"precision": 2,//精度
"required": true,
"type": "number"
},
{
"key":"floatMoney",
"name":"浮动金额",
"precision": 2,//精度
"required": true,
"type": "number"
},
{
"key":"cost",
"name":"资金成本",
"precision": 2,//精度
"required": true,
"type": "number"
},
{
"key":"lateCharge",
"name":"罚息",
"precision": 2,//精度
"required": true,
"type": "number"
},
{
"key":"storageCharge",
"name":"仓储费",
"precision": 2,//精度
"required": true,
"type": "number"
},
{
"key":"transportCharge",
"name":"运输费",
"precision": 2,//精度
"required": true,
"type": "number"
},
{
"key":"depositDeduction",
"name":"保证金抵扣额",
"precision": 2,//精度
"required": true,
"type": "number"
},
{
"key":"totalMoney",
"name":"总金额",
"precision": 2,//精度
"required": true,
"type": "number"
}
],
"secondListFields":[
{
"key":"description",
"name":"品名",
"type": "text"
},
{
"key":"model",
"name":"型号",
"type": "text"
},
{
"key":"specification",
"name":"规格",
"type": "text"
},
{
"key":"unit",
"name":"单位",
"type": "text"
},
{
"key":"univalence",
"name":"单价",
"type": "text"
},
{
"key":"amount",
"name":"数量",
"type": "text"
},
{
"key":"total",
"name":"总价",
"type": "text"
},
{
"key":"remark",
"name":"备注",
"type": "text"
},
{
"key":"inventoryAmount",
"name":"库存数量（剩余提货数量）",
"type": "text"
},
{
"key":"deliveryAmount",
"name":"提货数量",
"type": "text"
}
]
}