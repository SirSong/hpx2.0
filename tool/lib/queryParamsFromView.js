module.exports = function(fields){
  let view = '';
  fields.forEach(
    (v) => {
      if( v.type == 'text' ){
        view += (`
          <Col span={8} key={'${v.key}'}>
            <FormItem {...formItemLayout} label={'${v.name}'}>
              {getFieldDecorator('${v.key}')(
                <Input placeholder="" />
              )}
            </FormItem>
          </Col>
        `);
      }else if( v.type == 'select' ){
        view += (`
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
        view += (`
          <Col span={8} key={'${v.key}'}>
            <FormItem {...formItemLayout} label={'${v.name}'}>
              {getFieldDecorator('${v.key}')(
                  <DatePicker />
              )}
            </FormItem>
          </Col>
        `)
      }else if( v.type == 'dateRange' ){
        view += (`
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
  return view;
}