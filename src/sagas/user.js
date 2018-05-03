import { put,takeLatest, call } from 'redux-saga/effects';
import * as Request from '../utils/Request';

import {
  LOGIN_OUT_REQUEST,LOGIN_IN_REQUEST,
  UPDATE_USER_REQUEST,GET_USER_REQUEST,DELETE_USER_REQUEST,
  } from '../constants/user'

import * as UserActionCreators from '../actions/user';
import * as CommonActionCreators from '../actions/common';


export function* loginIn({phoneCode,phoneNumber,password,callback}){
  try {
    const jsonStr = JSON.stringify({
      phoneCode,
      phoneNumber,
      password
    });
    const {data} = yield call(Request.request, '/user/loginIn','post',{'Content-Type': 'application/json;charset=utf-8'},jsonStr);
    const userInfo = data.userInfo;
    callback && callback(userInfo);
    yield put(UserActionCreators.loginInSuccess(userInfo));
  } catch (error) {
    yield put(UserActionCreators.loginInFail());
  }
}

export function* loginOut({userId,callback}){
  try {
    const jsonStr = JSON.stringify({
      userId
    });
    yield call(Request.request, '/user/loginOut','post',{},jsonStr);
    try {
      callback && callback();

    }catch(error){

    }
  } catch (error) {

  }
}

export function* getUser({userId}){
  try {
    const {data} = yield call(Request.request, `/user/get/${userId}`,'get',{});
    const userInfo = data.userInfo;
    yield put(UserActionCreators.getUserSuccess(userInfo));

  } catch (error) {
    yield put(UserActionCreators.getUserFail());
  }
}


export function* updateUser({userId,userInfo,successNav}){
  try {
    const jsonStr = JSON.stringify({
      userId,
      ...userInfo
    });
    const {data} = yield call(Request.request, "/user/update",'post',{'Content-Type': 'application/json;charset=utf-8'},jsonStr);
    yield put(UserActionCreators.updateUserSuccess(userInfo));
    yield put(CommonActionCreators.navigate('UserInfo')); //跳转
   
  } catch (error) {
    yield put(UserActionCreators.updateUserFail());
  }
}



export function* watchUserRequest(getState) {
  yield takeLatest(LOGIN_IN_REQUEST, loginIn);
  yield takeLatest(LOGIN_OUT_REQUEST, loginOut);
  
  yield takeLatest(GET_USER_REQUEST, getUser);
  yield takeLatest(UPDATE_USER_REQUEST, updateUser);

}