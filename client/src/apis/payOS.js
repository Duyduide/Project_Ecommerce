import axios from '../axios';

export const apiCreatePayment = (data) => axios({
    url: '/payOS/createPayment', 
    method: 'post',
    data
})

export const apiCheckPaymentStatus = (orderCode) => axios({
    url: `/payOS/checkPaymentStatus/${orderCode}`, 
    method:'get'
})