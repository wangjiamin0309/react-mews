import React, { Component } from 'react';
import { Row, Col, Modal,Menu, Icon,Tabs ,Upload ,Card } from 'antd'
import PcHeader from './pc_header'
import PcFooter from './pc_footer'
export default class Ucenter extends Component{
	constructor(){
		super()
		this.state={
			 previewVisible: false,
		    previewImage: '',
		    fileList: [{
		      uid: '-1',
		      name: 'xxx.png',
		      status: 'done',
		      url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
		    }],
		    shoucang:[
		    	{
		    		uniquekey:'',
		    		Title:''
		    	}
		    ],
		    pinglun:[
		    	{
		    		Comments:'',
		    		uniquekey:''
		    	}
		    ]
		}
	}
	 handlePreview = (file) => {
	    this.setState({
	      previewImage: file.url || file.thumbUrl,
	      previewVisible: true,
	    });
	  }
	 handleCancel = () => this.setState({ previewVisible: false })
	 handleChange = ({ fileList }) => this.setState({ fileList })
	 componentWillMount(){	 	
	 	fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + localStorage.userid)
	 	.then((res)=>{
	 		return res.json()
	 	})
	 	.then((data)=>{
	 		//console.log(data)
	 		this.setState({
	 			shoucang:data
	 		})
	 	})
	 	fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + localStorage.userid)
	 	.then((res)=>{
	 		return res.json()
	 	})
	 	.then((data)=>{
	 		console.log(data)
	 		this.setState({
	 			pinglun:data
	 		})
	 	})
	 }
	render(){
		const TabPane = Tabs.TabPane;
		const { previewVisible, previewImage, fileList } = this.state;
	    const uploadButton = (
	      <div>
	        <Icon type="plus" />
	        <div className="ant-upload-text">Upload</div>
	      </div>
	    );
	    
	    
	   const usercollectionList =this.state.shoucang.length
	   ?
	   this.state.shoucang.map((item,index)=>{
	    	return  <Card
				     key={index}
				      title={item.uniquekey}
				      extra={<a href={`/#/detail/${item.uniquekey}`}>查看</a>}
				    >
				      {item.Title}
				    </Card>
	   })	   
	   :
	   '您还没有收藏任何的新闻，快去收藏一些新闻吧!'
	   
	    const usercomments  =this.state.pinglun.length
	   ?
	   this.state.pinglun.map((item,index)=>{
	    	return  <Card
				     key={index}
				     title={`于 ${item.datetime} 评论了文章 ${item.uniquekey}`}
				      extra={<a href={`/#/detail/${item.uniquekey}`}>查看</a>}
				    >
				      {item.Comments}
				    </Card>
	   })	   
	   :
	   '您还没有发表过任何评论!'
		return(
			<div>
				<PcHeader/>
				<Row>
					<Col span={2}></Col>
					<Col span={20}>
						 <Tabs defaultActiveKey="1" >
						    <TabPane tab="我的收藏列表" key="1">
						   	 {usercollectionList}
						    </TabPane>
						    <TabPane tab="我的评论列表" key="2">
						    	{usercomments}
						    </TabPane>
						    <TabPane tab="头像设置" key="3">
						    	 <div className="clearfix">
						        <Upload
						          action="http://newsapi.gugujiankong.com/handler.ashx"						           
						          listType="picture-card"
						          fileList={fileList}
						          onPreview={this.handlePreview}
						          onChange={this.handleChange}
						        >
						          {fileList.length >= 2 ? null : uploadButton}
						        </Upload>
						        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
						          <img alt="example" style={{ width: '100%' }} src={previewImage} />
						        </Modal>
						      </div>
						    </TabPane>
						  </Tabs>
					</Col>
					<Col span={2}></Col>
				</Row>
				<PcFooter/>
			</div>
        );
		
	}
}