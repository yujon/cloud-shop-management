import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {Icon, Button } from 'antd';

class AdminIndex extends React.Component {

  constructor(props){
    super(props)
    this.state = {
    }
  }

  render() {
    return (
        <div>
            欢迎使用云店管理系统
        </div>
    );
  }
}


function mapStateToProps(state) {
    return {
       
    }
}

function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({}, dispatch);
  return {
    ...actions
  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminIndex) //经过 Form.create 包装的组件将会自带 this.props.form 属性