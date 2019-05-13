import React, { Component } from 'react';
import {Link} from "react-router"
import { Row, Col, BackTop, Menu,
    Icon,
    Tabs,
    message,
    Form,
    Input,
    Button,
    CheckBox,
    Card,
    Modal,
    notification
} from 'antd';
 class Comon extends Component{
	constructor(){
		super();
		this.state={
			commons:[
				{
					Comments:'',
					UserName:'',
					datetime:''
				}
			]
		}
	}
	componentWillMount(){
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey="
            + this.props.uniquekey)
		.then((res)=>{
			return res.json()
		})
		.then((data)=>{
			//console.log(data)
			this.setState({
				commons:data
			})
		})
	}
	handleSubmit(e){
		e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	      if (!err) {
	        console.log( values);
	        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid="
            + localStorage.userid 
            + "&uniquekey="+ this.props.uniquekey 
            + "&commnet="+ values)
	        .then((res)=>{
	        	return res.json()
	        })
	        .then((data)=>{
	        	console.log(data)
	        	notification['success']({message:"ReactNews提醒",description:"新闻收藏成功！"});
	        })
	      }
	    });
	}
	//收藏
	addUserCollection(){
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid="+localStorage.userid
        +"&uniquekey="+this.props.uniquekey)
		.then((res)=>{
			return res.json()
		})
		.then((data)=>{
			console.log(data)	
		})
	}
		
	render(){
		const {
	      getFieldDecorator
	    } = this.props.form;
	    const { TextArea } = Input;
	    const comList=this.state.commons.length
	    ?	     		   
    	 this.state.commons.map((item,index)=>{
	    	return <Card style={{ width: 300 }} key={index} title={item.UserName}  extra={<a href="#">发表于{item.datetime}</a>}><p>{item.Comments}</p> </Card>
	    })		    		 	   
	    :
	    '没有评论'
		return(
			<div className="common">
				<Row>
					<Col span={2}></Col>
					<Col span={12}>
						{comList}
						<Form  onSubmit={this.handleSubmit.bind(this)}>
							<Form.Item label="输入评论" >
								 {getFieldDecorator('remark')(
						             <TextArea placeholder="随便写" autosize />
						          )}
							</Form.Item>
							<Button type="primary"  htmlType="submit" > 提交 </Button>
							 &nbsp;&nbsp;
                            <Button type="danger" htmlType="button" onClick={this.addUserCollection.bind(this)}>收藏</Button>
						</Form>
					</Col>
					<Col span={6}></Col>
				</Row>
			</div>
		)
	}
}
 export default Comon= Form.create({})(Comon);