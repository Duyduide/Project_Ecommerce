import axios from '../axios';

export const apiCreateVoucher = (data) => axios({
    url: '/createVoucher', 
    method:'post',
    data
})

export const apiUpdateVoucher = (data) => axios({
    url: '/updateVoucher', 
    method:'put',
    data
})

export const apiDeleteVoucher = (voucherCode) => axios({
    url: '/deleteVoucher/' + voucherCode, 
    method:'delete',
})

export const apiFindVoucherByCode = (voucherCode) => axios({
    url: '/findVoucherByCode/' + voucherCode, 
    method:'get',
})

export const findAllAvailableVouchers = (membership) => axios({
    url: '/findAllAvailableVouchers/' + membership, 
    method:'get',
})