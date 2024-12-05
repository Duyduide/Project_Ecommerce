import axios from '../axios';

export const apiRegister = (data) => axios({
    url: '/user/register', 
    method:'post',
    data,
})
export const apiFinalRegister = (token) => axios({
    url: '/user/finalRegister/' + token, 
    method:'put'
})
export const apiLogin = (data) => axios({
    url: '/user/login', 
    method:'post',
    data
})
export const apiForgotPassword = (data) => axios({ 
    url: '/user/forgotPassword', 
    method:'post',
    data
})
export const apiResetPassword = (data) => axios({ 
    url: '/user/resetPassword', 
    method:'put',
    data
})
export const apiGetCurrent = () => axios({ 
    url: '/user/current', 
    method:'get',
})
export const apiGetAllUsers = (page=1, limit=10, sortField= 'createdAt',sortOrder = 'descend' ) => axios({
    url: '/user', 
    method:'get',
    params: {page, limit, sortField, sortOrder}
})
export const apiDeleteUser = (userID) => axios({
    url: '/user/', 
    params: {_id: userID},
    method:'delete',
})
export const apiUpdateUser = (userId ,data) => axios({
    url: '/user/' + userId, 
    method:'put',
    data
})