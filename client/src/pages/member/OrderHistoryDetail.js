import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

const OrderHistoryDetail = () => {
  const { orderId } = useParams(); // Lấy orderId từ URL params
  const location = useLocation(); // Lấy state từ navigation
  const [order, setOrder] = useState(location.state?.orderDetails || null); // Dữ liệu từ state hoặc null
  //const [loading, setLoading] = useState(!order); // Chỉ load nếu không có sẵn dữ liệu
  //const [error, setError] = useState(null);

  /*useEffect(() => {
    if (!order) {
      const fetchOrderDetails = async () => {
        try {
          const response = await axios.get(`/api/order/${orderId}`);
          setOrder(response.data.data);
        } catch (err) {
          setError('Lỗi khi tải chi tiết đơn hàng');
        } finally {
          setLoading(false);
        }
      };

      fetchOrderDetails();
    }
  }, [orderId, order]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>; */
  if (!order) return <p>Không tìm thấy thông tin đơn hàng.</p>;

  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4 pl-4 text-blue-600">Thông tin đơn hàng #{order.orderId || orderId}</h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="mb-4 space-y-2">
          <p><strong>Ngày đặt hàng:</strong> {new Date(order.createdAt).toLocaleDateString("vi-VN")}</p>
          <p><strong>Người nhận:</strong> {order.name || 'Không có thông tin'}</p>
          <p><strong>Email:</strong> {order.email || 'Không có thông tin'}</p>
          <p><strong>Số điện thoại:</strong> {order.phone || 'Không có thông tin'}</p>
          <p><strong>Phương thức thanh toán:</strong> {order.paymentMethod || 'Không xác định'}</p>
          <p><strong>Địa chỉ giao hàng:</strong> {order.address || 'Không có thông tin'}</p>
        </div>
  
        {/* Ba nút hỗ trợ */}
        <div className="mt-4 flex space-x-4">
          <button
            className="px-6 py-2 bg-white-500 border border-black text-black rounded-full hover:bg-cyan-100"
            onClick={() => alert('Liên hệ hỗ trợ')}
          >
            Cần hỗ trợ
          </button>
          <button
            className="px-6 py-2 bg-black text-white rounded-full hover:bg-cyan-200"
            onClick={() => alert('Mua lại sản phẩm')}
          >
            Mua lại
          </button>
          <button
            className="px-6 py-2 bg-black text-white rounded-full hover:bg-cyan-200"
            onClick={() => alert('Đánh giá sản phẩm')}
          >
            Đánh giá
          </button>
        </div>
      </div>
  
      {/* Bảng thông tin sản phẩm */}
      <div className="bg-gray-100 border border-blue-500 rounded-xl p-2 mt-6">
        <table className="w-full table-auto rounded-xl">
          <thead>
            <tr className="bg-blue-200 text-black">
              <th className="p-4 pl-9 text-left rounded-tl-xl">Tên sản phẩm</th>
              <th className="p-2 text-center pr-20">Số lượng</th>
              <th className="p-2 text-left pl-7 pr-1">Giá niêm yết</th>
              <th className="p-2 pr-9 rounded-tr-xl text-right ">Thành tiền</th> {/* Cập nhật text-right */}
            </tr>
          </thead>
          <tbody>
            {order.productList?.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="p-2 pl-9 flex items-center">
                  <img
                    src={item.productId.imageLink}
                    alt={item.productId.name}
                    className="w-12 h-12 mr-4 object-cover"
                  />
                  {item.productId.name}
                </td>
                <td className="p-2 text-center pr-20">{item.quantity}</td>
                <td className="p-2 text-left pl-7 pr-1">{item.productId.price.toLocaleString()}đ</td>
                <td className="p-2 text-right pr-8 ">{(item.quantity * item.productId.price).toLocaleString()}đ</td> {/* Cập nhật text-right */}
              </tr>
            ))}
          </tbody>
        </table>
  
        <div className="mt-4 border-t border-gray-300 pl-8 pr-8">
          <p className="flex justify-between py-2">
            <span>Mã giảm giá:</span>
            <span>{order.discountCode || 'Không có'}</span>
          </p>
          <hr className="my-2" />
          <p className="flex justify-between py-2">
            <span>Tổng giá trị sản phẩm:</span>
            <span>{order.productList?.reduce((total, item) => total + item.quantity * item.productId.price, 0).toLocaleString()}đ</span>
          </p>
          <hr className="my-2" />
          <p className="flex justify-between py-2">
            <span>Tổng khuyến mãi:</span>
            <span>{order.totalDiscount?.toLocaleString() || '0'}đ</span>
          </p>
          <hr className="my-2" />
          <p className="flex justify-between py-2">
            <span>Phí giao hàng:</span>
            <span>
              {order.totalPrice - order.productList?.reduce(
                (total, item) => total + item.quantity * item.productId.price,
                0
              ) > 0
                ? (order.totalPrice - 
                    order.productList?.reduce(
                      (total, item) => total + item.quantity * item.productId.price,
                      0
                    )
                  ).toLocaleString()
                : '0'}đ
            </span>
          </p>
        </div>
      </div>
  
      <div className="bg-gray-800 text-white p-4 mt-6 rounded-lg text-lg font-semibold flex justify-between">
        <span>Tổng thanh toán:</span>
        <span>{order.totalPrice?.toLocaleString()}đ</span>
      </div>
    </div>
  );
  
};

export default OrderHistoryDetail;
