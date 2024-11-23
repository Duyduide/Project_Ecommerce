import axios from '../axios';

export const apiFetchUserCart = (id) => axios({
    url: '/queryUserCart/' + id, 
    method:'get',
})

export const apiAddToUserCart = (data) => axios({
    url: '/addToUserCart', 
    method:'post',
    data
})

export const apiDeleteProductFromUserCart = (data) => axios({
    url: '/deleteProductFromUserCart', 
    method:'delete',
    data
})

export const apiChangeUserCartProductQuantity = (data) => axios({
    url: '/updateUserCartProductQuantity', 
    method:'put',
    data
})

export const apiDeleteAllProductsFromUserCart = (data) => axios({
    url: '/deleteAllProductsFromUserCart', 
    method:'delete',
    data
})