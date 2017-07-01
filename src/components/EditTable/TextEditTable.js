import React from 'react'
import { TextEditableCell } from '../EditableCell'
import { Table , Icon , Button , Input , Popconfirm ,message} from 'antd'
class TextEditTable extends React.Component{
  constructor(props){
    super(props)
    /*
    ** @props 获取传入的props 并依次对各个属性处理
    */
    const { columns , rowKey , actions } = this.props;

    this.actionAdd =  actions.add // 对 操作的配置 现在没做处理
    
    this.addNum = 0; // 新增 key

    this.rowKey = rowKey;


    /*  actions(操作) 编辑/删除 /
    **  actions 的 key 现在 action? 可能会冲突
    */ 
    this.actions = {
      title: '操作',
      key: 'action',
      render: (text, record ,index) => {
        const { editable } = this.state.data[index][columns[0].key]
        return (
          <span>
            <span>
              {
                editable ?
                  <span>
                    <a onClick={() => { this.editDone(index, 'save')}}>保存</a>
                    <Popconfirm title="Sure to cancel?" onConfirm={() => this.editDone(index, 'cancel')}>
                      <a>撤销</a>
                    </Popconfirm>
                  </span>
                  :
                  <span>
                    <a onClick={() => this.edit(index)}>编辑</a>
                  </span>
              }
            </span>
            <span className="ant-divider" />
            <Popconfirm title="确定删除?" onConfirm={() => this.onDelete(record[rowKey])}>
              <a href="#">删除</a>
            </Popconfirm>
          </span>
        )},
    }


    /* 每个 td的处理 现在 只能 是 text 文本 
    ** 可增加 select datePicker 通过 配置 操作显示（暂无）
    */
    columns.map((v,i)=>{
        v.render = (text,record,index)=>{
          return <span>{this.renderColumns(record,index,v.key,text)}</span>
        }
        v.width = 200;
    });
    this.columns = [...columns,this.actions];
    this.state = {
      data : [],
      columns : this.columns,
    }
    
  }
  
  renderColumns(record, index, key, text) {
    if(!this.state.data.length)return;
    const { editable, status } = this.state.data[index][key];
    if (typeof editable === 'undefined') {
      return text;
    };
    return (<TextEditableCell
      editable={editable}
      value={text}
      onChange={value => this.handleChange(key, index, value)}
      status={status}
    />);
  }

  handleChange(key, index, value) {
    const { data } = this.state;
    data[index][key].value = value;
    this.setState({ data });
  }
  edit(index) {
    const { data } = this.state;
    Object.keys(data[index]).forEach((item) => {
      if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
        data[index][item].editable = true;
      }
    });
    this.setState({ data });
  }
  editDone(index, type) {
    const { data } = this.state;

    /*
    ** 编辑状态下 Input为空时 提示不可为空
    */
    for (let item of Object.keys(data[index])){    
      // 判断不为空时 有 字段是ture/false 需做修改
      if(data[index][item] && typeof data[index][item].editable !== 'undefined' && !data[index][item].value){
        message.error('数据不能为空!');
        return;
      }
    }

    Object.keys(data[index]).forEach((item) => {
      if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
        data[index][item].editable = false;
        data[index][item].status = type;
      }
    });

    this.setState({ data }, () => {
      Object.keys(data[index]).forEach((item) => {
        if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
          delete data[index][item].status;
        }
      });
    });
  }

  onDelete = (id) => {
    const { data } = this.state;
    const index = data.findIndex((v)=> { return v[this.rowKey] === id });
    data.splice(index, 1);
    this.setState({ data });
  }

  add(){
    let newData = {};
    for(let value of Object.values(this.props.columns)){
      newData[value.key] = {
        value : '',
        editable : true,
      }
      newData[this.rowKey] = `add${this.addNum}`
    }

    this.addNum++;
    const data = [...this.state.data,newData];
    this.setState({
      data
    })
  }

  save(){
      const { data } = this.state;
      const { columns } = this.props;
 
      for (let value of Object.values(data)){
        for(let v of Object.values(columns)){
          if(!value[v.key].value){
              message.error('不能为空');
              return
          }
        }

      }
      const formData = this.formatData(data);
      this.props.getData(formData);
  }

  formatData(data){
    let dataSource = data.map((item) => {
      const obj = {};
      Object.keys(item).forEach((key) => {
        obj[key] = key === this.rowKey ? item[key] : item[key].value;
      });
      return obj;
    });
    return dataSource
  }

  componentDidMount(){

  }

  componentWillReceiveProps(nextProps){
    
    const { dataSource } = nextProps;
    let data = [];
    if(dataSource && dataSource.length){
      data = dataSource.map((v,i)=>{
        let obj = {};
        Object.keys(v).forEach((key) => {
          obj[key] = key === this.rowKey ? v[key] : { value : v[key] , editable : false };
        });
        return obj
      });

      this.setState({
        data,
      })
    }
  }

  render(){
    console.log(this.props)
    const { data } = this.state;
    const dataSource = data && data.length ? this.formatData(data) : [];
    return <div>
              <Button type='default' onClick={()=>this.add()}>新增</Button>
              <Table
              rowKey = {this.rowKey}
              columns = {this.columns}
              dataSource = {dataSource}
               />
              <Button type='default' onClick={()=>this.save()} >保存</Button>
          </div>
  }

}

export default TextEditTable