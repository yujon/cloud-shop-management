import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {Button,Select,Spin,Icon } from 'antd';
import {getHotCaseList,updateHotCaseList} from '../../actions/market';
import {getCommodityList} from '../../actions/commodity';
import {SERVER} from '../../constants/common'

const Option = Select.Option;

class AdminMarketHotCase extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      tempHotCaseList:[]
    }
  }

  componentDidMount(){
    this.props.getCommodityList();
    this.props.getHotCaseList();
  }

  updateHotCaseList = ()=>{
    const {tempHotCaseList} = this.state;
    let realHotCaseList = [];
    tempHotCaseList && tempHotCaseList.forEach((hotCase) => {
      let temp = hotCase.split('|');
      realHotCaseList.push({
        shopId:temp[0],
        commodityId:temp[1]
      })
    })
    this.props.updateHotCaseList(realHotCaseList);
  }

  render() {
    const {tempHotCaseList} = this.state;
    const {hotCaseList,commodityList,getHotCaseListStatus,updateHotCaseListStatus} = this.props;
    let defaultValue = [];
    hotCaseList.forEach((hotCaseItem)=>{
      defaultValue.push(`${hotCaseItem.shopId}|${hotCaseItem.commodityId}`)
    })
    return (
      <div style={styles.container}>
        <div style={styles.addDiv}>
            <div style={styles.line}>
               <Select  mode="multiple" size="default" placeholder="Please select"  style={{ width: '100%' }}
               value={tempHotCaseList.length?tempHotCaseList:defaultValue} onChange={(list)=>{this.setState({tempHotCaseList:list})}}>
                {
                    commodityList.map((commodity)=>{
                      return(
                         <Option key={`${commodity.shopId}|${commodity._id}`}>{`${commodity.shopName}|${commodity.name}`}</Option>
                      )
                    })
                }
              </Select>
            </div>
            <div style={styles.line}>
              <Button type="primary" onClick={()=>{this.updateHotCaseList()}}>添加保存</Button>
            </div>
          </div>

          <Spin style={{position:'absolute',top:"50%",left:'50%',zIndex:1000}} tip="loading" 
              spinning={this.props.getHotCaseListStatus==="doing" || this.props.updateHotCaseListStatus==='doing'}/>
      </div>
    );
  }
}

const styles= {
  container:{
    width:"100%",
    height:'100%',
    position:'relative'
  },
  addDiv:{
    width:400,
    height:300,
    position:'absolute',
    top:"50%",
    left:'50%',
    marginTop:100,
    marginLeft:-200
  },
  line:{
    marginTop:20,
    textAlign:'center'

  },
  label:{
    marginRight:10,
  },
  rightInput:{
    width:200
  }
}


function mapStateToProps(state) {
  const hotCaseList = state.market.hotCaseList || [];
  const {getHotCaseListStatus,updateHotCaseListStatus} = state.market;
  const commodityList = state.commodity.commodityList || [];
    return {
       hotCaseList,
       commodityList,
       getHotCaseListStatus,
       updateHotCaseListStatus
    }
}

function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({getHotCaseList,updateHotCaseList,getCommodityList}, dispatch);
  return {
    ...actions
  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminMarketHotCase) 