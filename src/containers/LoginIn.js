import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {loginIn} from '../actions/user';

import { Form, Icon, Input, Button, Spin} from 'antd';
const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class LoginForm extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      phoneCode:'86',
      phoneNumber:'',
      password:''
    }
  }

  componentWillMount() {
    sessionStorage.removeItem('userId')
    this.checkLoginState();
  }

  componentDidMount() {
    this.props.form.validateFields();
  }

  componentWillReceiveProps(nextProps){
    this.checkLoginState()
  }


  checkLoginState(type){
    const userId = sessionStorage.getItem('userId')
    const {history} = this.props;
     if(userId){
        history.push('/web-admin/index');
        return;
     }
  }

  handleSubmit(e){
    const {phoneCode} = this.state;
    const {history} = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.loginIn(phoneCode,values.phoneNumber,values.password,(userInfo)=>{
          sessionStorage.setItem('userId',userInfo._id);
          sessionStorage.setItem('role',userInfo.role);
          history.push('/web-admin/index')
        })
      }
    });
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const phoneNumberError = isFieldTouched('phoneNumber') && getFieldError('phoneNumber');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    return (
        <div className="login-bg">
            <div className='login-div'>
              <Form layout="inline" onSubmit={this.handleSubmit} className='login-form'>
                <FormItem
                  validateStatus={phoneNumberError ? 'error' : ''}
                  help={phoneNumberError || ''}
                >
                  {getFieldDecorator('phoneNumber', {
                    rules: [{ required: true, message: 'Please input your account name!' }],
                  })(
                    <Input prefix={<Icon type="user" style={{ fontSize: 11 }} />} placeholder="Account" />
                  )}
                </FormItem>
                <FormItem
                  validateStatus={passwordError ? 'error' : ''}
                  help={passwordError || ''}
                >
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                  })(
                    <Input prefix={<Icon type="lock" style={{ fontSize: 15 }} />} type="password" placeholder="Password" />
                  )}
                </FormItem>
                <FormItem>
                      <Button
                        type="primary"
                        htmlType="button"
                        disabled={hasErrors(getFieldsError())}
                        onClick={this.handleSubmit.bind(this)}
                      >
                        登录
                      </Button>
                </FormItem>
              </Form>
            </div>
            <Spin style={{position:'absolute',top:"50%",left:'50%',zIndex:1000}} spinning={this.props.loginInStatus==="doing"} tip="loading" />
        </div>
    );
  }
}


function mapStateToProps(state) {
  const {loginInStatus} = state.user;
    return {
       loginInStatus
    }
}

function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({loginIn}, dispatch);
  return {
    ...actions
  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Form.create()(LoginForm)) //经过 Form.create 包装的组件将会自带 this.props.form 属性