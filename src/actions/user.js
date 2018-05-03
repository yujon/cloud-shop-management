import * as userConf from '../constants/user';


// 登录
export function loginIn(phoneCode,phoneNumber,password,callback){
	return {
		type:userConf.LOGIN_IN_REQUEST,
		phoneCode,
		phoneNumber,
		password,
		callback,
		payload:{
			loginInStatus:'doing'
		}
	}
}

export function loginInSuccess(userInfo){
	return {
		type:userConf.LOGIN_IN_SUCCESS,
		payload:{
			loginInStatus:'success',
			userInfo
		}
	}
}

export function loginInFail(){
	return {
		type:userConf.LOGIN_IN_FAIL,
		payload:{
			loginInStatus:'fail'
		}
	}
}


// 退出登录
export function loginOut(userId,callback){
	return {
		type:userConf.LOGIN_OUT_REQUEST,
		userId,
		callback,
	}
}

//获取信息
export function getUser(userId){
	return {
		type:userConf.GET_USER_REQUEST,
		userId,
	}
}

export function getUserSuccess(userInfo){
	return {
		type:userConf.GET_USER_SUCCESS,
		payload:{
			userInfo
		}
	}
}

export function getUserFail(){
	return {
		type:userConf.GET_USER_FAIL,
	}
}

//修改信息
export function updateUser(userId,userInfo){
    return {
		type:userConf.UPDATE_USER_REQUEST,
		userId,
		userInfo,
		payload:{
			updateUserStatus:'doing',
		}
	}
}
export function updateUserSuccess(userInfo){
	return {
		type:userConf.UPDATE_USER_SUCCESS,
		payload:{
			updateUserStatus:'success',
			...userInfo
		}
	}
}
export function updateUserFail(){
	return {
		type:userConf.UPDATE_USER_FAIL,
		payload:{
			updateUserStatus:'fail',
		}
	}
}








