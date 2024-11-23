import axios from '../axios';

export const apiFetchUserCart = (id) => axios({
    url: '/cart/queryUserCart/' + id, 
    method:'get',
})

export const apiAddToUserCart = (data) => axios({
    url: '/cart/addToUserCart', 
    method:'post',
    data
})

export const apiDeleteProductFromUserCart = (data) => axios({
    url: '/cart/deleteProductFromUserCart', 
    method:'delete',
    data
})

export const apiChangeUserCartProductQuantity = (data) => axios({
    url: '/cart/updateUserCartProductQuantity', 
    method:'put',
    data
})

export const apiDeleteAllProductsFromUserCart = (data) => axios({
    url: '/cart/deleteAllProductsFromUserCart', 
    method:'delete',
    data
})