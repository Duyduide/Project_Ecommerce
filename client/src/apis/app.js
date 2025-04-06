import axios from '../axios';
import axiosDefault from 'axios'

export const apiGetCategories = () => axios({
    url: '/prodCategory/', // /productCategory
    method:'get'
})

export const apiGetPublicProvinces = () => new Promise(async (resolve, reject) =>{
    try {
        const response = await axiosDefault({
            method: 'get',
            url: `${process.env.REACT_APP_PROVINCE_API_KEY}`
        })
        resolve(response)
    }
    catch(error) {
        reject(error)
    }
}) 
export const apiGetPublicDistrict = (provinceId) => new Promise(async (resolve, reject) =>{
    try {
        const response = await axiosDefault({
            method: 'get',
            url: `${process.env.REACT_APP_DISTRICT_API_KEY}${provinceId}`
        })
        resolve(response)
    }
    catch(error) {
        reject(error)
    }
}) 