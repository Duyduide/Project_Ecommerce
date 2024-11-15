import axios from '../axios';

// '/queryProduct'
export const apiGetProduct = () => axios({
    url: '/queryProduct/getAllProduct',
    method: 'get'
})

export const apiGetPhone = () => axios({
    url: '/queryProduct/getPhone',
    method: 'get',
});

export const apiGetLaptop = () => axios({
    url: '/queryProduct/getlaptop',
    method: 'get',
});

export const apiGetTablet = () => axios({
    url: '/queryProduct/getTablet',
    method: 'get',
});

export const apiGetHeadPhone = () => axios({
    url: '/queryProduct/getHeadPhone',
    method: 'get',
});

export const apiGetProductById = (productID) => axios({
    url: `/queryProduct/getProductById/${productID}`,
    method: 'get',
});

// export const apiGetProduct = () => axios({
//     url: '/queryProduct/getAllProduct',
//     method: 'get'
// })
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
