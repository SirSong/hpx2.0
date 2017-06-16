### 项目说明

> *基于react-redux-starter-kit*  
> 旨在作为一个基础框架  
> 提供一些必要的功能  
> 使得后续的项目可以在此基础上快速搭建  

### 浏览器兼容

> IE11+ 

### 提供脚本根据配置文件生成基础增删改查功能路由模块

> 已提供了一个例子：  
> tool/createBasisRoute.js:  脚本  
> tool/routeConfigs/testOb.js: 配置文件  
> 运行：npm run initRoute testOb, 有以下提示即成功生成  

```
success to add new route in routes/index.js  
create new route is finished!!!
```

> 注意initRoute 后的参数即配置文件的名字，不带后缀，并且该名字会作为路由名字 

### 自动生成代码脚本`createBasisRoute.js`配置文件的说明

> 基本配置、表单、搜索及列表不同数据类型的书写规范：

##### 1 基本配置说明 (以tool/routeConfigs/testOb.js模块为例，配置其他模块时只需将testOb改为需配置的模块名)
>基础配置：  
routeName:路由的名字，即浏览器地址——协议://(ip|域名):port/routeName  
moduleName:用于标识当前module，用于唯一识别常量，以及reducer（见index.js:`injectReducer`，module.js:`ACTION_PREFIX`）  
proxy:由于开发阶段需要通过代理来访问数据，所以这个变量是用于配合main.js进行匹配前缀转发的 ,注意必须加‘／’，保证是绝对路径 
url:后台提供的服务接口，注意本配置针对使用restful风格的接口规范，会在patch，delete，get类型的请求地址后自动补齐相应参数，所以  
错误：`"update": "/trade/testOb/save/:id",`  
正确：`"update": "/trade/testOb/save",`
```html
{
  "routeName": "testOb",
  "moduleName": "testObModule",
  “proxy”: "/proxy",
  "url":{
    "fetchList": "/trade/testOb/list",
    "fetchDetail": "/trade/testOb/detail",
    "add": "/trade/testOb/save",
    "update": "/trade/testOb/save",
    "del": "/trade/testOb/delete"
  }
```

##### 2 列表(listFields)  
>列表数据共6种类型

```html
text：
{
  "key": "email",
  "name": "邮箱",
  "type": "text"
}
number(precision:精度控制)：
{
  "key": "accuracy",
  "name": "数字",
  "precision": 2,
  "type": "number"
}
date：
{
  "key": "datePicker",
  "name": "日期",
  "type": "date"
}
select：
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
image：
 {
  "key": "uploadimg",
  "name": "图片",
  "type": "image"
}
file：
{
  "key": "uploadview",
  "name": "文件",
  "type": "file"
}
```

##### 3 搜索条件(serchFormFields)  
>搜索条件数据共4种类型

```html
text：
{
  "key": "field1",
  "name": "文本",
  "type": "text"
},
date：
{
  "key": "field2",
  "name": "日期",
  "type": "date"
}
dateRange(startKey,endKey指后台接收的字段名):
{
	"key": "timeRange",
  "name": "时间范围",
  "type": "dateRange",
  "startKey": "startTime",
  "endKey": "endTime",
}
select：
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
```

##### 4 表单(formFields)
>搜索条件数据共12种类型，这个根据数据的特殊验证方式，以及显示方式不断扩充，即例如验证码这样的数据，显示和交互只能个性化处理
```html
email：
{
  "key": "email",
  "name": "邮箱",
  "required": true,
  "type": "email"
}
number：
{
  "key": "accuracy",
  "name": "数字",
  "precision": 2,//精度
  "required": true,
  "type": "number"
}
phone：
{
  "key": "phone",
  "name": "手机号",
  "required": true,
  "type": "phone"
}
password：
{
  "key": "password",
  "name": "密码",
  "required": true,
  "type": "password"
}
text(lengthRange:文本长度控制，如果不控制，则去掉这个字段)：
{
  "key": "company",
  "name": "公司",
  "lengthRange": [6,16],
  "required": true,
  "type": "text"
}
textarea：
{
  "key": "nickname",
  "name": "昵称",
  "lengthRange": [1,50],
  "required": true,
  "type": "textarea"
}
date：
{
  "key": "datePicker",
  "name": "日期",
  "required": true,
  "type": "date"
}
select:
{
  "key": "selectorcountry",
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
image（fileLength：控制上传数量）：
{
  "key": "uploadimg",
  "name": "图片",
  "required": true,
  "type": "image",
  "fileLength": 3,
}
file：
{
  "key": "uploadview",
  "name": "文件",
  "required": true,
  "type": "file",
  "fileLength": 3
}
checkout：
 {
  "key": "agreement",
  "name": "我已经同意",
  "required": true,
  "type": "checkout",
  "data":[
    {
      key: "0",
      value: false,
    },
    {
       key: "1",
       value: true,
    }
   ]
  }
smsCode：
 { 
	"key": "captcha", 
    "name": "验证码", 
    "phoneKey": "phone", 
    "required": true,  
    "type": "smsCode"
 }
```
### 自动生成代码脚本`createSecondBasisRoute.js`配置文件的说明
>在`createSecondBasisRoute.js`的配置基础上增加了部分配置
##### 1 基本配置说明 (以tool/routeConfigs/testObSecond.js模块为例，配置其他模块时只需将testObSecond改为需配置的模块名)
>新增基础配置：  
"secondModuleName": "testObGoodsModule",//明细表模块名
"secondFieldsForeignKey": "tOrderDetailId",//明细表里的主表键名
"secondUrl":{
  "fetchList": "/trade/testObDetail/list",//明细表里的列表接口
  "add": "/trade/testObDetail/save",//明细表里的添加接口
  "update": "/trade/testObDetail/save",//明细表里的更新接口
  "del": "/trade/testObDetail/delete",//明细表里的删除接口
},
##### 2 列表(secondListFields)  
>列表数据共4种类型

```html
text：
{
  "key": "email",
  "name": "邮箱",
  "type": "text"
}
number(precision:精度控制)：
{
  "key": "accuracy",
  "name": "数字",
  "precision": 2,
  "type": "number"
}
date：
{
  "key": "datePicker",
  "name": "日期",
  "type": "date"
}
select：
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
```
### 以下项目相关的部分问题  
#### 1. 项目的接口规范？ 
>如果再在开发过程中后台提供的接口不符合以下规范，需讨论并确定是否以下面的规范来处理 

1.拉取列表  
>request type: get  
>列表查询条件 以“?”的形式放在路由后面  
例如：/proxyBiMai/huaqian/api/v1/deliveryNote/search?page=1&size=10&status=1  

2.删除数据  
>request type: delete  
>以restful的形式将删除数据对应的id放到路由后面  
例如：/proxyBiMai/huaqian/api/v1/deliveryNote/deleteDetail/6  

3.添加数据  
>request type: put  
>添加的数据以json格式放到请求体里    
例如：/proxyBiMai/huaqian/api/v1/deliveryNote/addDetail  

4.更新数据  
>request type: patch  
>以restful的形式将更新数据对应的id放到路由后面   
>更新的数据以json格式放到请求体里    
例如：/proxyBiMai/huaqian/api/v1/deliveryNote/update/2 

5.获取详情  
>request type: get  
>以restful的形式将数据对应的id放到路由后面   
例如：/proxyBiMai/huaqian/api/v1/deliveryNote/get/2

#### 2. 如何解决跨域请求的问题？ 
`server/main.js`: 在该文件里添加如：`app.use('/proxy', proxy('http://localhost:3005/'))`,然后在前端代码里请求数据时，在路由前加上`/proxy`来匹配该转发
#### 3. 如何让其他人能访问我的页面  
`config/environments.config.js`: 将`compiler_public_path`的localhost改成你当前的ip或域名即可  
#### 4. 怎么改端口号  
`config/project.config.js`: 修改`server_port`即可
#### 5. 怎么增加全局变量  
`config/project.config.js`: 修改`config.globals`即可  
#### 6. `webpack.dll.config.js`文件的作用?
由于当前的开发模式，每次编译都需要把所有用到的代码都编译，消耗许多时间。但实际上部分依赖的代码是比较固定的，所以可以先将这些代码打包好，作为lib直接在html的head里引入，`vendor`对应的即不会频繁变化的库，生成的文件见`public/vendor.dll.js`  
如何重新生成？  
在项目根目录下执行双引号里的代码“`./node_modules/.bin/webpack --config config/webpack.dll.config.js`”  
#### 7. 如何配置侧边栏目录数据,如何配置哪些路由有访问权限?  
`src/modules/route.js`:修改`initialState.menu`即可增加删除要显示的目录  
`src/modules/route.js`:修改`initialState.authRoute`即可增加删除要有访问权限的用户  
#### 8. 当前的登录模式?  
用户先登录，再选择项目，此时才算是进入管理界面，见`src/modules/login.js`  