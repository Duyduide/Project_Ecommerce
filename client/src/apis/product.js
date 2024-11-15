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
