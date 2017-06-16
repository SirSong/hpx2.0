exports.config = {
  "routeName": "userManager",
  "moduleName": "userManagerModule",
  "proxy": "/proxyCore",
  "url":{
    "fetchList": "/api/v1/enterprise/{eid}/users",
    "fetchDetail": "/api/v1/enterprise/{eid}/users",
    "add": "/api/v1/enterprise/{eid}/users",
    "update": "/api/v1/enterprise/{eid}/users",
    "del": "/api/v1/enterprise/{eid}/users"
  },
  "listFields":[
    {
      "key": "email",
      "name": "登录账户",
      "type": "text", 
    },
    {
      "key": "nick",
      "name": "昵称",
      "type": "text", 
    },
    {
      "key": "name",
      "name": "公司名称",
      "type": "text", 
    },
    {
      "key": "phone",
      "name": "联系电话",
      "type": "phone", 
    },
    {
      "key": "phone",
      "name": "联系电话",
      "type": "phone", 
    },
  ],
  "serchFormFields":[
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
      "key": "email",
      "name": "邮箱",
      "required": true,
      "type": "email"
    },
    {
      "key": "phone",
      "name": "手机号",
      "required": true,
      "type": "phone"
    },
    {
      "key": "password",
      "name": "密码",
      "required": true,
      "type": "password"
    },
    {
      "key": "name",
      "name": "公司",
      "lengthRange": [6,16],
      "required": true,
      "type": "text"
    },
    {
      "key": "nick",
      "name": "昵称",
      "lengthRange": [1,50],
      "required": true,
      "type": "textarea"
    },
    {
      "key": "enabled",
      "name": "是否可用",
      "required": true,
      "type": "select",  
      "data":[
        {
            "value":"T",
            "name":"是"
        },
        {
            "value":"F",
            "name":"否"
        }
      ]
    },
    {
      "key": "locked",
      "name": "是否锁定",
      "required": true,
      "type": "select"  ,
       "data":[
        {
            "value":"T",
            "name":"是"
        },
        {
            "value":"F",
            "name":"否"
        }
      ]
    }
  ]
}