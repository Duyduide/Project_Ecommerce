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

export const apiGetSmartWatch = () => axios({
    url: '/queryProduct/getSmartWatch',
    method: 'get',
});

export const apiGetCharger = () => axios({
    url: '/queryProduct/getCharger',
    method: 'get',
});

export const apiGetMouse = () => axios({
    url: '/queryProduct/getMouse',
    method: 'get',
});

export const apiGetKeyboard = () => axios({
    url: '/queryProduct/getKeyboard',
    method: 'get',
});

export const apiGetPowerBank = () => axios({
    url: '/queryProduct/getPowerBank',
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
    url: '/product/createProduct', 
    method:'post',
    data
})

export const apiDeleteProduct = (id) => axios({
    url: '/product/deleteProduct/' + id, 
    method:'delete',
})

export const apiUpdateProduct = (data) => axios({
    url: '/product/updateProduct', 
    method:'put',
    data
})

//Fetch sản phẩm
export const apiFetchProductByPage = (category, page, sortField, sortOrder, pageSize=20) => axios({
    url: 'queryProduct/getProductMain/' + category, 
    method:'get',
    params: {page, sortField, sortOrder, pageSize}
})

export const apiFetchProductById = (id) => axios({
    url: 'queryProduct/getProductById/' + id, 
    method:'get',
})

export const apiFetchProductBySlug = (slug) => axios({
    url: 'queryProduct/getProductBySlug/' + slug, 
    method:'get',
})

export const apiFetchProductByName = (name) => axios({
    url: 'queryProduct/getProductByName/' + name, 
    method:'get',
})
