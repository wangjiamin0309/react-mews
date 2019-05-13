import React, { Component } from 'react';
import {Link} from "react-router"
export default class PcNewsImg extends Component{
	constructor(){
		super();
		this.state={
			leftNews:[
				{
					thumbnail_pic_s:'',
					title:'',
					author_name:''
				}
			]
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
				leftNews:data
			})
		})
	}

	render(){
		const LeftNewsLists=this.state.leftNews.length
		?					
			this.state.leftNews.map((item,index)=>{
				return <li key={index}>
					<Link to={`/detail/${item.uniquekey}`} target="_blank">
						<img src={item.thumbnail_pic_s} alt={item.title}/>
						<h5>{item.title}</h5>
						<h5>{item.author_name}</h5>
					</Link>
					
				</li>				
			})					
		:
		'没有数据'
		return(
			<div>
				<ul className="leftNews">
					{LeftNewsLists}
				</ul>
			</div>
		)
	}
}