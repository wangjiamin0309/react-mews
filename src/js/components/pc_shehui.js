import React, { Component } from 'react';
import PcHeader from './pc_header'
import PcFooter from './pc_footer'
import PcContent from './pc_content'
export default class Shehui extends Component{
	
	render(){
		return(
			<div>
				
				
					<PcHeader />
					<PcContent/>
					<PcFooter/>
			</div>
		)
	}
}