import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {Carousel, Button,Select,Input,Spin,Icon,Upload } from 'antd';
import {uploadFile} from '../../actions/common'
import {getSwiperImgList,updateSwiperImgList} from '../../actions/market';
import {SERVER} from '../../constants/common'

const Option = Select.Option;

class AdminMarketSwiper extends React.Component {

  constructor(props){
    super(props)
    const {swiperImgList} = this.props;
    this.state = {
      swiperImgList,
      curRemoveImg:0,
      fileList:[]
    }
  }

  componentDidMount(){
    this.props.getSwiperImgList();
  }

   componentWillReceiveProps(nextProps){
    const {swiperImgList} = nextProps;
    this.setState({
      swiperImgList
    })
  }


  removeSwiperImg = ()=>{
    let {swiperImgList,curRemoveImg} = this.state;
    swiperImgList.splice(curRemoveImg,1);
    this.setState({
       swiperImgList
    })
  }

  updateSwiperImgList = ()=>{
    const {swiperImgList} = this.state;
    this.props.updateSwiperImgList(swiperImgList);
  }
    
  uploadFile = ()=>{
    const {fileList} = this.state;
    this.props.uploadFile(fileList[0],"新建文件",(tmpImg)=>{
      this.setState(({swiperImgList})=>{
        swiperImgList.push(tmpImg);
        return {
          swiperImgList
        }
      })
    })
  }
  

  render() {
    const {swiperImgList} = this.state;
    const {uploadFileStatus,getSwiperImgListStatus,updateSwiperImgListStatus} = this.props;
    const uploadProps = {
      action:SERVER+'/upload/uploadFile',
      onRemove: (file) => {
        this.setState(({ fileList }) => {
          return {
            fileList: [],
          };
        });
      },
      beforeUpload: (file) => {
        this.setState(({ fileList }) => ({
          fileList: [file],
        }));
        return false;

      },
      fileList: this.state.fileList,
    }
    return (
        <div style={styles.container}>
           <Carousel infinite>
            {swiperImgList.map((item,index) => (
              <div key={index} style={{width:400, height:200}}>
                <img
                  src={SERVER+item}
                  alt=""
                  style={{ display: 'inline-block',width:400, height:200 }}
                />
              </div>
                
            ))}
          </Carousel>
         <div style={styles.opDiv}>
            <div style={styles.line}>
               <Select style={{ width: 120 ,marginRight:10}} defaultValue={0} onChange={(val)=>{console.log(val);this.setState({curRemoveImg:val})}}>
                 {
                    swiperImgList.map((item,index)=>(
                      <Option key={index} style={{ width: 120 }} value={index}>第{index+1}张</Option>
                      )
                    )
                 }
               </Select>
               <Button onClick={()=>{this.removeSwiperImg()}}>移除</Button>
            </div>
            <div  style={styles.line}>
               <Upload {...uploadProps} >
                <Button style={{ width: 120 }}>
                  <Icon type="upload" />选择文件
                </Button>
              </Upload>
              <Button onClick={()=>{this.uploadFile()}}>上传</Button>
            </div>
            <div style={styles.line}>
              <Button type="primary" onClick={()=>{this.updateSwiperImgList()}}>保存修改</Button>
            </div>
          </div>

          <Spin style={{position:'absolute',top:"50%",left:'50%',zIndex:1000}} tip="loading" 
              spinning={this.props.uploadFileStatus==="doing" || this.props.getSwiperImgListStatus==="doing" || this.props.updateSwiperImgListStatus==='doing'}/>
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
  opDiv:{
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
  const {uploadFileStatus} = state.common;
  const swiperImgList = state.market.swiperImgList || [];
  const {getSwiperImgListStatus,updateSwiperImgListStatus} = state.market;
    return {
      uploadFileStatus,
       swiperImgList,
       getSwiperImgListStatus,
       updateSwiperImgListStatus
    }
}

function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({getSwiperImgList,updateSwiperImgList,uploadFile}, dispatch);
  return {
    ...actions
  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminMarketSwiper) 