import axios from '../axios';

export const apiGetProductRating = (productId) => axios({
    url: `/rating/queryRatingOfProduct/${productId}`,
    method: 'get',
});

export const apiGetOrderRating = (orderId) => axios({
    url: `/rating/queryRatingOfOrder/${orderId}`,
    method: 'get',
});

export const apiGetUserRating = (userId) => axios({
    url: `/rating/queryRatingOfUser/${userId}`,
    method: 'get',
});

export const apicreateRating = (data) => axios({
    url: '/rating/createRating',
    method: 'post',
    data
});

export const apiUpdateRating = (ratingId, data) => axios({
    url: `/rating/updateRating/${ratingId}`,
    method: 'put',
    data
});

export const apiDeleteRating = (ratingId) => axios({
    url: `/rating/deleteRating/${ratingId}`,
    method: 'delete',
});