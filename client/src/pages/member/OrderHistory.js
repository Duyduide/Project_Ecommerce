import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { apiQueryOrderOfUser } from '../../apis/order';
import { apiQueryOrderById } from '../../apis/order';
import { apiGetCurrent } from '../../apis/user';

const OrderHistory = () => {
  
  const [currentUser, setCurrentUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState({});  // State để lưu chi tiết đơn hàng
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
 
  const handleOrderClick = async (orderId) => {
    try {
      const details = await fetchOrderDetails(orderId);
      // Navigate to OrderHistoryDetail with full order details
      navigate(`/member/order-history/${orderId}`, { state: { orderDetails: details } });
    } catch (err) {
      setError('Lỗi khi tải chi tiết đơn hàng');
    }
  };

  // Lấy thông tin người dùng hiện tại
  const fetchCurrentUser = async () => {
    try {
      const results = await apiGetCurrent();
      if (results.success) {
        setCurrentUser(results.rs);
      } else {
        setError(results.message);
      }
    } catch (err) {
      setError('Lỗi khi tải thông tin người dùng');
    }
  };

  const fetchUserOrders = async (userId) => {
    try {
      const response = await apiQueryOrderOfUser(userId);
      if (response.success) {
         // Sắp xếp đơn hàng theo ngày tạo mới nhất
      const sortedOrders = response.orderData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setOrders(sortedOrders);
      } else {
        setError(response.message || 'Không thể tải đơn hàng');
      }
    } catch (error) {
      setError('Lỗi kết nối đến server');
    }
  };

  // Lấy chi tiết đơn hàng từ API
  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await apiQueryOrderById(orderId);
      if (response.success) {
        return response.orderData; // Trả về chi tiết đơn hàng
      } else {
        throw new Error("Không thể tải chi tiết đơn hàng");
      }
    } catch (error) {
      return null;
    }
  };

  // Xử lý khi component được render
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (currentUser?._id) {
      fetchUserOrders(currentUser._id);  // Gọi API lấy đơn hàng của người dùng
    }
  }, [currentUser]);

  useEffect(() => {
    if (orders.length > 0) {
      orders.forEach((order) => {
        // Gọi API lấy chi tiết sản phẩm cho mỗi đơn hàng ngay khi trang tải
        fetchOrderDetails(order._id).then((details) => {
          setOrderDetails((prevDetails) => ({ ...prevDetails, [order._id]: details }));
        });
      });
    }
  }, [orders]);

  useEffect(() => {
  }, [orderDetails]);

  return (
    <div className="w-full p-4">
      <h1 className="mb-3 text-3xl font-bold text-center text-gray-800">Lịch sử đơn hàng</h1>
      <p className="mb-6 text-lg text-center text-gray-600">Đơn hàng của bạn: <span className="font-semibold text-blue-600">{orders.length}</span> đơn hàng</p>

  
      {orders.map((order) => (
        <div
          key={order._id}
          className="p-4 mb-4 border rounded-lg shadow-md bg-gray-50"
        >
       <div className="flex items-center justify-between p-2 mb-4 text-white bg-blue-300 rounded-md">
       <span className="ml-2"><strong>Mã đơn hàng: </strong>{order.payOSOrderId}</span>
  <span className="px-4 py-1 mr-6 font-bold text-green-700 bg-white rounded-full">{order.status}</span>
</div>
          <p className="mb-4 ml-4"><strong>Thời điểm tạo đơn hàng:</strong> {new Date(order.createdAt).toLocaleDateString("vi-VN")}</p>
  
          {/* Hiển thị sản phẩm từ chi tiết đơn hàng */}
          <div className="p-4 bg-gray-50">
            {orderDetails[order?._id]?.productList?.slice(0, 2).map((product) => (
              <div key={product?.productId?._id} className="flex items-center mb-4">
                <img
                  src={product?.productId?.imageLink}
                  alt={product?.productId?.name}
                  className="object-cover w-20 h-20 mr-4"
                />
                <div>
                  <p className="font-semibold">{product?.productId?.name}</p>
                  <p>Số lượng: {product?.quantity}</p>
                  <p>Giá: {product?.productId?.price?.toLocaleString()}đ</p>
                </div>
              </div>
            ))}
  
            {/* Nếu có nhiều hơn 2 sản phẩm, hiển thị thông báo */}
            {orderDetails[order?._id]?.productList?.length > 2 && (
              <p>... và {orderDetails[order._id]?.productList.length - 2} sản phẩm khác</p>
            )}
          </div>
  
          <div className="flex items-center justify-between mt-4">
          <div className="flex">
            {/* Nút "Xem chi tiết" */}
            <button
              className="px-6 py-2 ml-5 mr-6 text-blue-500 border-2 border-blue-500 rounded-full hover:bg-cyan-200 hover:text-white"
              onClick={() => handleOrderClick(order?._id)} // Xử lý sự kiện Xem chi tiết
            >
              Xem chi tiết
            </button>

          </div>

          <p className="mr-5 font-bold">{order?.totalPrice ? order?.totalPrice?.toLocaleString() : "Chưa có giá"}đ</p>
          </div>
        </div>
      ))} 
    </div>
  );
  
  
};

export default OrderHistory;
