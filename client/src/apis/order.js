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

export const apiGetOrdersByPayOSOrderId = (payOSOrderId) => axios({
    url: '/order/getOrdersByPayOSOrderId/' + payOSOrderId, 
    method:'get'
})

export const apiCancelOrder = (orderID) => axios({
    url: '/order/cancelOrder/' + orderID, 
    method:'put'
})

//chỉ dành cho admin

export const apiQueryAllOrders = (page=1, limit=20, sortField= 'createdAt',sortOrder = 'descend') => axios({
    url: '/order/queryAllOrders', 
    method:'get',
    params: {page, limit, sortField, sortOrder}
})

export const apiUpdateOrder = (orderID, orderData) => axios({
    url: '/order/updateOrder/' + orderID, 
    method:'put',
    data: {orderData}
})

export const apiDeleteOrder = (orderID) => axios({
    url: '/order/deleteOrder/' + orderID, 
    method:'delete'
})

export const apiGetOrderById = (orderID) => axios({
    url: '/order/queryOrderById/' + orderID,
    method: 'get'
})