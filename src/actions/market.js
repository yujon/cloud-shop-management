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


export function getSpecialActivityList(){
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

export function updateSpecialActivityListItem(specialActivityListItemId,specialActivityListItem,callback){
	return {
		type:marketConf.UPDATE_SPECIAL_ACTIVITY_LIST_ITEM_REQUEST,
		callback,
		specialActivityListItemId,
		specialActivityListItem,
		payload:{
			updateSpecialActivityListItemStatus:'doing'
		}
	}
}

export function updateSpecialActivityListItemSuccess(specialActivityList){
	return {
		type:marketConf.UPDATE_SPECIAL_ACTIVITY_LIST_ITEM_SUCCESS,
		payload:{
			updateSpecialActivityListItemStatus:'success',
			specialActivityList
		}
	}
}

export function updateSpecialActivityListItemFail(){
	return {
		type:marketConf.UPDATE_SPECIAL_ACTIVITY_LIST_ITEM_FAIL,
		payload:{
			updateSpecialActivityListItemStatus:'fail'
		}
	}
}

export function addSpecialActivityListItem(specialActivityListItem,callback){
	return {
		type:marketConf.ADD_SPECIAL_ACTIVITY_LIST_ITEM_REQUEST,
		callback,
		specialActivityListItem,
		payload:{
			addSpecialActivityListItemStatus:'doing'
		}
	}
}

export function addSpecialActivityListItemSuccess(specialActivityList){
	return {
		type:marketConf.ADD_SPECIAL_ACTIVITY_LIST_ITEM_SUCCESS,
		payload:{
			addSpecialActivityListItemStatus:'success',
			specialActivityList
		}
	}
}

export function addSpecialActivityListItemFail(){
	return {
		type:marketConf.ADD_SPECIAL_ACTIVITY_LIST_ITEM_FAIL,
		payload:{
			addSpecialActivityListItemStatus:'fail'
		}
	}
}


export function removeSpecialActivityListItem(specialActivityListItemId,callback){
	return {
		type:marketConf.REMOVE_SPECIAL_ACTIVITY_LIST_ITEM_REQUEST,
		callback,
		specialActivityListItemId,
		payload:{
			removeSpecialActivityListItemStatus:'doing'
		}
	}
}

export function removeSpecialActivityListItemSuccess(specialActivityList){
	return {
		type:marketConf.REMOVE_SPECIAL_ACTIVITY_LIST_ITEM_SUCCESS,
		payload:{
			removeSpecialActivityListItemStatus:'success',
			specialActivityList
		}
	}
}

export function removeSpecialActivityListItemFail(){
	return {
		type:marketConf.REMOVE_SPECIAL_ACTIVITY_LIST_ITEM_FAIL,
		payload:{
			removeSpecialActivityListItemStatus:'fail'
		}
	}
}






