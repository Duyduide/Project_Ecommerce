import axios from '../axios';

//chỉnh sửa database sản phẩm (chỉ dành cho admin)
export const apiAddProduct = (data) => axios({
    url: '/createProduct', 
    method:'post',
    data
})

export const apiDeleteProduct = (id) => axios({
    url: '/deleteProduct/' + id, 
    method:'delete',
})

export const apiUpdateProduct = (data) => axios({
    url: '/updateProduct', 
    method:'put',
    data
})

//Fetch sản phẩm
export const apiFetchProductByPage = (category, page, sortField, sortOrder, pageSize=20) => axios({
    url: '/getProductMain/' + category, 
    method:'get',
    params: {page, sortField, sortOrder, pageSize}
})

export const apiFetchProductById = (id) => axios({
    url: '/getProductById/' + id, 
    method:'get',
})

export const apiFetchProductBySlug = (slug) => axios({
    url: '/getProductBySlug/' + slug, 
    method:'get',
})