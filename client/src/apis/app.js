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
            url: 'https://vapi.vnappmob.com/api/province/'
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
            url: `https://vapi.vnappmob.com/api/province/district/${provinceId}`
        })
        resolve(response)
    }
    catch(error) {
        reject(error)
    }
}) 

