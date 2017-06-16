exports.config = {
  "routeName": "myProject",
  "moduleName": "myProjectModule",
  "proxy": "/proxy",
  "url":{
    "fetchList": "/trade/myProject/list",
    "fetchDetail": "/trade/myProject/detail",
    "add": "/trade/myProject/save",
    "update": "/trade/myProject/save",
    "del": "/trade/myProject/delete"
  },
  "listFields":[
    {
      "key": "product",
      "name": "产品",
      "type": "text"
    },
    {
      "key": "rose",
      "name": "参与角色",
      "type": "text"
    },
    {
      "key": "datePicker",
      "name": "项目起始日",
      "type": "date"
    },
    {
      "key": "money",
      "name": "金额",
      "type": "text"
    },
    {
      "key": "proNum",
      "name": "业务笔数",
      "type": "text"
    },
  ],
  "serchFormFields":[
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
      "data":[
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
  "formFields":[
    {
      "key": "product",
      "name": "产品",
      "type": "text"
    },
    {
      "key": "rose",
      "name": "参与角色",
      "type": "text"
    },
    {
      "key": "datePicker",
      "name": "项目起始日",
      "type": "date"
    },
    {
      "key": "money",
      "name": "金额",
      "type": "text"
    },
    {
      "key": "proNum",
      "name": "业务笔数",
      "type": "text"
    },
   
  ]
}