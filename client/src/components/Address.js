import React, {useEffect, useState} from 'react'
import Select from './Select'
import { apiGetPublicProvinces, apiGetPublicDistrict } from '../apis/app'
import Swal from 'sweetalert2'

const Address = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();
  
  const [reset, setReset] = useState(false);
  const [houseNumber, setHouseNumber] = useState('');

  const fetchPublicProvinces = async () => {
    const response = await apiGetPublicProvinces()
    if(response.status === 200){
      setProvinces(response?.data?.results)
    }
      
  }
  const fetchPublicDistrict = async () => {
    const response = await apiGetPublicDistrict(province)
    if(response.status === 200) {
      setDistricts(response?.data?.results)
    }
    
  }
  useEffect(() => { 
    fetchPublicProvinces()
  }, [])

  useEffect(() => { 
    setDistrict(null);
    province && fetchPublicDistrict();
    !province ? setReset(true) : setReset(false);
    !province && setDistricts([]);
  }, [province])
  
  const deliveryAddress = [
    houseNumber ? houseNumber.trim() : '',
    district
      ? districts?.find((item) => item.district_id === district)?.district_name
      : '',
    province
      ? provinces?.find((item) => item.province_id === province)?.province_name
      : '',
  ]
    .filter(Boolean) // Remove empty strings
    .join(', '); // Join with comma and space

  // hàm trả về giá trị của địa chỉ khi bấm submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!houseNumber || !district || !province) {
      Swal.fire('Thiếu thông tin địa chỉ', 'Vui lòng nhập đầy đủ địa chỉ trước khi xác nhận.', 'error' );
      return;
    }
    console.log(deliveryAddress);
  };

  return (
    <div className='flex flex-col gap-4 w-1/2'>

        {/*2 cái ô chọn tỉnh/thành với quận/huyện*/}
        <div className='flex items-center gap-4'> 
          <Select type='province' value={province} setValue={setProvince} label='Tỉnh/Thành phố' options={provinces} /> 
          <Select reset={reset} type='district' value={district} setValue={setDistrict} label='Quận/Huyện' options={districts}/>    
        </div>

        {/* ô nhập số nhà, tên đường*/}
        <div className='flex flex-col gap-2'>
          <label className='font-medium gap-2 font-semibold	' htmlFor='house-number'>Số nhà, tên đường</label>
          <input 
            type='text' 
            id='house-number' 
            placeholder='Ví dụ: 268 Lý Thường Kiệt, Phường 14' 
            className='border border-gray-200 shadow-inner outline-none rounded-md p-2 w-full'
            value={houseNumber}
            onChange={(e) => {setHouseNumber(e.target.value)}}
          />
        </div>

        {/* ô hiện địa chỉ đã nhập */}
          <div className='flex flex-col gap-2'>
            <label className='font-medium font-semibold	' htmlFor='exactly-address'>Địa chỉ giao hàng</label>
            <input 
              type='text'
              id='exactly-address'
              readOnly
              className='border border-gray-200 bg-gray-300 shadow-inner outline-none rounded-md p-2 w-full'
              value={deliveryAddress}
            />
        </div>

        {/* Submit Button dùng để test khi merge code thì sử dụng submit button của trang checkout*/}
        <button
          type='submit'
          className='mt-4 bg-main text-white px-4 py-2 rounded-md hover:bg-main-dark'
          onClick={handleSubmit}
        >
          Xác nhận Địa chỉ
        </button>
    </div>    
  )
}

export default Address