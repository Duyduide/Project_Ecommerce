import axios from '../axios';

export const apiGetCategories = () => axios({
    url: '/prodCategory/', // /productCategory
    method:'get'
})