import axios from '../axios';

export const apiGetProduct = (params) => axios({
    url: '/getAllProduct',
    method: 'get',
    params
})