import { put,takeLatest, call } from 'redux-saga/effects';
import * as Request from '../utils/Request';

import {UPLOAD_FILE_REQUEST} from '../constants/common'
import * as CommonActionCreators from '../actions/common';

export function* uploadFile({file,fileName,callback}){
  try {
    let json = new FormData();
    json.append('myfile',file);
    const {data} = yield call(Request.request, '/upload/uploadFile','post',{},json);
    yield put(CommonActionCreators.uploadFileSuccess());
    callback && callback(data.tmpImg);
    
  } catch (error) {
    yield put(CommonActionCreators.uploadFileFail());
  }
}


export function* watchCommonRequest(getState) {
  yield takeLatest(UPLOAD_FILE_REQUEST, uploadFile);
}