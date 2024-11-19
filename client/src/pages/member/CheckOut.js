import React, { useState } from 'react'
import { Address } from '../../components'


const CheckOut = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState(''); // Thêm ghi chú

  const [shippingFee, setShippingFee] = useState(20000); // Default: Phí vận chuyển
  const [paymentMethod, setPaymentMethod] = useState('COD'); // Default: Thanh toán khi nhận hàng
  const productPrice = 0; // Giá tạm thời
  const totalPrice = productPrice + shippingFee; // Tổng thanh toán
  
  return (
    <div className='w-main h-screen flex flex-row mt-10'>
      <div className='w-2/3 flex flex-col flex-1 gap-8 pr-10'>
          <div className='flex flex-col gap-5'>
            <h2 className="text-xl font-semibold">THÔNG TIN THANH TOÁN</h2>
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
          </div>
          <Address/> 
          <div className="flex flex-col gap-2">
            <label className="font-medium font-semibold" htmlFor="order-note">Ghi chú đơn hàng</label>
            <textarea
              id="order-note"
              placeholder="Ví dụ: giao giờ hành chính, gọi điện trước khi giao hàng"
              className="border border-gray-200 shadow-inner outline-none rounded-md p-2 w-full resize-none"
              rows={3} // Tăng chiều dài của ô nhập
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
      </div>
      
      <div className='w-1/3'>
        <div className="border border-blue-500 border-2 p-4 rounded-md flex flex-col gap-8">
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
              //onClick={}
              className="bg-blue-600 text-white p-3 rounded-md mt-4 w-full"
            >
              XÁC NHẬN ĐẶT HÀNG
            </button>
        </div>
      </div>
    </div>
  )
}

export default CheckOut