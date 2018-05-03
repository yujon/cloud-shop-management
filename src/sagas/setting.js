import { put,takeLatest, call } from 'redux-saga/effects';
import * as Request from '../utils/Request';

import {GET_SETTING_REQUEST,UPDATE_SETTING_REQUEST} from '../constants/setting'

import * as SettingActionCreators from '../actions/setting';


export function* getSetting(){
  try {
    const {data} = yield call(Request.request, '/setting/get','get',{});
    const settingInfo = data.settingInfo;
    yield put(SettingActionCreators.getSettingSuccess(settingInfo));
  } catch (error) {
    yield put(SettingActionCreators.getSettingFail());
  }
}

export function* updateSetting({settingInfo}){
  try {
	const jsonStr = JSON.stringify({
      settingInfo
    });
    const {data} = yield call(Request.request, '/setting/update','post',{'Content-Type': 'application/json;charset=utf-8'},jsonStr);
    yield put(SettingActionCreators.updateSettingSuccess(data.settingInfo));
  } catch (error) {
    yield put(SettingActionCreators.updateSettingFail());
  }
}





export function* watchSettingRequest(getState) {

  yield takeLatest(GET_SETTING_REQUEST, getSetting);
  yield takeLatest(UPDATE_SETTING_REQUEST, updateSetting);

}