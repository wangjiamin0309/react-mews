import React, { Component } from 'react';
import { Row, Col,Carousel,Tabs,Button   } from 'antd';
import Carousel_1 from '../../images/carousel_1.jpg'
import Carousel_2 from '../../images/carousel_2.jpg'
import PcNewsBlock from './pc_news_block'
import PcProduct from './pc_product'
export default class PcContent extends Component{
	
	render(){
		const TabPane = Tabs.TabPane;
		return(
			<div>
				<Row>
					<Col span={2}></Col>
					<Col span={20} className="container">
						<div className="leftContainer">
						<Button type="primary">Primary</Button>
                            <div className="carousel"  >
                                <Carousel autoplay dots>
                                    <div><img src={Carousel_1} /></div>
                                    <div><img src={Carousel_2} /></div>
                               	</Carousel>	
                            </div> 
                            <PcNewsBlock type="guoji" count={5}/>
                        </div>
                         <div className="tab-news">
                         	<Tabs defaultActiveKey="1" border="false">
							    <TabPane tab="头条" key="1">
							    	 <PcNewsBlock type="junshi" count={22}/>
							    </TabPane>
							    <TabPane tab="国际" key="2">
	                                <PcNewsBlock count={22} type="guoji" width="100%" border="false" />
	                            </TabPane>
	                            <TabPane tab="科技" key="3">
	                                <PcNewsBlock count={22} type="keji" width="100%" border="false" />
	                            </TabPane>
	                            <TabPane tab="体育" key="4">
	                                <PcNewsBlock count={22} type="tiyu" width="100%" border="false" />
	                            </TabPane>
	                            <TabPane tab="娱乐" key="5">
	                                <PcNewsBlock count={22} type="yule" width="100%" border="false" />
	                            </TabPane>
						  </Tabs>
                         </div>
                         <div className="area-sub">
                         	 <Tabs  >
							    <TabPane tab="ReactNews网易产品" key="1">
							    	<PcProduct/>
							    </TabPane>
							   
							</Tabs>
                         </div>
					</Col>
					<Col span={2}></Col>
				</Row>
				
			</div>
		)
	}
}