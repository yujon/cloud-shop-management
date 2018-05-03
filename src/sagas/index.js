import { all, fork } from 'redux-saga/effects';
import { watchCommonRequest } from './common';
import { watchUserRequest } from './user';
import { watchSettingRequest } from './setting';
import { watchMarketRequest } from './market';
import { watchCommodityRequest } from './commodity';

export default function* rootSaga() {
  yield all([
  	fork(watchCommonRequest),
  	fork(watchUserRequest),
  	fork(watchSettingRequest),
  	fork(watchMarketRequest),
  	fork(watchCommodityRequest),
  ]);
}