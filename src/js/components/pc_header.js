import React, { Component } from 'react';
import {Link} from "react-router"
import {
		Row,
		Col,
		Menu,
		Icon,
		Tabs,
		message,
		Form,
		Input,
		Button,
		CheckBox,
		Modal 
} from 'antd';
import Logo from '../../images/logo.png';

const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;
class PcHeader extends Component{
	constructor(){
		super();
		this.state={
			current:'top',
			modalVisible: false,
			action: 'login',
			hasLogined: false,
			userNickName: '',
			userid: 0
		}
	}
	
	componentWillMount(){
		if(localStorage.userid!=''){
			this.setState({
				hasLogined:true,
				userNickName:localStorage.userNickName,
                userid:localStorage.userid
			})
		}
	}
	//导航
	handleClick(e){
		if (e.key == "register") {
			this.setState({current: 'register'});
			this.setModalVisible(true);
		} else {
			{
				this.setState({current: e.key});
			}
		}
	}
	//模态框
	handleOk(e){
		 this.setState({
	      modalVisible: false,
	    });
	}
	handleCancel(e){
		 this.setState({
	      modalVisible: false,
	    });
	}
	//模态显示
	setModalVisible(value)
	{
		this.setState({modalVisible: value});
	};
	//选显卡
	callback(key){
		//console.log(key);
		if(key==1){
			this.setState({
				action: 'login'
			})
		}else if(key==2){
			this.setState({
				action: 'register'
			})
		}
	}
	
	//登陆表单
	handleSubmit(e){
		 e.preventDefault();
		 this.props.form.validateFields((err, values) => {
	      if (!err) {
	        console.log(values);
	        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
				+ "&username="+values.userName+"&password="+values.password+"&r_userName=" + values.r_userName + "&r_password="
				+ values.r_password + "&r_confirmPassword="
				+ values.r_confirmPassword)
				.then((res)=>{
					return res.json()
				})
				.then((data)=>{
					//console.log(data,this.state.action)
					
					this.setState({
						userNickName: data.NickUserName, 
						userid: data.UserId
					})
					localStorage.userid = data.UserId;
       				localStorage.userNickName = data.NickUserName;
				})
				message.success("请求成功！");
				this.setModalVisible(false);
				if (this.state.action=="login") {
					this.setState({hasLogined:true});
				}
//				
				
			
	      }
	    });
	}
	//推出登陆
	logout(){
		localStorage.userid = '';
        localStorage.userNickName = '';
		this.setState({
			hasLogined:false
		})
	}
	
	render(){
		const {getFieldDecorator} = this.props.form;
		
		
		const userShow = this.state.hasLogined
		?
		<Menu.Item key="logo" > 
			<Button className="logos" type="primary" htmlType="button">{this.state.userNickName}</Button>
					&nbsp;&nbsp;
					<Link target="_blank" to="/ucenter" className="logos">
						<Button  type="dashed" htmlType="button">个人中心</Button>
					</Link>
					&nbsp;&nbsp;
			<Button className="logos" type="ghost" htmlType="button" onClick={this.logout.bind(this)} >退出</Button>			
		</Menu.Item>
		:
		<Menu.Item key="register" >
			<Icon type="appstore"/>注册/登录
		</Menu.Item>;
		return(
			<div>
				<Row>
					<Col span={2}></Col>
					<Col span={4} className="logo">
						<Link to="/">
							<img src={Logo} />
							<span>NewRouter</span>
						</Link>
					</Col>
					<Col span={16}>
						<Menu mode="horizontal"  selectedKeys={[this.state.current]} onClick={this.handleClick.bind(this)}>
					        <Menu.Item key="top">
					        	<Link to={`/`}>
					        		<Icon type="appstore"/>头条
					        	</Link>
								
							</Menu.Item>
							<Menu.Item key="shehui">
								<Link to={`/shehui`}>
					        		<Icon type="appstore"/>社会
					        	</Link>
								
							</Menu.Item>
							<Menu.Item key="guonei">
								<Icon type="appstore"/>国内
							</Menu.Item>
							<Menu.Item key="guoji">
								<Icon type="appstore"/>国际
							</Menu.Item>
							<Menu.Item key="yule">
								<Icon type="appstore"/>娱乐
							</Menu.Item>
							<Menu.Item key="tiyu">
								<Icon type="appstore"/>体育
							</Menu.Item>
							<Menu.Item key="keji">
								<Icon type="appstore"/>科技
							</Menu.Item>
							<Menu.Item key="shishang">
								<Icon type="appstore"/>时尚
							</Menu.Item>	
							{userShow}
					    </Menu>
					    
					    <Modal
				          title="Basic Modal"
				          visible={this.state.modalVisible}
				          onOk={this.handleOk.bind(this)}
				          onCancel={this.handleCancel.bind(this)}
				        >
				          <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)} >
						    <TabPane tab="登录" key="1">
						    	 <Form horizontal="true" onSubmit={this.handleSubmit.bind(this)}>
									<FormItem label="账户">
										{getFieldDecorator('username')(
								            <Input  placeholder="请输入您的账号" />
								        )}
										
									</FormItem>
									<FormItem label="密码">
										{getFieldDecorator('userpass')(
								            <Input type="password" placeholder="请输入您的密码" />
								        )}
										
									</FormItem>
									<Button type="primary" htmlType="submit">登录</Button>
								</Form>
						    </TabPane>
						    <TabPane tab="注册" key="2">
						   	 	<Form horizontal="true" onSubmit={this.handleSubmit.bind(this)}>
									<FormItem label="账户">
										{getFieldDecorator('r_userName')(
								            <Input  placeholder="请输入您的账号" />
								        )}
									</FormItem>
									<FormItem label="密码">
										{getFieldDecorator('r_password')(
								            <Input type="password" placeholder="请输入您的密码" />
								        )}
									</FormItem>
									<FormItem label="再次输入密码">
										{getFieldDecorator('r_confirmPassword')(
								            <Input type="password" placeholder="请输入您的密码" />
								        )}
									</FormItem>
									<Button type="primary" htmlType="submit">注册</Button>
								</Form>
						    </TabPane>
						  
						  </Tabs>,
				        </Modal>
					    
					</Col>
					<Col span={2}></Col>
					
				</Row>
			</div>
		)
	}
}
export default PcHeader = Form.create({})(PcHeader);