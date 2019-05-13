import React, { Component } from 'react';
import { Row, Col, BackTop } from 'antd';
import PcHeader from './pc_header'
import PcFooter from './pc_footer'
import PcNewsImg from './pc_news_img'
import Comon from './common'

export default class PcDeatil extends Component{
	constructor(){
		super();
		this.state={
			newItem:[
				{
					pagecontent:'',
					title:''
				}
			]
		}
	}
	componentDidMount(){
		
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey="
            + this.props.params.uniquekey)
		.then((res)=>{
			return res.json()
		})
		.then((data)=>{
			//console.log(data)
			this.setState({
				newItem:data
			})
			document.title = this.state.newItem.title + " - React News | React 驱动的新闻平台";
		})
	}
	 createMarkup() {
        return { __html: this.state.newItem.pagecontent };
    };
	render(){
		return(
			<div className="Detail">
				<PcHeader />					
				<Row>
					<Col span={2}></Col>
					<Col span={14}>
						<div dangerouslySetInnerHTML={this.createMarkup()} ></div>
						<Comon uniquekey={this.props.params.uniquekey}/>
					</Col>
					<Col span={6}>
						<PcNewsImg type="guoji" count={10}/>
					</Col>
					<Col span={2}></Col>
				</Row>
				
				<PcFooter/>
				<BackTop/>
			</div>
		)
	}
}