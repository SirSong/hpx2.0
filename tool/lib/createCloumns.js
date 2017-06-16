module.exports = function(fields){
  let view = '';
  fields.forEach(
    (v) => {
      if( v.type == 'text' ){
        view += (`{
          key: '${v.key}',
          title: '${v.name}',
          dataIndex: '${v.key}',
        },`)
      }else if( v.type == 'number' ){
        view += (`{
          key: '${v.key}',
          title: '${v.name}',
          dataIndex: '${v.key}',
          render: (text) => <span>{precisionFormat(${v.precision},text)}</span>
        },`)
      }else if( v.type == 'date' ){
        view += (`{
          key: '${v.key}',
          title: '${v.name}',
          dataIndex: '${v.key}',
          render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
        },`)
      }else if( v.type == 'select' ){
        view += (`{
          key: '${v.key}',
          title: '${v.name}',
          dataIndex: '${v.key}',
          render: (text, record) => 
            <span>{
              ${JSON.stringify(v.data)}
                .filter((v)=> v.value == text).map((v)=>v.name) || ''
            }</span>
        },`)
      }else if( v.type == 'image' ){
        view += (`{
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
        },`)
      }else if( v.type == 'file' ){
        view += (`{
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
        },`)
      }
    }
  )
  view += (`{
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <Link to={\`\${this.getUrlQueryParams()}/detail/0/\${record.id}\`}>
              修改
            </Link>
            <span className="ant-divider" />
            <Popconfirm title="确定删除?" onConfirm={() => this.props.del(record.id)}>
              <a href="#">删除</a>
            </Popconfirm>
          </span>
        ),
      }`)
  return view;
}