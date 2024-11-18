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
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState(''); // Thêm ghi chú
  const [houseNumber, setHouseNumber] = useState('');

  const [shippingFee, setShippingFee] = useState(20000); // Default: Phí vận chuyển
  const [paymentMethod, setPaymentMethod] = useState('COD'); // Default: Thanh toán khi nhận hàng
  const productPrice = 0; // Giá tạm thời
  const totalPrice = productPrice + shippingFee; // Tổng thanh toán

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
    <div className="flex gap-8 mb-20 mt-8">
      {/* Tiêu đề thông tin thanh toán */}
      <div className="flex-1">
        <h2 className="text-xl font-semibold">THÔNG TIN THANH TOÁN</h2>

        {/* Nhập họ và tên */}
        <div className="flex flex-col gap-2">
          <label className="font-medium font-semibold" htmlFor="name">Họ và tên</label>
          <input
            type="text"
            id="name"
            placeholder="Nhập họ và tên"
            className="border border-gray-200 shadow-inner outline-none rounded-md p-2 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Nhập số điện thoại và email */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-2 flex-1">
            <label className="font-medium font-semibold" htmlFor="phone">Số điện thoại</label>
            <input
              type="text"
              id="phone"
              placeholder="Nhập số điện thoại"
              className="border border-gray-200 shadow-inner outline-none rounded-md p-2 w-full"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <label className="font-medium font-semibold" htmlFor="email">Địa chỉ email</label>
            <input
              type="email"
              id="email"
              placeholder="Nhập địa chỉ email"
              className="border border-gray-200 shadow-inner outline-none rounded-md p-2 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Ô chọn tỉnh/thành phố và quận/huyện */}
        <div className="flex items-center gap-4">
          <Select type="province" value={province} setValue={setProvince} label="Tỉnh/Thành phố" options={provinces} />
          <Select reset={reset} type="district" value={district} setValue={setDistrict} label="Quận/Huyện" options={districts} />
        </div>

        {/* Nhập số nhà, tên đường */}
        <div className="flex flex-col gap-2">
          <label className="font-medium font-semibold" htmlFor="house-number">Số nhà, tên đường</label>
          <input
            type="text"
            id="house-number"
            placeholder="Ví dụ: 268 Lý Thường Kiệt, Phường 14"
            className="border border-gray-200 shadow-inner outline-none rounded-md p-2 w-full"
            value={houseNumber}
            onChange={(e) => setHouseNumber(e.target.value)}
          />
        </div>

        {/* Hiển thị địa chỉ giao hàng */}
        <div className="flex flex-col gap-2">
          <label className="font-medium font-semibold" htmlFor="exactly-address">Địa chỉ giao hàng</label>
          <input
            type="text"
            id="exactly-address"
            readOnly
            className="border border-gray-200 bg-gray-300 shadow-inner outline-none rounded-md p-2 w-full"
            value={deliveryAddress}
          />
        </div>

        {/* Ghi chú đơn hàng */}
        <div className="flex flex-col gap-2">
          <label className="font-medium font-semibold" htmlFor="order-note">Ghi chú đơn hàng</label>
          <textarea
            id="order-note"
            placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng một cách chi tiết hơn"
            className="border border-gray-200 shadow-inner outline-none rounded-md p-2 w-full resize-none"
            rows={3} // Tăng chiều dài của ô nhập
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        <button
  type="submit"
  className="mt-4 bg-main text-white px-4 py-2 rounded-md hover:bg-main-dark w-full" // Thêm class w-full để button có chiều rộng đầy đủ
  onClick={handleSubmit}
>
  Xác nhận Địa chỉ
</button>
      </div>

      {/* Đơn hàng của bạn */}
      <div className="w-1/3">
        <div className="border border-blue-500 p-4 rounded-md flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-blue-600 text-center">ĐƠN HÀNG CỦA BẠN</h2>

          {/* Sản phẩm và giá */}
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Sản phẩm</span>
            <span className="font-medium">GIÁ</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Placeholder hình ảnh sản phẩm */}
            <img
              src="https://via.placeholder.com/50"
              alt="Sản phẩm"
              className="w-12 h-12 border rounded-md"
            />
            <div className="flex-1">
              <span>Tên sản phẩm</span>
            </div>
            <span>0 VND</span>
          </div>

          {/* Tổng tiền hàng */}
          <div className="flex justify-between border-t pt-2">
            <span className="font-semibold">Tổng tiền hàng</span>
            <span>0 VND</span>
          </div>

        {/* Chọn phương thức vận chuyển */}
<div>
<h3 className="font-semibold mb-2">Chọn phương thức vận chuyển</h3>
<div className="flex flex-col gap-2">
  <label className="flex items-center gap-2 bg-gray-300 p-2 rounded-md opacity-80">
    <input
      type="radio"
      name="shipping"
      value={20000}
      checked={shippingFee === 20000}
      onChange={() => setShippingFee(20000)}
    />
    <strong className="font-bold">Giao hàng tiết kiệm</strong>: 20.000 VND
  </label>
  <label className="flex items-center gap-2 bg-gray-300 p-2 rounded-md opacity-80">
    <input
      type="radio"
      name="shipping"
      value={30000}
      checked={shippingFee === 30000}
      onChange={() => setShippingFee(30000)}
    />
    <strong className="font-bold">Giao hàng siêu tốc nội thành</strong>: 30.000 VND
  </label>
</div>
</div>


          {/* Tổng thanh toán */}
          <div className="flex justify-between font-semibold">
         <span>Tổng thanh toán</span>
         <span>{totalPrice.toLocaleString()} VND</span> {/* Sử dụng toLocaleString để định dạng số */}
        </div>

          {/* Chọn phương thức thanh toán */}
          <div>
            <h3 className="font-semibold">Chọn phương thức thanh toán</h3>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="COD"
                  checked={paymentMethod === 'COD'}
                  onChange={() => setPaymentMethod('COD')}
                />
                Thanh toán khi nhận hàng (COD)
              </label>
              <label className="flex items-center gap-2">
      <input
        type="radio"
        name="payment"
        value="bank"
        checked={paymentMethod === 'bank'}
        onChange={() => setPaymentMethod('bank')}
      />
      Thanh toán qua ví MoMo
      <img
        src="momo.png" // Đặt đường dẫn hình ảnh ví MoMo ở đây
        alt="Ví MoMo"
        className="w-5 h-5" // Đặt kích thước hình ảnh
      />
      
    </label>
            </div>
          </div>

          {/* Nút xác nhận */}
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white p-3 rounded-md mt-4 w-full"
          >
            XÁC NHẬN ĐẶT HÀNG
          </button>
        </div>
      </div>
    </div>
  );
};



export default Address