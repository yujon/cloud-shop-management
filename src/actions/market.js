import * as marketConf from '../constants/market';

export function getSwiperImgList(pid){
	return {
		type:marketConf.GET_SWIPER_IMAGE_LIST_REQUEST,
		payload:{
			getSwiperImgListStatus:'doing'
		}
	}
}

export function getSwiperImgListSuccess(swiperImgList){
	return {
		type:marketConf.GET_SWIPER_IMAGE_LIST_SUCCESS,
		payload:{
			getSwiperImgListStatus:'success',
			swiperImgList
		}
	}
}

export function getSwiperImgListFail(){
	return {
		type:marketConf.GET_SWIPER_IMAGE_LIST_FAIL,
		payload:{
			getSwiperImgListStatus:'fail'
		}
	}
}


export function updateSwiperImgList(swiperImgList){
	return {
		type:marketConf.UPDATE_SWIPER_IMAGE_LIST_REQUEST,
		swiperImgList,
		payload:{
			updateSwiperImgListStatus:'doing'
		}
	}
}

export function updateSwiperImgListSuccess(swiperImgList){
	return {
		type:marketConf.UPDATE_SWIPER_IMAGE_LIST_SUCCESS,
		payload:{
			updateSwiperImgListStatus:'success',
			swiperImgList
		}
	}
}

export function updateSwiperImgListFail(){
	return {
		type:marketConf.UPDATE_SWIPER_IMAGE_LIST_FAIL,
		payload:{
			updateSwiperImgListStatus:'fail'
		}
	}
}


export function getHotCaseList(){
	return {
		type:marketConf.GET_HOTCASE_LIST_REQUEST,
		payload:{
			getHotCaseListStatus:'doing',
		}
	}
}

export function getHotCaseListSuccess(hotCaseList){
	return {
		type:marketConf.GET_HOTCASE_LIST_SUCCESS,
		payload:{
			getHotCaseListStatus:'success',
			hotCaseList
		}
	}
}

export function getHotCaseListFail(){
	return {
		type:marketConf.GET_HOTCASE_LIST_FAIL,
		payload:{
			getHotCaseListStatus:'fail'
		}
	}
}


export function updateHotCaseList(hotCaseList){
	return {
		type:marketConf.UPDATE_HOTCASE_LIST_REQUEST,
		hotCaseList,
		payload:{
			updateHotCaseListStatus:'doing'
		}
	}
}

export function updateHotCaseListSuccess(hotCaseList){
	return {
		type:marketConf.UPDATE_HOTCASE_LIST_SUCCESS,
		payload:{
			updateHotCaseListStatus:'success',
			hotCaseList
		}
	}
}

export function updateHotCaseListFail(){
	return {
		type:marketConf.UPDATE_HOTCASE_LIST_FAIL,
		payload:{
			updateHotCaseListStatus:'fail'
		}
	}
}

export function getSpecialActivityList(pid){
	return {
		type:marketConf.GET_SPECIAL_ACTIVITY_LIST_REQUEST,
		payload:{
			getSpecialActivityListStatus:'doing'
		}
	}
}

export function getSpecialActivityListSuccess(specialActivityList){
	return {
		type:marketConf.GET_SPECIAL_ACTIVITY_LIST_SUCCESS,
		payload:{
			getSpecialActivityListStatus:'success',
			specialActivityList:specialActivityList
		}
	}
}

export function getSpecialActivityListFail(){
	return {
		type:marketConf.GET_SPECIAL_ACTIVITY_LIST_FAIL,
		payload:{
			getSpecialActivityListStatus:'fail'
		}
	}
}

export function updateSpecialActivityList(hotCaseList){
	return {
		type:marketConf.UPDATE_SPECIAL_ACTIVITY_LIST_REQUEST,
		hotCaseList,
		payload:{
			updateSpecialActivityListStatus:'doing'
		}
	}
}

export function updateSpecialActivityListSuccess(specialActivityList){
	return {
		type:marketConf.UPDATE_SPECIAL_ACTIVITY_LIST_SUCCESS,
		payload:{
			updateSpecialActivityListStatus:'success',
			specialActivityList:specialActivityList
		}
	}
}

export function updateSpecialActivityListFail(){
	return {
		type:marketConf.UPDATE_SPECIAL_ACTIVITY_LIST_FAIL,
		payload:{
			updateSpecialActivityListStatus:'fail'
		}
	}
}






