import axios from '../axios';

// '/queryProduct'
export const apiGetProduct = () => axios({
    url: '/queryProduct/getAllProduct',
    method: 'get'
})

// get by type
export const apiGetPhone = () => axios({
    url: '/queryProduct/getPhone',
    method: 'get'
})
export const apiGetLaptop = () => axios({
    url: '/queryProduct/getLatop',
    method: 'get'
})
export const apiGetTablet = () => axios({
    url: '/queryProduct/getTablet',
    method: 'get'
})
export const apiGetHeadphone = () => axios({
    url: '/queryProduct/getHeadphone',
    method: 'get'
})