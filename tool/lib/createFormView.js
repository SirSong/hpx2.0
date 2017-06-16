module.exports = function(fields){
  let view = '';
  fields.forEach(
    (v) => {
      if( v.type == 'text' ){
        v.lengthRange = v.lengthRange || [0,65536]
        view += (`
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
        view += (`
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
        view += (`
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
        view += (`
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
        view += (`
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
        view += (`
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
        view += (`
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
        view += (`
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
        view += (`
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
        view += (`
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
        view += (`
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
        view += (`
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
  return view;
}