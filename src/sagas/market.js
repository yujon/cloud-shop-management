import { put, take,takeLatest, call, fork } from 'redux-saga/effects';
import * as Request from '../utils/Request';

import {GET_SWIPER_IMAGE_LIST_REQUEST,UPDATE_SWIPER_IMAGE_LIST_REQUEST,
  GET_HOTCASE_LIST_REQUEST,UPDATE_HOTCASE_LIST_REQUEST,
  GET_SPECIAL_ACTIVITY_LIST_REQUEST,UPDATE_SPECIAL_ACTIVITY_LIST_REQUEST} from '../constants/market';
import * as MarketActionCreators from '../actions/market';


export function* getSwiperImgList({}){
  try {
    const {data} = yield call(Request.request, '/market/getSwiperImgList',"get",{});
    yield put(MarketActionCreators.getSwiperImgListSuccess(data.swiperImgList));
  } catch (error) {
    yield put(MarketActionCreators.getSwiperImgListFail());
  }
}

export function* updateSwiperImgList({swiperImgList}){
  try {
    const jsonStr = JSON.stringify({
      swiperImgList
    });
    const {data} = yield call(Request.request, '/market/updateSwiperImgList',"post",{'Content-Type': 'application/json;charset=utf-8'},jsonStr);
    yield put(MarketActionCreators.updateSwiperImgListSuccess(data.swiperImgList));
  } catch (error) {
    yield put(MarketActionCreators.updateSwiperImgListFail());
  }
}

export function* getHotCaseList({}){
  try {
    const {data} = yield call(Request.request, '/market/getHotCaseList',"get",{});
    yield put(MarketActionCreators.getHotCaseListSuccess(data.hotCaseList));
  } catch (error) {
    yield put(MarketActionCreators.getHotCaseListFail());
  }
}

export function* updateHotCaseList({hotCaseList}){
  try {
     const jsonStr = JSON.stringify({
      hotCaseList
    });
    const {data} = yield call(Request.request, '/market/updateHotCaseList',"post",{'Content-Type': 'application/json;charset=utf-8'},jsonStr);
    yield put(MarketActionCreators.updateHotCaseListSuccess(data.hotCaseList));
  } catch (error) {
    yield put(MarketActionCreators.updateHotCaseListFail());
  }
}


export function* getSpecialActivityList({}){
  try {
    const {data} = yield call(Request.request, '/market/getSpecialActivityList',"get",{});
    yield put(MarketActionCreators.getSpecialActivityListSuccess(data.specialActivityList));
  } catch (error) {
    yield put(MarketActionCreators.getSpecialActivityListFail());
  }
}

export function* updateSpecialActivityList({specialActivityList}){
  try {
    const jsonStr = JSON.stringify({
      specialActivityList
    });
    const {data} = yield call(Request.request, '/market/updateSpecialActivityList',"post",{'Content-Type': 'application/json;charset=utf-8'},jsonStr);
    yield put(MarketActionCreators.updateSpecialActivityListSuccess(data.specialActivityList));
  } catch (error) {
    yield put(MarketActionCreators.updateSpecialActivityListFail());
  }
}

export function* watchMarketRequest(getState) {
  yield takeLatest(GET_SWIPER_IMAGE_LIST_REQUEST, getSwiperImgList);
  yield takeLatest(UPDATE_SWIPER_IMAGE_LIST_REQUEST, updateSwiperImgList);
  yield takeLatest(GET_HOTCASE_LIST_REQUEST, getHotCaseList);
  yield takeLatest(UPDATE_HOTCASE_LIST_REQUEST, updateHotCaseList);
  yield takeLatest(GET_SPECIAL_ACTIVITY_LIST_REQUEST, getSpecialActivityList);
  yield takeLatest(UPDATE_SPECIAL_ACTIVITY_LIST_REQUEST, updateSpecialActivityList);
}