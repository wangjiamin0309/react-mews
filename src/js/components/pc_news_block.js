import React, { Component } from 'react';
import { Row, Col ,Card } from 'antd';
import {Link} from "react-router"
import Tloader from 'react-touch-loader';
export default class PcNewsBlock extends Component{
	constructor(){
		super();
		this.state={
			new:[
				{
					title:''
				}
			],
			count:5,
			hasMore:0,
			initializing:1,
			refreshedAt:Date.now()			
		}
	}
	componentWillMount(){
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type
            + "&count=" + this.props.count)
		.then((res)=>{
			return res.json()
		})
		.then((data)=>{
			//console.log(data)
			this.setState({
				new:data
			})
		})
	}
	loaderMore(resolve){
		
		setTimeout(()=>{
            var count = this.state.count;
            this.setState({
                count:count+5,
            });
			fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type
            + "&count=" + this.state.count)
			.then((res)=>{
				return res.json()
			})
			.then((data)=>{
				//console.log(data)
				this.setState({
					new:data
				})
			})
            this.setState({
                 hasMore:count>0 && count<50,
            });
            resolve();
        },500);
	}
	 componentDidMount(){
        setTimeout(()=>{
            this.setState({
                hasMore:1,
                initializing:2       //所有的组件初始化完成
            })
        },300)
    }
	render(){
		const newLength=this.state.new.length
		?
		this.state.new.map((item,index)=>{
        	return <li key={index}><Link to={`/detail/${item.uniquekey}`}>{item.title}</Link></li>
        })
		:
		'没有数据'
		return(
			<div className="topNewsList">

	            <Tloader className="main" onLoadMore={this.loaderMore.bind(this)} 
                    hasMore={this.state.hasMore}
                    initializing={this.state.initializing}>
                        {newLength}
                </Tloader>
       	 </div>
		)
	}
}