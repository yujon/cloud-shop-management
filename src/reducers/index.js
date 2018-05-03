import { combineReducers } from 'redux';

import userReducer from './user';
import settingReducer from './setting';
import marketReducer from './market';
import commonReducer from './common';
import commodityReducer from './commodity';

const rootReducer = combineReducers({
	common: commonReducer,
	user: 	 userReducer,
    setting:  settingReducer,
    market:marketReducer,
    commodity:commodityReducer
});

export default rootReducer