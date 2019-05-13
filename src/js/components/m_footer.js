import React, { Component } from 'react';
import {Row, Col,Menu} from 'antd';
export default class PcFooter extends Component{
	
	render(){
		return(
			<div>
				<Row>
					<Col span={2}></Col>
					<Col span={20} className="footer">
						 &copy;&nbsp;2016 ReactNews. All Rights Reserved.
					</Col>
					
					<Col span={2}></Col>
					
				</Row>
			</div>
		)
	}
}