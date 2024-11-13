import axios from 'axios';

export const apiCreateOrder = (data) => axios({
    url: '/createOrder', 
    method:'post',
    data
})

export const apiQueryOrderOfUser = (userID) => axios({
    url: '/queryOrderOfUser/' + userID, 
    method:'get'
})

export const apiQueryOrderById = (orderID) => axios({
    url: '/queryOrderById/' + orderID, 
    method:'get'
})

export const apiCancelOrder = (orderID) => axios({
    url: '/cancelOrder/' + orderID, 
    method:'put'
})

//chỉ dành cho admin
export const apiDeleteOrder = (orderID) => axios({
    url: '/deleteOrder/' + orderID, 
    method:'delete'
})