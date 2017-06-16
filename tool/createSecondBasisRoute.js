//读modalname文件夹进入缓存
//根据输入的参数（e,g Home,(home)）,替换ModalName，modalName
//生成路由文件夹ModalName

var process = require('process')
var fs = require('fs')
var path = require('path')
var exec = require('child_process').exec; 
var cwd = process.cwd();
const chalk = require('chalk');
var mv = require('mv');

//获得命令行参数
var args = process.argv.splice(2)

//验证参数是否合法
if(!args.length || !/^[a-zA-Z]/.test(args[0])) {
  console.error(chalk.red('参数错误，请输入 配置文件的名字 '));
  return;
}
var config = require('./routeConfigs/'+args[0]).config;
var routeNameHook = 'routeNameHook';
var moduleNameHook = 'moduleNameHook';
var secondModuleNameHook = 'secondModuleNameHook';
var fetchListUrlHook = 'fetchListUrlHook';
var fetchDetailHook = 'fetchDetailHook';
var deleteUrlHook = 'deleteUrlHook';
var addUrlHook = 'addUrlHook';
var updateUrlHook = 'updateUrlHook';
var listFieldsConfigColumnsHook = 'listFieldsConfigColumnsHook';
var mapPropsToFieldsHook = 'mapPropsToFieldsHook';

//首字母大写
var routeNameCapital = require('./lib/capital')(config.routeName);

if( fs.existsSync( path.join(cwd,'/src/routes/',routeNameCapital) ) ){
  console.error(chalk.red(`error: file already exists,${path.join(cwd,'/src/routes/',routeNameCapital)}`));
  return;
}

//生成列表字段配置代码
let columns = require('./lib/createCloumns')(config.listFields);

//生成搜索输入框mapPropsToFields代码
let searchFormMapPropsToFields = require('./lib/searchFormMapPropsToFields')(config.serchFormFields);

//将查询条件保存到URL中
let queryParams = require('./lib/queryParamsToUrl')(config.serchFormFields);

//转化搜索条件用于列表查询
let queryTransSearch = require('./lib/queryTransSearch')(config.serchFormFields);

//查询条件表单代码
let queryParamsFrom = require('./lib/queryParamsFromView.js')(config.serchFormFields);
let queryParamsState = require('./lib/createFieldsModule.js')(config.serchFormFields);

//搜索条件转换
let searchFormValuesTrans = require('./lib/searchFormValuesTrans.js')(config.serchFormFields);;

//详情表单MapPropsToFields
let detailFormMapPropsToFields = require('./lib/createFormMapPropsToFields.js')(config.formFields);

//提交前格式化数据
let formValuesTrans = require('./lib/createFormSubmitFormat.js')(config.formFields);

//详情module fields state的初始化配置
let fieldsState = require('./lib/createFieldsModule.js')(config.formFields);

//module 更新fields配置
let updateFields = require('./lib/createUpdateFieldsModule.js')(config.formFields);

//可编辑表格添加配置
let secondFields = require('./lib/createEditableTableAddConfig')(config.secondListFields);

//可编辑表格columns配置
let secondListFieldsConfigColumns = require('./lib/createEditableTableColumns')(config.secondListFields);

//详情表单view
let detailFormView = require('./lib/createFormView')(config.formFields);

//模版的文件夹名字
var modalRouteDirName = 'routeSecond';
var routeDirFiles = {
  components: {
    ['Component.css']: {
      path: path.join(__dirname, routeNameCapital,'components','Component.css'),
      text: fs.readFileSync(path.join(__dirname,modalRouteDirName,'components','Component.css'), {encoding: 'utf-8'}),
    },
    ['Component.js']: {
      path: path.join(__dirname, routeNameCapital,'components','Component.js'),
      text: fs.readFileSync(path.join(__dirname,modalRouteDirName,'components','Component.js'), {encoding: 'utf-8'})
        .replace(new RegExp(routeNameHook,'g'),config.routeName)
        .replace('listFieldsConfigColumnsHook',columns)
        .replace('queryParamsUrlHook',queryParams)
    },
    ['Search.js']: {
      path: path.join(__dirname, routeNameCapital,'components','Search.js'),
      text: 
        fs.readFileSync(path.join(__dirname,modalRouteDirName,'components','Search.js'), {encoding: 'utf-8'})
          .replace('mapPropsToFieldsHook',searchFormMapPropsToFields)
          .replace('queryParamsFromHook',queryParamsFrom)
          .replace('searchFormValuesTransHook',searchFormValuesTrans)
    }
  },
  containers: {
    ['ComponentContainer.js']: {
      path: path.join(__dirname, routeNameCapital,'containers','ComponentContainer.js'),
      text: fs.readFileSync(path.join(__dirname,modalRouteDirName,'containers','ComponentContainer.js'), {encoding: 'utf-8'})
        .replace(new RegExp(moduleNameHook,'g'),config.moduleName),
    }
  },
  modules: {
    ['module.js']: {
      path: path.join(__dirname, routeNameCapital,'Modules','module.js'),
      text: fs.readFileSync(path.join(__dirname,modalRouteDirName,'Modules','module.js'), {encoding: 'utf-8'})
        .replace(new RegExp(moduleNameHook,'g'),config.moduleName)
        .replace(new RegExp(fetchListUrlHook,'g'),config.url.fetchList)
        .replace(new RegExp(fetchDetailHook,'g'),config.url.fetchDetail)
        .replace(new RegExp(deleteUrlHook,'g'),config.url.del)
        .replace(new RegExp(addUrlHook,'g'),config.url.add)
        .replace(new RegExp(updateUrlHook,'g'),config.url.update)
        .replace(new RegExp('proxyHook','g'),config.proxy || 'proxyBiMai')
        .replace('queryTransSearchHook',queryTransSearch)
        .replace('queryParamsStateHook',queryParamsState)
        .replace('fieldsStateHook',fieldsState)
        .replace('updateFieldsStateHook',updateFields),
    },
    ['secondModule.js']: {
      path: path.join(__dirname, routeNameCapital,'Modules','secondModule.js'),
      text: fs.readFileSync(path.join(__dirname,modalRouteDirName,'Modules','secondModule.js'), {encoding: 'utf-8'})
        .replace(new RegExp(secondModuleNameHook,'g'),config.secondModuleName)
        .replace(new RegExp(fetchListUrlHook,'g'),config.secondUrl.fetchList)
        .replace(new RegExp(deleteUrlHook,'g'),config.secondUrl.del)
        .replace(new RegExp(addUrlHook,'g'),config.secondUrl.add)
        .replace(new RegExp(updateUrlHook,'g'),config.secondUrl.update)
        .replace(new RegExp('proxyHook','g'),config.proxy || 'proxyBiMai')
    }
      
  },
  Detail: {
    components: {
      ['Detail.css']: {
        path: path.join(__dirname, routeNameCapital,'Detail/components','Detail.css'),
        text: fs.readFileSync(path.join(__dirname,modalRouteDirName,'Detail/components','Detail.css'), {encoding: 'utf-8'}),
      },
      ['Detail.js']: {
        path: path.join(__dirname, routeNameCapital,'Detail/components','Detail.js'),
        text: 
          fs.readFileSync(path.join(__dirname,modalRouteDirName,'Detail/components','Detail.js'), {encoding: 'utf-8'})
            .replace('routeNameHook',config.routeName),
      },
      ['First.css']: {
        path: path.join(__dirname, routeNameCapital,'Detail/components','First.css'),
        text: fs.readFileSync(path.join(__dirname,modalRouteDirName,'Detail/components','First.css'), {encoding: 'utf-8'}),
      },
      ['First.js']: {
        path: path.join(__dirname, routeNameCapital,'Detail/components','First.js'),
        text: 
          fs.readFileSync(path.join(__dirname,modalRouteDirName,'Detail/components','First.js'), {encoding: 'utf-8'})
            .replace('detailFormMapPropsToFieldsHook',detailFormMapPropsToFields)
            .replace('detailFormViewHook',detailFormView)
            .replace('formValuesTransHook',formValuesTrans),
      },
      ['Second.css']: {
        path: path.join(__dirname, routeNameCapital,'Detail/components','Second.css'),
        text: fs.readFileSync(path.join(__dirname,modalRouteDirName,'Detail/components','Second.css'), {encoding: 'utf-8'}),
      },
      ['Second.js']: {
        path: path.join(__dirname, routeNameCapital,'Detail/components','Second.js'),
        text: 
          fs.readFileSync(path.join(__dirname,modalRouteDirName,'Detail/components','Second.js'), {encoding: 'utf-8'})
            .replace('secondListFieldsConfigColumnsHook',secondListFieldsConfigColumns)
            .replace('secondFieldsHook',secondFields)
            .replace(/secondFieldsForeignKeyHook/g,config.secondFieldsForeignKey)
      },
    },
    containers: {
      ['DetailContainer.js']: {
        path: path.join(__dirname, routeNameCapital,'Detail/containers','DetailContainer.js'),
        text: fs.readFileSync(path.join(__dirname,modalRouteDirName,'Detail/containers','DetailContainer.js'), {encoding: 'utf-8'})
          .replace(new RegExp(moduleNameHook,'g'),config.moduleName)
          .replace(new RegExp(secondModuleNameHook,'g'),config.secondModuleName),
      }
    },
    ['index.js']: {
      path: path.join(__dirname, routeNameCapital,'Detail','index.js'),
      text: fs.readFileSync(path.join(__dirname,modalRouteDirName,'Detail','index.js'), {encoding: 'utf-8'}),
    }
  },
  ['index.js']: {
    path: path.join(__dirname, routeNameCapital,'index.js'),
    text: fs.readFileSync(path.join(__dirname,modalRouteDirName,'index.js'), {encoding: 'utf-8'})
      .replace(new RegExp(moduleNameHook,'g'),config.moduleName)
      .replace(new RegExp(secondModuleNameHook,'g'),config.secondModuleName)
      .replace(new RegExp(routeNameHook,'g'),config.routeName),
  }
}

//生成文件
require('./lib/createFile')(routeDirFiles);

//更新子路由配置
//update routes/index.js
require('./lib/updateChildRoute')(
  routeNameCapital, 
  path.join(`${cwd}/src/routes/`,'index.js')
);

//移动文件夹
require('./lib/mvDir')(
  path.join(cwd,'tool',routeNameCapital),
  path.join(cwd,'/src/routes/',routeNameCapital)
);