import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

const OrderHistoryDetail = () => {
  const { orderId } = useParams(); // Lấy orderId từ URL params
  const location = useLocation(); // Lấy state từ navigation
  const [order, setOrder] = useState(location.state?.orderDetails || null); // Dữ liệu từ state hoặc null
  if (!order) return <p>Không tìm thấy thông tin đơn hàng.</p>;

  return (
    <div className="p-6 font-sans">
      <h1 className="pl-4 mb-4 text-2xl font-bold text-blue-600">Thông tin đơn hàng #{order.payOSOrderId || orderId}</h1>
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <div className="mb-4 space-y-2">
          <p><strong>Ngày đặt hàng:</strong> {new Date(order.createdAt).toLocaleDateString("vi-VN")}</p>
          <p><strong>Người nhận:</strong> {order.name || 'Không có thông tin'}</p>
          <p><strong>Email:</strong> {order.email || 'Không có thông tin'}</p>
          <p><strong>Số điện thoại:</strong> {order.phone || 'Không có thông tin'}</p>
          <p><strong>Phương thức thanh toán:</strong> {order.paymentMethod || 'Không xác định'}</p>
          <p><strong>Địa chỉ giao hàng:</strong> {order.address || 'Không có thông tin'}</p>
        </div>
      </div>
  
      {/* Bảng thông tin sản phẩm */}
      <div className="p-2 mt-6 bg-gray-100 border border-blue-500 rounded-xl">
        <table className="w-full table-auto rounded-xl">
          <thead>
            <tr className="text-black bg-blue-200">
              <th className="p-4 text-left pl-9 rounded-tl-xl">Tên sản phẩm</th>
              <th className="p-2 pr-20 text-center">Số lượng</th>
              <th className="p-2 pr-1 text-left pl-7">Giá niêm yết</th>
              <th className="p-2 text-right pr-9 rounded-tr-xl ">Thành tiền</th> {/* Cập nhật text-right */}
            </tr>
          </thead>
          <tbody>
            {order.productList?.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="flex items-center p-2 pl-9">
                  <img
                    src={item.productId.imageLink}
                    alt={item.productId.name}
                    className="object-cover w-12 h-12 mr-4"
                  />
                  {item.productId.name}
                </td>
                <td className="p-2 pr-20 text-center">{item.quantity}</td>
                <td className="p-2 pr-1 text-left pl-7">{item.productId.price.toLocaleString()}đ</td>
                <td className="p-2 pr-8 text-right ">{(item.quantity * item.productId.price).toLocaleString()}đ</td> {/* Cập nhật text-right */}
              </tr>
            ))}
          </tbody>
        </table>
  
        <div className="pl-8 pr-8 mt-4 border-t border-gray-300">
          <p className="flex justify-between py-2">
            <span>Tổng giá trị sản phẩm:</span>
            <span>{order.productList?.reduce((total, item) => total + item.quantity * item.productId.price, 0).toLocaleString()}đ</span>
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
  
      <div className="flex justify-between p-4 mt-6 text-lg font-semibold text-white bg-gray-800 rounded-lg">
        <span>Tổng thanh toán:</span>
        <span>{order.totalPrice?.toLocaleString()}đ</span>
      </div>
    </div>
  );
  
};

export default OrderHistoryDetail;
