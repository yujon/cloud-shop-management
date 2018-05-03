import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {Icon, Button,Select,Input,Spin } from 'antd';
import {getSetting,updateSetting} from '../../actions/setting';
const Option = Select.Option;

class AdminSetting extends React.Component {

  constructor(props){
    super(props)
    const {distributionLevel,distributionRatio} = this.props.settingInfo;
    this.state = {
      newLevel:distributionLevel || '3',
      newRatio:distributionRatio? distributionRatio.join('|'):'5|3|2'
    }
  }

  componentDidMount(){
    this.props.getSetting();
  }

   componentWillReceiveProps(nextProps){
    const {distributionLevel,distributionRatio} = nextProps.settingInfo;
    this.setState({
      newLevel:distributionLevel || '3',
      newRatio:distributionRatio? distributionRatio.join('|'):'5|3|2'
    })
  }


  updateSetting = ()=>{
    const {newLevel,newRatio} = this.state;
    const tempArr = newRatio.split('|');
    let sum = 0;
    if(tempArr.length < newLevel){
      alert('分销比例设置与分销层级不匹配');
      return;
    }
    const distributionRatio = tempArr.slice(0,newLevel);
    distributionRatio.map((item) => {
      let ratio =  parseInt(item);
      sum += ratio;
      return ratio;
    })
    if(sum != 10){
      alert('分销比例之和应该为10');
      return;
    }
  
    this.props.updateSetting({
      distributionLevel:newLevel,
      distributionRatio
    })
  }

  render() {
    const {newLevel,newRatio} = this.state;
    const allowDistributionLevel = [1,2,3];
    return (
        <div>
           <div style={styles.line}>
             <span style={styles.label}>分销层级</span>
              <Select value={newLevel} style={{ width: 120 }} onChange={(value)=>{this.setState({newLevel:value})}} style={styles.rightInput}>
                {
                  allowDistributionLevel.map((level,index)=>{
                    return (
                      <Option key={index} value={level}>{level}</Option>
                    )
                  })
                }
              </Select>
           </div>
           <div style={styles.line}>
             <span style={styles.label}>分销比例</span>
             <Input placeholder="用|分隔" value={newRatio} style={styles.rightInput}
                  onChange={(e)=>this.setState({newRatio:e.target.value})}/>
           </div>
           <div style={styles.line}>
             <Button onClick={this.updateSetting}>提交</Button>
           </div>
            <Spin style={{position:'absolute',top:"50%",left:'50%',zIndex:1000}} tip="loading" 
              spinning={this.props.getSettingStatus==="doing" || this.props.updateSettingStatus==='doing'}/>
        </div>
    );
  }
}

const styles= {
  line:{
    marginTop:20
  },
  label:{
    marginRight:10,
  },
  rightInput:{
    width:200
  }
}


function mapStateToProps(state) {
  const settingInfo = state.setting.settingInfo || {};
  const {getSettingStatus,updateSettingStatus} = state.setting;
    return {
       settingInfo,
       getSettingStatus,
       updateSettingStatus
    }
}

function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({getSetting,updateSetting}, dispatch);
  return {
    ...actions
  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminSetting) 