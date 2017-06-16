exports.config = {
  "routeName": "myOrder",
  "moduleName": "myOrderModule",
  // "secondModuleName": "myOrderDetailModule",
  // "secondFieldsForeignKey": "mainid",
  "proxy": "/proxyHq",
  "url":{
    "fetchList": "/huaqian/api/v1/salesOrder/search",//查询列表
    "fetchDetail": "/huaqian/api/v1/salesOrder/get",//查看详情
    "add": "/huaqian/api/v1/salesOrder/add",//新增
    "update": "/huaqian/api/v1/salesOrder/update",//更新
    "del": "/huaqian/api/v1/salesOrder/delete"//删除
  },
  // "secondUrl":{
  //   "fetchList": "/huaqian/api/v1/salesOrder/getDetail",
  //   "add": "/huaqian/api/v1/salesOrder/addDetail",
  //   "update": "/huaqian/api/v1/salesOrder/updateDetail",
  //   "del": "/huaqian/"//-------------------找不到删除明细
  // },
  "listFields":[
    {
      "key": "name",
      "name": "订单名称",
      "type": "text"
    },
    {
      "key": "code",
      "name": "订单编号",
      "type": "text"
    },
    {
      "key": "orderType",
      "name": "订单类型",
      "type": "select",
      "data":[
        {
          "value": "0",
          "name": "长单"
        },
        {
          "value": "1",
          "name": "短单"
        }
      ]
    },
    {
      "key": "supplier",
      "name": "供应商",
      "type": "text"
    },
    {
      "key": "totalMoney",
      "name": "订单总金额",
      "precision": 2,
      "type": "number"
    },
    {
      "key": "orderStatus",
      "name": "订单状态",
      "type": "select",
      "data":[
        {
          "value": "0",
          "name": "未提交"
        },
        {
          "value": "1",
          "name": "待确认"
        },
        {
          "value": "2",
          "name": "已确认"
        },
        {
          "value": "3",
          "name": "完成订单"
        }
      ]
    },
    {
      "key": "createTime",
      "name": "创建日期",
      "type": "date",
    }
  ],
  "serchFormFields":[
    {
      "key": "name",
      "name": "订单名称",
      "type": "text"
    },
    {
      "key": "code",
      "name": "订单编号",
      "type": "text"
    },
    {
      "key": "supplier",
      "name": "供应商",
      "type": "text"
    }
    // ,
    // {
    //   "key": "demander",
    //   "name": "需方",
    //   "type": "text",
    // },
    // {
    //   "key": "page",
    //   "name": "当前页码",
    //   "type": "number"
    // },
    // {
    //   "key": "size",
    //   "name": "每页条数",
    //   "type": "number",
    // }
  ],
  "formFields":[
    {
      "key": "name",
      "name": "订单名称",
      "type": "text"
    },
    {
      "key": "code",
      "name": "订单编号",
      "type": "text"
    },
    {
      "key": "orderType",
      "name": "订单类型",
      "type": "select",
      "data":[
        {
          "value": "0",
          "name": "长单"
        },
        {
          "value": "1",
          "name": "短单"
        }
      ]
    },
    {
      "key": "supplier",
      "name": "供应商",
      "type": "text"
    },
    {
      "key": "totalMoney",
      "name": "订单总金额",
      "precision": 2,
      "type": "number",
    }
  ],
  // "secondListFields":[
  //   {
  //     "key": "description",
  //     "name": "品名",
  //     "type": "text",
  //   },
  //   {
  //     "key": "model",
  //     "name": "型号",
  //     "type": "text",
  //   },
  //   {
  //     "key": "specification",
  //     "name": "规格",
  //     "type": "text",
  //   },
  //   {
  //     "key": "unit",
  //     "name": "单位",
  //     "type": "text",
  //   },
  //   {
  //     "key": "univalence",
  //     "name": "单价",
  //     "precision": 2,
  //     "type": "number",
  //   },
  //   {
  //     "key": "amount",
  //     "name": "数量",
  //     "precision": 2,
  //     "type": "number",
  //   },
  //   {
  //     "key": "total",
  //     "name": "总价",
  //     "precision": 2,
  //     "type": "number",
  //   },
  //   {
  //     "key": "remark",
  //     "name": "备注",
  //     "lengthRange": [1,50],
  //     "type": "textarea"
  //   }
  // ]    
}