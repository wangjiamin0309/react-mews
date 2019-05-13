import React, { Component } from 'react';
import Logo from '../../images/logo.png'
export default class Mheader extends Component{
	render(){
		return(
			<div className="m_header">
				<header>
					<img src={Logo}/>
					<span>ReactNews</span>
				</header>
			</div>
		)
	}
}