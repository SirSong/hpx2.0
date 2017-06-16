exports.config = {
  "routeName": "payment",
  "moduleName": "paymentModule",
  "proxy": "/proxyBiMai",
  "url":{
    "fetchList": "/huaqian/api/v1/payment/list",
    "fetchDetail": "/huaqian/api/v1/payment/get",
    "add": "/huaqian/api/v1/payment/add",
    "update": "/huaqian/api/v1/payment/update",
    "del": "/huaqian/api/v1/payment/delete"
  },
  "listFields":[
   
	{
      "key": "code",
      "name": "支付流水号",
      "type": "text"
    },
	{
      "key": "busCode",
      "name": "业务代码",
      "type": "text"
    },
	{
      "key": "orderCode",
      "name": "订单编号",
      "type": "text"
    },
	{
      "key": "orderName",
      "name": "订单名称",
      "type": "text"
    },
	{
      "key": "payer",
      "name": "付款方",
      "type": "text"
    },{
      "key": "payee",
      "name": "收款方",
      "type": "text"
    },{
      "key": "totalMoney",
      "name": "总金额",
      "precision": 2,
      "type": "number"
    },{
      "key": "paymentAmount",
      "name": "支付金额",
      "precision": 2,
      "type": "number"
    },{
      "key": "noPaymentAmount",
      "name": "未支付金额",
      "precision": 2,
      "type": "number"
    },
	{
      "key": "property",
      "name": "属性",
      "type": "text"
    },
	{
      "key": "payStatus",
      "name": "状态",
      "type": "select",
      "data":[
        {
          "value": "0",
          "name": "待付款"
        },
        {
          "value": "1",
          "name": "已付款"
        }
      ]
    },
	{
      "key": "paymentType",
      "name": "付款类型",
      "type": "text"
    },
	{
      "key": "orderType",
      "name": "订单类型",
      "type": "select",
      "data":[
        {
          "value": "0",
          "name": "订单"
        },
        {
          "value": "1",
          "name": "退款"
        },
        {
          "value": "2",
          "name": "补货"
        }
      ]
    }
  ],
  "serchFormFields":[
   {
      "key": "payStatus",
      "name": "支付状态",
      "type": "select",
      "data":[
        {
          "value": "0",
          "name": "待付款"
        },
        {
          "value": "1",
          "name": "已付款"
        }
      ]
    },
	{
      "key": "paymentType",
      "name": "付款类型",
      "type": "text"
    },
	{
      "key": "orderType",
      "name": "订单类型",
      "type": "select",
      "data":[
        {
          "value": "0",
          "name": "订单"
        },
        {
          "value": "1",
          "name": "退款"
        },
        {
          "value": "2",
          "name": "补货"
        }
      ]
    },
    {
      "key": "timeRange",
      "name": "时间范围",
      "type": "dateRange",
      "startKey": "startTime",
      "endKey": "endTime",
    },
  ],
  "formFields":[
  
	{
      "key": "code",
      "name": "支付流水号",
	  "required": true,
      "type": "text"
    },
	{
      "key": "busCode",
      "name": "业务代码",
	  "required": true,
      "type": "text"
    },
	{
      "key": "orderCode",
      "name": "订单编号",
	  "required": true,
      "type": "text"
    },
	{
      "key": "orderName",
      "name": "订单名称",
	  "required": true,
      "type": "text"
    },
	{
      "key": "payer",
      "name": "付款方",
	  "required": true,
      "type": "text"
    },{
      "key": "payee",
      "name": "收款方",
	  "required": true,
      "type": "text"
    },{
      "key": "totalMoney",
      "name": "总金额",
      "precision": 2,//精度
      "required": true,
      "type": "number"
    },{
      "key": "paymentAmount",
      "name": "支付金额",
      "precision": 2,//精度
      "required": true,
      "type": "number"
    },{
      "key": "noPaymentAmount",
      "name": "未支付金额",
      "precision": 2,//精度
      "required": true,
      "type": "number"
    },
	{
      "key": "property",
      "name": "属性",
	  "required": true,
      "type": "text"
    },
	{
      "key": "status",
      "name": "支付状态",
	  "required": true,
      "type": "select",
      "data":[
        {
          "value": "0",
          "name": "待付款"
        },
        {
          "value": "1",
          "name": "已付款"
        }
      ]
    },
	{
      "key": "paymentType",
      "name": "付款类型",
	  "required": false,
      "type": "text"
    },
	{
      "key": "orderType",
      "name": "订单类型",
	  "required": true,
      "type": "select",
      "data":[
        {
          "value": "0",
          "name": "订单"
        },
        {
          "value": "1",
          "name": "退款"
        },
        {
          "value": "2",
          "name": "补货"
        }
      ]
    }
  ]
}