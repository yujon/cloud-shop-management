import { put,takeLatest, call } from 'redux-saga/effects';
import * as Request from '../utils/Request';

import {GET_COMMODITY_REQUEST,GET_COMMODITY_LIST_REQUEST} from '../constants/commodity'
import * as CommodityrActionCreators from '../actions/commodity';


export function* getCommodityList({}){
  try {
    const {data} = yield call(Request.request, '/commodity/getUpCarriageList','get',{});
    const commodityList = data.commodityList;
    yield put(CommodityrActionCreators.getCommodityListSuccess(commodityList));
  } catch (error) {
    yield put(CommodityrActionCreators.getCommodityListFail());
  }
}


export function* getCommodity({shopId,commodityId}){
  try {
    const {data} = yield call(Request.request, `/commodity/get/${shopId}/${commodityId}`,'get',{});
    const commodityInfo = data.commodityInfo;
    yield put(CommodityrActionCreators.getCommoditySuccess(commodityInfo));
  } catch (error) {
    yield put(CommodityrActionCreators.getCommodityFail());
  }
}


export function* watchCommodityRequest(getState) {
  yield takeLatest(GET_COMMODITY_LIST_REQUEST, getCommodityList);
  yield takeLatest(GET_COMMODITY_REQUEST, getCommodity);
}