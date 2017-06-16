exports.config = {
  "routeName": "address",
  "moduleName": "addressModule",
  "proxy": "/proxyBiMai",
  "url":{
    "fetchList":"/huaqian/api/v1/address/search",
    "fetchDetail":"/huaqian/api/v1/address/get",
    "add":"/huaqian/api/v1/address/add",
    "update":"/huaqian/api/v1/address/update",
    "del":"/huaqian/api/v1/address/delete",
  },
  "listFields":[
	{
      "key": "consignee",
      "name": "收货人",
      "type": "text"
    },
	{
      "key": "phone",
      "name": "联系方式",
      "type": "text"
    },
	{
      "key": "location",
      "name": "所在地区",
      "type": "text"
    },
	{
      "key": "address",
      "name": "详细地址",
      "type": "text"
    },{
      "key": "addressName",
      "name": "地址名称",
      "type": "text"
    },{
      "key": "isDefault",
      "name": "是否默认收货地址",
	  "required": true,
      "type": "select",
      "data":[
        {
          "value": "0",
          "name": "否"
        },
        {
          "value": "1",
          "name": "是"
        }
      ]
    }
  ],
  "serchFormFields":[
   
  ],
  "formFields":[
	{
      "key": "consignee",
      "name": "收货人",
	  "required": true,
      "type": "text"
    },
	{
      "key": "phone",
      "name": "联系方式",
      "required": true,
      "type": "phone"
    },
	{
      "key": "location",
      "name": "所在地区",
	  "required": true,
      "type": "text"
    },
	{
      "key": "address",
      "name": "详细地址",
       "lengthRange": [1,50],
      "required": true,
      "type": "textarea"
    },{
      "key": "addressName",
      "name": "地址名称",
	  "required": true,
      "type": "text"
    },
	{
      "key": "isDefault",
      "name": "是否默认收货地址",
	  "required": true,
      "type": "select",
      "data":[
        {
          "value": "0",
          "name": "否"
        },
        {
          "value": "1",
          "name": "是"
        }
      ]
    }
  ]
}