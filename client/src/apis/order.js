import axios from '../axios';

export const apiCreateOrder = (data) => axios({
    url: '/order/createOrder', 
    method:'post',
    data
})

export const apiQueryOrderOfUser = (userID) => axios({
    url: '/order/queryOrderOfUser/' + userID, 
    method:'get'
})

export const apiQueryOrderById = (orderID) => axios({
    url: '/order/queryOrderById/' + orderID, 
    method:'get'
})

export const apiCancelOrder = (orderID) => axios({
    url: '/order/cancelOrder/' + orderID, 
    method:'put'
})

//chỉ dành cho admin
export const apiDeleteOrder = (orderID) => axios({
    url: '/order/deleteOrder/' + orderID, 
    method:'delete'
})