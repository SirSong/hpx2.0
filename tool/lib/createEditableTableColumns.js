module.exports = function(fields){
  let view = '';
  fields.forEach(
    (v) => {
      if(v.type == 'text'){
        view += (`
          {
            key: '${v.key}',
            title: '${v.name}',
            dataIndex: '${v.key}',
            render: (text, record, index) => this.renderColumns('text',this.state.data, index, '${v.key}', text),
          },`);
      }else if(v.type == 'number'){
        view += (`
          {
            key: '${v.key}',
            title: '${v.name}',
            dataIndex: '${v.key}',
            render: (text, record, index) => this.renderColumns('number',this.state.data, index, '${v.key}', text, ${v.precision}),
          },`);
      }else if(v.type == 'date'){
        view += (`
          {
            key: '${v.key}',
            title: '${v.name}',
            dataIndex: '${v.key}',
            render: (text, record, index) => this.renderColumns('date',this.state.data, index, '${v.key}', text),
          },`);
      }else if(v.type == 'select'){
        view += (`
          {
            key: '${v.key}',
            title: '${v.name}',
            dataIndex: '${v.key}',
            render: (text, record, index) => this.renderColumns(
              'select',
              this.state.data, 
              index,
              '${v.key}',
              text,
              ${JSON.stringify(v.data)}
            )
          },`);
      }
    }
  )
  view += (`
          {
          title: '操作',
          key: 'action',
          render: (text, record, index) => {
            const { editable } = this.state.data[index].${fields[0].key};
            return <div className="editable-row-operations">
              {
                editable ?
                  <span>
                    <a onClick={() => this.editDone(index, 'save')}>保存</a>
                    <span className="ant-divider" />
                    <Popconfirm title="确定取消?" onConfirm={() => this.editDone(index, 'cancel')}>
                      <a>取消</a>
                    </Popconfirm>
                  </span>
                  :
                  <span>
                    <a onClick={() => this.edit(index)}>编辑</a>
                    <span className="ant-divider" />
                    <Popconfirm title="确定删除?" onConfirm={() => this.props.del(record.id)}>
                      <a href="#">删除</a>
                    </Popconfirm>
                  </span>
              }
            </div>
          },
        }`);
  return view;
}