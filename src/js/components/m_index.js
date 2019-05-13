import React, { Component } from 'react';

import Mheader from './m_header'
import MFooter from './m_footer'

export default class PcIndex extends Component{
	render(){
		return(
			<div>
				<Mheader />
				<MFooter/>
			</div>
		)
	}
}