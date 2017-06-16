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
var fetchListUrlHook = 'fetchListUrlHook';
var fetchDetailHook = 'fetchDetailHook';
var deleteUrlHook = 'deleteUrlHook';
var addUrlHook = 'addUrlHook';
var updateUrlHook = 'updateUrlHook';
var listFieldsConfigColumnsHook = 'listFieldsConfigColumnsHook';
var mapPropsToFieldsHook = 'mapPropsToFieldsHook';

//保证首字母大写
var routeNameCapital = 
  args[0]
    .replace(
      /\s[a-z]/g,
      function($1){
        return $1.toLocaleUpperCase()
      }
    ).replace(
      /^[a-z]/,
      function($1){
        return $1.toLocaleUpperCase()
      }
    );

if( fs.existsSync( path.join(cwd,'/src/routes/',routeNameCapital) ) ){
  console.error(chalk.red(`error: file already exists,${path.join(cwd,'/src/routes/',routeNameCapital)}`));
  return;
}

//生成列表字段配置代码
let columns = [];
config.listFields.forEach(
  (v) => {
    if( v.type == 'text' ){
      columns.push(`{
        key: '${v.key}',
        title: '${v.name}',
        dataIndex: '${v.key}',
      }`)
    }else if( v.type == 'number' ){
      columns.push(`{
        key: '${v.key}',
        title: '${v.name}',
        dataIndex: '${v.key}',
        render: (text) => <span>{precisionFormat(${v.precision},text)}</span>
      }`)
    }else if( v.type == 'date' ){
      columns.push(`{
        key: '${v.key}',
        title: '${v.name}',
        dataIndex: '${v.key}',
        render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
      }`)
    }else if( v.type == 'select' ){
      columns.push(`{
        key: '${v.key}',
        title: '${v.name}',
        dataIndex: '${v.key}',
        render: (text, record) => 
          <span>{
            ${JSON.stringify(v.data)}
              .filter((v)=> v.value == text).map((v)=>v.name) || ''
          }</span>
      }`)
    }else if( v.type == 'image' ){
      columns.push(`{
        key: '${v.key}',
        title: '${v.name}',
        dataIndex: '${v.key}',
        render: (text, record) => 
          <span>
            {text ? text.map(
              (v, i) => (
                <a key={i} target="_blank" href={v.url}>
                  <img src={v.url} style={{ width: '32px', height: '32px' }} />
                </a>
              )
            ) : null}
          </span>
      }`)
    }else if( v.type == 'file' ){
      columns.push(`{
        key: '${v.key}',
        title: '${v.name}',
        dataIndex: '${v.key}',
        render: (text, record) => 
          <span>
            {text ? text.map(
              (v, i) => (
                <a key={i} target="_blank" href={v.url}>{v.name}</a>
              )
            ) : null}
          </span>
      }`)
    }
  }
)
      columns.push(`{
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <Link to={\`\${this.getUrlQueryParams()}/detail/\${record.id}\`}>
              修改
            </Link>
            <span className="ant-divider" />
            <Popconfirm title="确定删除?" onConfirm={() => this.props.del(record.id)}>
              <a href="#">删除</a>
            </Popconfirm>
          </span>
        ),
      }`)

//生成搜索输入框mapPropsToFields代码
let searchFormMapPropsToFields = [];
//将查询条件保存到URL中
let queryParams = [];
//转化搜索条件用于列表查询
let queryTransSearch = '';
config.serchFormFields.forEach(
  (v) => {
    if( v.type == 'text' || v.type == 'select' ){
      searchFormMapPropsToFields.push(`{
        key: '${v.key}',
        value: {
          ...props.${v.key}
        }
      }`) 
      queryParams.push(`{
        key: '${v.key}',
        value: {
          value: queryParams.${v.key} ? queryParams.${v.key}.value : null
        }
      }`)
      queryTransSearch += `
    let ${v.key} = queryParams.${v.key} ? queryParams.${v.key}.value : null;
    if(${v.key}) queryParams.${v.key} = queryParams.${v.key}.value;
    else delete queryParams.${v.key};
      `;
    }else if( v.type == 'date' ){
      searchFormMapPropsToFields.push(`{
        key: '${v.key}',
        value: {
          ...props.${v.key},
          value: props.${v.key} ? getMoment(props.${v.key}.value, dateFormat) : null,
        }
      }`) 
      queryParams.push(`{
        key: '${v.key}',
        value: {
          value: queryParams.${v.key}
            ? this.getMomentFormat(queryParams.${v.key}.value) 
            : null
        }
      }`);
      queryTransSearch += `
    let ${v.key} = queryParams.${v.key} ? queryParams.${v.key}.value : null;
    if(${v.key}) queryParams.${v.key} = queryParams.${v.key}.value;
    else delete queryParams.${v.key};
      `;
    }else if( v.type == 'dateRange' ) {
      searchFormMapPropsToFields.push(`{
        key: '${v.key}',
        value:  {
          ...props.${v.key},
          value: props.${v.key} && props.${v.key}.value
          ? props.${v.key}.value.length > 0
            ? [
              getMoment(props.${v.key}.value[0], dateFormat),
              getMoment(props.${v.key}.value[1], dateFormat)
            ].filter((v) => !!v)
            : null
          : null,
        }
      }`) 
      queryParams.push(`{
        key: '${v.key}',
        value: {
          value: queryParams.${v.key} && queryParams.${v.key}.value
            ? queryParams.${v.key}.value.length > 0
              ? [
                this.getMomentFormat(queryParams.${v.key}.value[0]),
                this.getMomentFormat(queryParams.${v.key}.value[1]),
              ].filter((v) => !!v)
              : null
            : null,
        }
      }`)
      queryTransSearch += `
    let ${v.key} = queryParams.${v.key} ? queryParams.${v.key}.value : null;
    delete queryParams.${v.key};
    if(${v.key}){
      if( ${v.key}[0] ) queryParams.${v.startKey} = ${v.key}[0];
      if( ${v.key}[1] ) queryParams.${v.endKey} = ${v.key}[1];
    }
      `;
    }
  }
)
//查询条件表单代码
let queryParamsFrom = [];
let queryParamsState = [];
config.serchFormFields.forEach(
  (v) => {
    queryParamsState += (`
      ${v.key}: {
        value: null
      },`)
    if( v.type == 'text' ){
      queryParamsFrom.push(`
        <Col span={8} key={'${v.key}'}>
          <FormItem {...formItemLayout} label={'${v.name}'}>
            {getFieldDecorator('${v.key}')(
              <Input placeholder="" />
            )}
          </FormItem>
        </Col>
      `);
      
    }else if( v.type == 'select' ){
      queryParamsFrom.push(`
        <Col span={8} key={'${v.key}'}>
          <FormItem {...formItemLayout} label={'${v.name}'}>
            {getFieldDecorator('${v.key}')(
              <Select placeholder="请选择" >
                {${JSON.stringify(v.data)}.map(
                  (v) => <Option key={v.value} value={v.value}>{v.name}</Option>
                )}
              </Select>
            )}
          </FormItem>
        </Col>
      `)
    }else if( v.type == 'date' ){
      queryParamsFrom.push(`
        <Col span={8} key={'${v.key}'}>
          <FormItem {...formItemLayout} label={'${v.name}'}>
            {getFieldDecorator('${v.key}')(
                <DatePicker />
            )}
          </FormItem>
        </Col>
      `)
    }else if( v.type == 'dateRange' ){
      queryParamsFrom.push(`
        <Col span={8} key={'${v.key}'}>
          <FormItem {...formItemLayout} label={'${v.name}'}>
            {getFieldDecorator('${v.key}')(
                <RangePicker
                  format={dateFormat}
                />
            )}
          </FormItem>
        </Col>
      `)
    }
  }
)
//搜索条件转换
let searchFormValuesTrans = '';
config.serchFormFields.forEach(
  (v) => {
    if( v.type == 'checkout' ){
      searchFormValuesTrans += (`
        values.${v.key} = ${JSON.stringify(v.data)}.filter(
          v => v.value == values.${v.key}
        )
        values.${v.key} = values.${v.key}.length ? values.${v.key}[0].key : '';
      `)
    }else if( v.type == 'date' ){
      searchFormValuesTrans += (`
        values.${v.key} = values.${v.key} ? values.${v.key}.format('YYYY/MM/DD') : '';
      `)
    }else if( v.type == 'dateRange' ){
      searchFormValuesTrans += (`
        values.${v.key} = values.${v.key}
          ? values.${v.key}.length > 0
            ? [
              getMoment(values.${v.key}[0], 'YYYY/MM/DD'),
              getMoment(values.${v.key}[1], 'YYYY/MM/DD')
            ].filter((v) => !!v)
            : ''
          : '';
      `)
    }
  }
)
//详情表单MapPropsToFields
let detailFormMapPropsToFields = [];
config.formFields.forEach(
  (v) => {
    if( 
         v.type == 'text' 
      || v.type == 'select' 
      || v.type == 'checkout'
      || v.type == 'email' 
      || v.type == 'number'
      || v.type == 'phone' 
      || v.type == 'password'
      || v.type == 'smsCode'
      || v.type == 'textarea' ){
        detailFormMapPropsToFields.push(`{
          key: '${v.key}',
          value: {
            ...props.${v.key}
          }
        }`)
    }else if( v.type == 'date' ){
      detailFormMapPropsToFields.push(`{
          key: '${v.key}',
          value: {
            ...props.${v.key},
            value: props.${v.key} && props.${v.key}.value ? moment(props.${v.key}.value) : null,
          }
        }`)
    }else if( v.type == 'image' || v.type == 'file' ){
      detailFormMapPropsToFields.push(`{
          key: '${v.key}',
          value: {
            ...props.${v.key},
            value: props.${v.key} 
                && props.${v.key}.value
                && props.${v.key}.value.map(
                  (v,i) => {
                    return v.response && v.response.success ? {
                        id: v.response.data.id,
                        uid:  v.response.data.id,
                        name: v.response.data.name,
                        url: v.response.data.url,
                        status: 'done',
                      }
                      : {
                        id: v.id,
                        uid: v.uid || v.id,
                        name: v.name,
                        url: v.url,
                        status: v.status,
                      }
                  }
                )
          }
        }`)
    }
  }
)
//详情表单MapPropsToFields
let formValuesTrans = '';
let fieldsState = '';
let updateFields = '';
config.formFields.forEach(
  (v) => {
    fieldsState += (`
    ${v.key}: {
      value: null
    },`)
    updateFields += (`
          ${v.key}: {
            value: data.${v.key} || null
          },`)
    if( v.type == 'checkout' ){
      formValuesTrans += (`
        values.${v.key} = ${JSON.stringify(v.data)}.filter(
          v => v.value == values.${v.key}
        )
        values.${v.key} = values.${v.key}.length ? values.${v.key}[0].key : '';
      `)
    }else if( v.type == 'date' ){
      formValuesTrans += (`
        values.${v.key} = values.${v.key} ? values.${v.key}.format('YYYY/MM/DD') : '';
      `)
    }else if( v.type == 'image' || v.type == 'file' ){
      formValuesTrans += (`
        values.${v.key} = JSON.stringify(values.${v.key});
      `)
    }
  }
)

//详情表单view
let detailFormView = '';
config.formFields.forEach(
  (v) => {

    if( v.type == 'text' ){
      v.lengthRange = v.lengthRange || [0,65536]
      detailFormView += (`
        <FormItem
          key="${v.key}"
          {...formItemLayout}
          label="${v.name}"
          hasFeedback
        >
          {getFieldDecorator('${v.key}',{
            rules: [
              { required: ${v.required}, message: '请输入数据!', whitespace: true },
              {
                 message: '长度需在${v.lengthRange[0]}-${v.lengthRange[1]}位!',
              },
            ],
          })(
            <Input 
            />
          )}
        </FormItem>
      `)
    }else if( v.type == 'textarea' ){
      detailFormView += (`
        <FormItem
          key="${v.key}"
          {...formItemLayout}
          label="${v.name}"
          hasFeedback
        >
          {getFieldDecorator('${v.key}',{
            rules: [
              { required: ${v.required}, message: '请输入数据!', whitespace: true },
              {
                min: ${v.lengthRange[0]}, max:  ${v.lengthRange[1]}, message: '长度需在${v.lengthRange[0]}-${v.lengthRange[1]}位!',
              },
            ],
          })(
            <Input 
              type="textarea"
              rows={4}
            />
          )}
        </FormItem>
      `)
    }else if( v.type == 'email' ){
      detailFormView += (`
        <FormItem
          key="${v.key}"
          {...formItemLayout}
          label="${v.name}"
          hasFeedback
        >
          {getFieldDecorator('${v.key}', {
            rules: [{
              type: 'email', message: '请输入邮箱格式的数据!',
            }, {
              required: ${v.required}, message: '请输入你的邮箱!',
            }],
          })(
            <Input autoComplete="off"/>
          )}
        </FormItem>
      `)
    }else if( v.type == 'phone' ){
      detailFormView += (`
        <FormItem
          key="${v.key}"
          {...formItemLayout}
          label="${v.name}"
        >
          {getFieldDecorator('${v.key}', {
            rules: [
              { required: ${v.required}, message: '请输入你的手机号!' },
              { validator: this.checkPhoneConfirm.bind(this,'${v.key}') }
            ],
          })(
            <Input addonBefore={prefixSelector} />
          )}
        </FormItem>
      `)
    }else if( v.type == 'number' ){
      detailFormView += (`
        <FormItem
          key="${v.key}"
          {...formItemLayout}
          label="${v.name}"
          hasFeedback
        >
          {getFieldDecorator('${v.key}',{
            rules: [
              { type: 'number',required: ${v.required}, message: '请输入数字!'},
              { validator: precisionValidator.bind( this, ${v.precision} ) }
            ],
          })(
            <InputNumber />
          )}
        </FormItem>
      `)
    }else if( v.type == 'password' ){
      detailFormView += (`
        <FormItem
          key="${v.key}"
          {...formItemLayout}
          label="${v.name}"
          hasFeedback
        >
          {getFieldDecorator('${v.key}', {
            rules: [{
              required: ${v.required}, message: '请输入密码!',
            },{
              min: 6, max: 16, message: '密码长度需在6-16位!',
            }, {
              validator: this.checkPassword,
            }],
          })(
            <Input type="password" autoComplete="off"/>
          )}
        </FormItem>
      `)
    }else if( v.type == 'smsCode' ){
      detailFormView += (`
        <FormItem
          key="${v.key}"
          {...formItemLayout}
          label="${v.name}"
          extra="我们需要确保你是人类."
        >
          <Row gutter={8}>
            <Col span={12}>
              {getFieldDecorator('${v.key}', {
                rules: [
                  { required: ${v.required}, message: '请输入你收到的验证码!' },
                ],
              })(
                <Input size="large" />
              )}
            </Col>
            <Col span={12}>
              <Button size="large" 
                onClick={this.fetchCaptcha.bind(this,'${v.key}','${v.phoneKey}')} 
                disabled={this.state.smsButtonDisabled}>{this.state.smsButtonMsg}
              </Button>
            </Col>
          </Row>
        </FormItem>
      `)
    }else if( v.type == 'select' ){
      detailFormView += (`
        <FormItem
          key="${v.key}"
          {...formItemLayout}
          label="${v.name}"
          hasFeedback
        >
          {getFieldDecorator('${v.key}',{
            rules: [
              { required: ${v.required}, message: '请选择!'},
            ],
          })(
            <Select placeholder="请选择" >
              {${JSON.stringify(v.data)}.map(
                (v) => <Option key={v.value} value={v.value}>{v.name}</Option>
              )}
            </Select>
          )}
        </FormItem>
      `)
    }else if( v.type == 'checkout' ){
      detailFormView += (`
        <FormItem
          key="${v.key}"
          {...tailFormItemLayout} 
          style={{ marginBottom: 8 }}>
          {getFieldDecorator('${v.key}', {
            rules: [{ required: ${v.required}, message: '请先同意协议!' }],
            valuePropName: 'checked',
          })(
            <Checkbox>${v.name}</Checkbox>
          )}
        </FormItem>
      `)
    }else if( v.type == 'image' ){
      detailFormView += (`
        <FormItem
          key="${v.key}"
          {...formItemLayout}
          label="${v.name}"
          extra=""
        >
          {getFieldDecorator('${v.key}', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload 
              name="${v.key}" 
              action={__PROXY__+"/trade/file/upload"} 
              listType="picture-card" 
              beforeUpload={this.beforeUpload}
              onPreview={this.handlePreview}
            >
              {this.props.${v.key} && this.props.${v.key}.value && this.props.${v.key}.value.length >= ${v.fileLength} ? null : 
                <div>
                  <Icon type="plus" />
                  <div className="ant-upload-text">Upload</div>
                </div>
              }
            </Upload>
            
          )}
        </FormItem>
      `)
    }else if( v.type == 'file' ){
      detailFormView += (`
         <FormItem
          key="${v.key}"
          {...formItemLayout}
          label="${v.name}"
          extra=""
        >
          {getFieldDecorator('${v.key}', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload 
              name="${v.key}" 
              action={__PROXY__+"/trade/file/upload"} 
              listType="text" 
            >
              {this.props.${v.key} && this.props.${v.key}.value && this.props.${v.key}.value.length >= ${v.fileLength} ? null : 
                <Button>
                  <Icon type="upload" /> 点击上传
                </Button>
              }
            </Upload>
          )}
        </FormItem>
      `)
    }else if( v.type == 'date' ){
      detailFormView += (`
        <FormItem
          key="${v.key}"
          {...formItemLayout}
          label="${v.name}"
          hasFeedback
        >
          {getFieldDecorator('${v.key}',{
            rules: [
              { type:'object', required: ${v.required}, message: '请选择日期!'},
            ],
          })(
            <DatePicker /> 
          )}
        </FormItem>
      `)
    }
  }
)
var modalRouteDirName = 'route';
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
            .replace('detailFormMapPropsToFieldsHook',detailFormMapPropsToFields)
            .replace('detailFormViewHook',detailFormView)
            .replace('formValuesTransHook',formValuesTrans),
      }
    },
    containers: {
      ['DetailContainer.js']: {
        path: path.join(__dirname, routeNameCapital,'Detail/containers','DetailContainer.js'),
        text: fs.readFileSync(path.join(__dirname,modalRouteDirName,'Detail/containers','DetailContainer.js'), {encoding: 'utf-8'})
          .replace(new RegExp(moduleNameHook,'g'),config.moduleName),
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
      .replace(new RegExp(routeNameHook,'g'),config.routeName),
  }
}

function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

for( var k in routeDirFiles ){
  if( routeDirFiles[k].path ){
    ensureDirectoryExistence(routeDirFiles[k].path);
    fs.writeFileSync(
      routeDirFiles[k].path,
      routeDirFiles[k].text,
      {flag:'w'}
    )
  }else {
    for( var kk in routeDirFiles[k] ){
      var fileOb = routeDirFiles[k][kk];
      if( fileOb.path ){
        ensureDirectoryExistence(fileOb.path);
        fs.writeFileSync(
          fileOb.path,
          fileOb.text,
          {flag:'w'}
        )
      }else if(fileOb) {
        for( var kkk in fileOb ){
          var _fileOb = fileOb[kkk];
          if( _fileOb.path ){
            ensureDirectoryExistence(_fileOb.path);
            fs.writeFileSync(
              _fileOb.path,
              _fileOb.text,
              {flag:'w'}
            )
          }
        }
      }
    }
  }
}

//update routes/index.js
var ahchor = '//--anchor--';
var newContent = `
        require('./${routeNameCapital}').default(store),\t\t\t\t\t\r\n
        //--anchor--`;
var routesIndexJS = 
  path.join(`${cwd}/src/routes/`,'index.js');
var routesIndexJsText = 
  fs.readFileSync(routesIndexJS, {
      encoding: 'utf-8'
  });
routesIndexJsText = routesIndexJsText
  .replace(ahchor,newContent)

fs.writeFileSync(
  path.join(`${cwd}/src/routes/`,'index.js'),
  routesIndexJsText,
  {flag:'w'}
)
console.log('success to add new route in routes/index.js');

mv(
  path.join(cwd,'tool',routeNameCapital),
  path.join(cwd,'/src/routes/',routeNameCapital),
  {mkdirp: true},
  function(err){
    if(err) {
        console.log('fail:移动文件夹失败，'+`mv ${path.join(cwd,'tool',routeNameCapital)} ${path.join(cwd,'/src/routes/')}`);
    } else {
        console.log(`successfully created a new route which name is ${routeNameCapital}!`)
    }
  }
)