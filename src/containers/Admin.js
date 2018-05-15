import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Link,Route } from 'react-router-dom';

import { Layout, Menu, Switch, Breadcrumb, Icon, Button } from 'antd';
import {loginOut} from '../actions/user';

import AdminIndex from './admin/AdminIndex';
import AdminSetting from './admin/AdminSetting';
import AdminMarketSwiper from './admin/AdminMarketSwiper';
import AdminMarketHotCase from './admin/AdminMarketHotCase';
import AdminMarketSpecialActivity from './admin/AdminMarketSpecialActivity';

const {SubMenu} = Menu;
const {Header, Content, Sider, } = Layout;

const siderMenus = {
  subMenus:[
    {
      name:'系统',
      icon:'medicine-box'
    },
     {
      name:'用户管理',
      icon:'user'
    },
     {
      name:'店铺管理',
      icon:'medicine-box'
    },
     {
      name:'商品管理',
      icon:'medicine-box'
    },
     {
      name:'货源市场',
      icon:'schedule'
    },
    {
      name:'数据分析',
      icon:'calculator'
    }
  ],
  items:[
    [
      {
        name:'分销设置',
        url:'/web-admin/setting',
        role:1
      }
    ],
    [
      {
        name:'管理员管理',
        url:'/web-admin/user/manager',
        role:0
      },
      {
        name:'用户管理',
        url:'/web-admin/user/',
        role:1
      }
    ],
    [
      {
        name:'基本管理',
        url:'/web-admin/shop/basic',
        role:1
      },
      {
        name:'店铺认证',
        url:'/web-admin/user/manager',
        role:1
      }
    ],
    [
      {
        name:'基本管理',
        url:'/web-admin/commodity/basic',
        role:1
      },
      {
        name:'分类管理',
        url:'/web-admin/commodity/category',
        role:1
      }
    ],
    [
      {
        name:'首页轮播图',
        url:'/web-admin/market/swiper',
        role:1
      },
      {
        name:'爆款',
        url:'/web-admin/market/hotCase',
        role:1
      },
       {
        name:'活动',
        url:'/web-admin/market/specialActivity',
        role:1
      },
      {
        name:'分类管理',
        url:'/web-admin/market/category',
        role:1
      }
    ],
    [
      {
        name:'店铺统计',
        url:'/web-admin/statistics/data',
        role:1
      },
      {
        name:'商品统计',
        url:'/web-admin/statistics/rank',
        role:1
      }
    ]
  ]
}

class Admin extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      renderItems:[],
      selectedSubMenu: 0,
      selectedItemName : '首页',
      selectedParentItemName:'系统',
      userId:"",
      role:2, // 普通用户
    }
  }

  componentWillMount(){
    const userId = sessionStorage.getItem('userId');
    const role = sessionStorage.getItem('role');
    const {history} = this.props;
    if(!userId || !role){
      history.push('/web-loginIn')
    }
    this.setState({
      userId:userId,
      role:parseInt(role)
    });
  }

  componentDidMount(){
    this.getSideMenuData();
  }

  getSideMenuData(){
    var items = siderMenus.items;
    var subMenus= siderMenus.subMenus;
    var renderItems = [];
    var index = 0;
    for(var i=0;i<items.length;i++){
      var tempArr = [];
        for(var j=0;j<items[i].length;j++){
            if(items[i][j].role >= this.state.role){ //有权限
              tempArr.push(
                <Menu.Item key={index++}><Link to={items[i][j].url}>{items[i][j].name}</Link></Menu.Item>
              )
            }
        }
        renderItems.push(
            <SubMenu key={i} title={<span><Icon type={subMenus[i].icon} />{subMenus[i].name}</span>}>
              {tempArr}
            </SubMenu>
          )
    }
    this.setState({
      renderItems,
    })
  }

  onClickMenu(obj){
    var newKey = parseInt(obj.key);
    var index = 0;
    var selectedItemName,selectedParentItemName;
    var subMenus = siderMenus.subMenus;
    var items = siderMenus.items;
    var out = false;
    for(var i=0;i<items.length;i++){
       for(var j=0;j<items[i].length;j++){
          if(index == newKey){
            selectedParentItemName = subMenus[i].name;
            selectedItemName = items[i][j].name;
            out = true;
            break;
           }
           index++;
       }
      if(out){
          break;
      }
  }
    this.setState({
      selectedParentItemName,
      selectedItemName,
      selectedSubMenu:obj.keyPath[1],
    });
  }

  onLayout(){
    const {history} = this.props;
    const {userId} = this.state;
    this.props.loginOut(userId,()=>{
      sessionStorage.rmeoveItem('userId');
      sessionStorage.removeItem('userRole');
      history.push('/web-loginIn');
    });
  }


  render() {
    const {renderItems} = this.state;
    return (
      <div className='admin-wrap'>
                <Layout>
                  <Header className="header" style={{height:'80px'}}>
                    <span className="logo" >云店管理平台</span>
                    <Menu
                      theme="dark"
                      mode="horizontal"
                      defaultSelectedKeys={[]}
                      style={{ lineHeight: '80px' },{float:'right'}}
                      onClick={this.onLayout.bind(this)}
                    >
                      <Menu.Item key="1" style={{ lineHeight: '80px' }} >登录</Menu.Item>
                      <Menu.Item key="2" style={{ lineHeight: '80px' }} >退出</Menu.Item>
                    </Menu>
                  </Header>
                  <Layout>
                      <Sider width={250}  style={{ overflow: 'auto' }}>
                        <Menu
                          mode="inline"
                          theme="dark"
                          defaultSelectedKeys={[]}
                          defaultOpenKeys={[]}
                          style={{ height: '100%' }}
                          onClick={this.onClickMenu.bind(this)}
                        >
                        {renderItems}
                        </Menu>
                      </Sider>
                      <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '12px 0' }}>
                          <Breadcrumb.Item>{this.state.selectedParentItemName}</Breadcrumb.Item>
                          <Breadcrumb.Item>{this.state.selectedItemName}</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content style={{ background: '#fff', padding: 24, margin: 0}}>
                          <Route exact path='/web-admin/index' component={AdminIndex}></Route>  
                          <Route exact path='/web-admin/setting' component={AdminSetting}></Route>  
                          <Route exact path='/web-admin/market/swiper' component={AdminMarketSwiper}></Route>  
                          <Route exact path='/web-admin/market/hotCase' component={AdminMarketHotCase}></Route> 
                          <Route exact path='/web-admin/market/specialActivity' component={AdminMarketSpecialActivity}></Route> 
                        </Content>
                      </Layout>
                    </Layout>
                </Layout>
            </div>
    )
  }
}


function mapStateToProps(state) {
    return {
       
    }
}

function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({loginOut}, dispatch);
  return {
    ...actions
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin)