import * as settingConf from '../constants/setting';
export function getSetting(){
	return {
		type:settingConf.GET_SETTING_REQUEST,
		payload:{
			getSettingStatus:'doing'
		}
	}
}

export function getSettingSuccess(settingInfo){
	return {
		type:settingConf.GET_SETTING_SUCCESS,
		payload:{
			getSettingStatus:'success',
			settingInfo
		}
	}
}

export function getSettingFail(){
	return {
		type:settingConf.GET_SETTING_FAIL,
		payload:{
			getSettingStatus:'fail'
		}
	}
}

export function updateSetting(settingInfo){
	return {
		type:settingConf.UPDATE_SETTING_REQUEST,
		settingInfo,
		payload:{
			updateSettingStatus:'doing'
		}

	}
}

export function updateSettingSuccess(settingInfo){
	return {
		type:settingConf.UPDATE_SETTING_SUCCESS,
		settingInfo,
		payload:{
			updateSettingStatus:'usccess'
		}
	}
}

export function updateSettingFail(){
	return {
		type:settingConf.UPDATE_SETTING_FAIL,
		payload:{
			updateSettingStatus:'fail'
		}
	}
}