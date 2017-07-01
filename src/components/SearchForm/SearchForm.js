import React , { Component } from 'react'
import 
{
Row,
Col,
Form, 
Input, 
InputNumber,
DatePicker,
Select,
Button,
} from 'antd'

import moment from 'moment'

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const PropTypes = React.PropTypes;
class WrapItem extends Component{

    constructor(props){
        super(props)
        const { length } = this.props;
        this.formItemLayout = {
            labelCol: { span: 6  },
            wrapperCol: { span: 16 , offset : 2 },
        };
    }

    render(){
        return (
            <Col span={6}>
                <FormItem
                    {...this.formItemLayout} 
                    key={this.props.formKey}  
                    label={this.props.label}
                >
                    {this.props.children}                   
                </FormItem>
            </Col>
        )
    }
}

class SearchForm extends Component{

    static propTypes = {
        options : PropTypes.array
    }

    constructor(props){
        super(props);
        this.formDate = 'YYYY/MM/DD';
    };

    /*  检验规则
    **  @params text 提示信息 必选项的label
    */
    rules = (text)=>({
        rules : [
            { required: true, message: `${text}是必填项!`},
        ]
    })

    formPost = (e)=>{
        e.preventDefault();
        const self = this
        this.props.form.validateFields(
            (err,values)=>{
                if(!err){
                    const { options } = this.props;
                    let params = {...values};
                    for (let [key,value] of Object.entries(params)){
                        if(value && typeof value === 'object' && !value.length){
                            params[key] = value.format(self.formDate);
                        }
                    }
                    this.props.submit(params)
                    this.props.bindData(values)
                }
            }
        )
    }

    clearParams = ()=>{
        this.props.form.resetFields()
    }

    render(){
        const { options , loading } = this.props;
        const { getFieldDecorator } = this.props.form;
        const length = options.length;
        console.log(length)
        const view  = options.map((value,index)=>{
            const isRequire = value.isRequire ? true : false;
            let tmp = null;
             switch(value.type){
                case 'text':
                    tmp = <WrapItem 
                            formKey={value.key}
                            label={value.label}
                            key={`search::${index}`}
                            length={length}>
                            {getFieldDecorator(
                                value.key,
                                isRequire ? this.rules(value.label) : null,
                            )(
                            <Input placeholder={`请输入${value.label}`} />
                            )}
                        </WrapItem>
                break;
                case 'number':
                    tmp = <WrapItem label={value.label} key={`search::${index}`} length={length}>
                        {getFieldDecorator(
                            value.key,
                            isRequire ? this.rules(value.label) : null,
                        )(
                        <InputNumber placeholder={`请输入${value.label}`} />
                        )}
                    </WrapItem>
                break;
                case 'select':
                    const option = values.data.map((v,index)=>{
                        return <Option key={`options::index`} value={v.key}>{v.value}</Option>
                    });
                    tmp = <WrapItem label={value.label} key={`search::${index}`} length={length}>
                        {getFieldDecorator(
                            value.key,
                            isRequire ? this.rules(value.label) : null,
                        )(
                        <Select allowClear={true}>
                            {option}
                        </Select>
                        )}
                    </WrapItem>
                break;
                case 'date':
                     tmp = <WrapItem label={value.label} key={`search::${index}`} length={length}>
                            {getFieldDecorator(
                                value.key,
                                isRequire ? this.rules(value.label) : null,
                            )(
                            <DatePicker />
                            )}
                        </WrapItem>
                break;
                case 'range':
                     tmp = <WrapItem label={value.label} key={`search::${index}`} length={length}>
                            {getFieldDecorator(
                                value.key,
                                isRequire ? this.rules(value.label) : null,
                            )(
                            <RangePicker />
                            )}
                        </WrapItem>
                break;
            };
            return tmp;
        });

        return  <Form onSubmit={this.formPost}>
                    <Row gutter={40}>
                        {view}
                    </Row>
                    <Row>
                        <Col style={{textAlign:'right'}}>             
                            <Button htmlType='submit' type='primary' loading={loading}>
                                搜索
                            </Button>
                            <Button type='default' onClick={this.clearParams}>
                                清空
                            </Button>
                        </Col> 
                    </Row>
                </Form>         

    }
};

const options = {

    mapPropsToFields(props) {

        let fields = {...props};
        // const { options } = props
        // const dateFields = options.filter((v)=>{return v.type==='date'})
        // dateFields.forEach((v,i)=>{
        //     fields[v.key].value = fields[v.key].value ? moment(fields[v.key].value) : null; 
        // })
        return fields

    },
}

const WrapSearch = Form.create(options)(SearchForm)

class Search extends Component{
    constructor(props){
        super(props)
        const { options } = props;
        let obj = {};
        for (let v of Object.values(options)){
            obj[v.key]= {
                value :null
            }
        };

        this.state = {
            fields : obj
        }
    }

    bindData = (data)=>{

        let fields = {};
        for (let [key,v] of Object.entries(data)){
            fields[key]= {
                value :v
            }
        };

        this.setState({
            fields
        })
    }

    render(){
        const { options ,submit} = this.props
        return <div>
            <WrapSearch
            options={options}
            {...this.state.fields}
            submit={submit}
            bindData={this.bindData}
            />
        </div>
    }
}

export default Search

