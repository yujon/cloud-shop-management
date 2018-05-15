import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {Button,Select,Spin,Icon, DatePicker,Upload} from 'antd';
import moment from 'moment';
import {getSpecialActivityList,updateSpecialActivityListItem,addSpecialActivityListItem,removeSpecialActivityListItem} from '../../actions/market';
import {getCommodityList} from '../../actions/commodity';
import {uploadFile} from '../../actions/common';
import {SERVER} from '../../constants/common';

const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

class AdminMarketSpecialActivity extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      isAdding:false,
      fileList:[],
      headImageList:[],
      startTimeList:[],
      endTimeList:[],
      selectedCommodityList:[]
    }
  }

  componentDidMount(){
    this.props.getCommodityList();
    this.props.getSpecialActivityList();
  }

  showSpecialActivitiesDiv = ()=>{
    this.setState({
      isAdding:true
    })
  }

  hideSpecialActivitiesDiv = ()=>{
    this.setState({
      isAdding:false
    })
  }

  getUploadProps = (index)=>{
    const uploadProps = {
      action:SERVER+'/upload/uploadFile',
      onRemove: (file) => {
        this.setState(({ fileList }) => {
          fileList[index] = [];
          return {
            fileList,
          };
        });
      },
      beforeUpload: (file) => {
        this.setState(({ fileList }) => {
          fileList[index] = [file];
          return {
            fileList
          }
        });
        return false;
      },
      fileList: this.state.fileList[index],
    }
    return uploadProps;
  }

  uploadFile = (index)=> {
    const {fileList,headImageList} = this.state;
    if(!fileList[index] || !fileList[index][0]){
      alert('先选择图片')
      return;
    }
    let newState = {};
    this.props.uploadFile(fileList[index][0],"新建文件",(tmpImg)=>{
      headImageList[index] = {};
      headImageList[index] = tmpImg;
      this.setState({
        headImageList
      })
    })
  }

  setDate = (index,moments) =>{
    const {startTimeList,endTimeList} = this.state;
    startTimeList[index] = moments[0];
    endTimeList[index] = moments[1];
    this.setState({
      startTimeList,
      endTimeList
    })
  }

  setSelectedCommodityList = (index,list)=>{
    const {selectedCommodityList} = this.state;
    selectedCommodityList[index] = list;
    this.setState({selectedCommodityList})
  }

  addSpecialActivityListItem = ()=>{
    const {selectedCommodityList,headImageList,startTimeList,endTimeList} = this.state;
    let specialActivityListItem = {
      startTime:startTimeList[0],
      endTime:endTimeList[0],
      headImage:headImageList[0],
      commodities:[]
    };
    selectedCommodityList[0].forEach((item) => {
      let temp = item.split('|');
      specialActivityListItem['commodities'].push({
        shopId:temp[0],
        commodityId:temp[1]
      })
    })
    this.props.addSpecialActivityListItem(specialActivityListItem,()=>{
      let newState = {};
      newState['fileList'][0] = [];
      newState['headImageList'][0] = '';
      newState['startTimeList'][0] = '';
      newState['endTimeList'][0] = '';
      newState['selectedCommodityList'][0] = [];
      this.setState(newState);
    });
  }

  updateSpecialActivityListItem = (index,specialActivityListItemId)=>{
    const {selectedCommodityList,headImageList,startTimeList,endTimeList} = this.state;
    const {specialActivityList} = this.props;
    let specialActivityListItem = {
      startTime:startTimeList[index] || specialActivityList[index-1].startTime,
      endTime:endTimeList[index] || specialActivityList[index-1].endTime,
      headImage:headImageList[index] || specialActivityList[index-1].headImage,
      commodities:[]
    };
    let tmpList = [];
    selectedCommodityList[index] && selectedCommodityList[index].forEach((item) => {
      let temp = item.split('|');
      tmpList.push({
        shopId:temp[0],
        commodityId:temp[1]
      })
    })
    specialActivityListItem['commodities'] = tmpList.length? tmpList:specialActivityList[index-1].commodities;
    
    this.props.updateSpecialActivityListItem(specialActivityListItemId,specialActivityListItem,()=>{
      let newState = {};
      newState['fileList'][index] = [];
      newState['headImageList'][index] = '';
      newState['startTimeList'][index] = '';
      newState['endTimeList'][index] = '';
      newState['selectedCommodityList'][index] = [];
      this.setState(newState);
    });
  }

  render() {
    const {isAdding,selectedCommodityList,headImageList,startTimeList,endTimeList} = this.state;
    const {specialActivityList,commodityList,getSpecialActivityListStatus,updateSpecialActivityListItemStatus} = this.props;
    const addUploadProps = this.getUploadProps(0);
   console.log(selectedCommodityList)
    return (
      <div style={styles.container}>
        <div>
          <Button onClick={this.showSpecialActivitiesDiv} style={{marginRight:10}}>新建活动</Button>
          <Button onClick={this.hideSpecialActivitiesDiv}>隐藏新建</Button>
        </div>
        <div style={isAdding?styles.addDiv:styles.hide}>
            <div style={styles.line}>
              <div>
                 <img
                  src={SERVER+headImageList[0]}
                  alt=""
                  style={headImageList[0]?{ display: 'inline-block',width:400, height:200 }:{display:'none'}}
                />
              </div>
               <div >
                 <Upload {...addUploadProps} >
                  <Button style={{ width: 120,marginTop:5}}>
                    <Icon type="upload" />选择文件
                  </Button>
                </Upload>
                <Button onClick={()=>{this.uploadFile(0)}} style={{marginTop:5}}>上传</Button>
              </div>
              <RangePicker defaultValue={[startTimeList[0],endTimeList[0]]} 
                onChange={(info,comments)=>this.setDate(0,comments)} style={{marginTop:10}}></RangePicker>
              <Select  mode="multiple" size="default" placeholder="Please select"  style={{ width: '100%',marginTop:10}}
               onChange={(list)=>{this.setSelectedCommodityList(0,list)}}>
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
              <Button type="primary" onClick={()=>{this.addSpecialActivityListItem()}}>添加活动</Button>
            </div>
          </div>
          
          <div style={styles.specialActivityList}>
          { 
            specialActivityList.map((specialActivityItem,index)=>{
              let uploadProps = this.getUploadProps(index+1);
              let headImage = headImageList[index+1]?headImageList[index+1]:specialActivityItem.headImage;
              let startTime = startTimeList[index+1]?startTimeList[index+1]:specialActivityItem.startTime;
              let endTime = endTimeList[index+1]?endTimeList[index+1]:specialActivityItem.endTime;
              let defaultValue = [];
              specialActivityItem.commodities && specialActivityItem.commodities.forEach((item)=>{
                defaultValue.push(`${item.shopId}|${item.commodityId}`)
              })
              let curSelectedCommodityList = selectedCommodityList[index+1] && selectedCommodityList[index+1].length?selectedCommodityList[index+1]:defaultValue;
              return(
                <div style={styles.specialActivityDiv}>
                  <div style={{height:50,fontSize:17}}>活动{index+1}：</div>
                  <div style={styles.line}>
                    <div>
                       <img
                        src={SERVER+headImage}
                        alt=""
                        style={{ display: 'inline-block',width:400, height:200 }}
                      />
                    </div>
                     <div >
                       <Upload {...uploadProps} >
                        <Button style={{ width: 120 }}>
                          <Icon type="upload" />选择文件
                        </Button>
                      </Upload>
                      <Button onClick={()=>{this.uploadFile(index+1)}} style={{marginTop:5}}>上传</Button>
                    </div>
                    <RangePicker defaultValue={[moment(startTime),moment(endTime)]} 
                      onChange={(info,comments)=>this.setDate(index+1,comments)} style={{marginTop:10}}>
                    </RangePicker>
                     <Select  mode="multiple" size="default" placeholder="Please select"  style={{width:'100%',marginTop:10}}
                     value={curSelectedCommodityList} onChange={(list)=>{this.setSelectedCommodityList(index+1,list)}}>
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
                    <Button type="primary" onClick={()=>{this.updateSpecialActivityListItem(index+1,specialActivityItem._id)}}>保存修改</Button>
                  </div>
                </div>           
              )       
            })
          }
          </div>
          
          <Spin style={{position:'absolute',top:"50%",left:'50%',zIndex:1000}} tip="loading" 
              spinning={getSpecialActivityListStatus==="doing" || updateSpecialActivityListItemStatus==='doing'}/>
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
  hide:{
    display:'none'
  },
  addDiv:{
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
  const specialActivityList = state.market.specialActivityList || [];
  const {getSpecialActivityListStatus,updateSpecialActivityListItemStatus} = state.market;
  const commodityList = state.commodity.commodityList || [];
    return {
       specialActivityList,
       commodityList,
       getSpecialActivityListStatus,
       updateSpecialActivityListItemStatus
    }
}

function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({uploadFile,getSpecialActivityList,updateSpecialActivityListItem,addSpecialActivityListItem,removeSpecialActivityListItem,getCommodityList}, dispatch);
  return {
    ...actions
  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminMarketSpecialActivity) 