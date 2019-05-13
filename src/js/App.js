import React, { Component } from 'react';
import { Router,Route,hashHistory,IndexRoute} from "react-router"
import MediaQuery from 'react-responsive';
import PcIndex from './components/pc_index'
import Shehui from './components/pc_shehui'
import Ucenter from './components/ucenter'
import PcDeatil from './components/pc_detail'
import MIndex from './components/m_index'

export default class App extends Component{
	render(){
		return(
			<div>
				<MediaQuery query="(min-device-width: 1224px)">
					<Router history={hashHistory}>
						<Route path="/" component={PcIndex}></Route>
						<Route path="/detail/:uniquekey" component={PcDeatil}></Route>
						<Route path="/ucenter" component={Ucenter}></Route>
						<Route path="/shehui" component={Shehui}></Route>
					</Router>
					
				</MediaQuery>
				<MediaQuery query="(max-device-width: 1224px)">
					<MIndex />
				</MediaQuery>
				
			</div>
		)
	}
}