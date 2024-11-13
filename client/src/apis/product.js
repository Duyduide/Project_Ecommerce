import axios from '../axios';

// '/queryProduct'
export const apiGetProduct = () => axios({
    url: '/queryProduct/getAllProduct',
    method: 'get'
})