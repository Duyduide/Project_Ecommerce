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
  const handleSupportClick = (orderId) => {
    console.log("Hỗ trợ cho đơn hàng:", orderId);
    // Bạn có thể chuyển hướng đến một trang hỗ trợ hoặc mở modal hỗ trợ.
  };
  
  const handleReorderClick = (orderId) => {
    console.log("Mua lại đơn hàng:", orderId);
    // Bạn có thể tạo một yêu cầu để mua lại sản phẩm trong đơn hàng này.
  };
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
      console.error('Failed to fetch user orders:', error);
      setError('Lỗi kết nối đến server');
    }
  };

  // Lấy chi tiết đơn hàng từ API
  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await apiQueryOrderById(orderId);
      console.log("Full response:", response); // Log entire response
      if (response.success) {
        return response.orderData; // Trả về chi tiết đơn hàng
      } else {
        throw new Error("Không thể tải chi tiết đơn hàng");
      }
    } catch (error) {
      console.error(error.message);
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
    console.log("Order details:", orderDetails);
  }, [orderDetails]);

  return (
    <div className="w-full p-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-3">Lịch sử đơn hàng</h1>
      <p className="text-lg text-center text-gray-600 mb-6">Đơn hàng của bạn: <span className="font-semibold text-blue-600">{orders.length}</span> đơn hàng</p>

  
      {orders.map((order) => (
        <div
          key={order._id}
          className="border p-4 mb-4 bg-gray-50 rounded-lg shadow-md"
        >
       <div className="bg-orange-400 text-white p-2 rounded-md mb-4 flex justify-between items-center">
  <span><strong>Mã đơn hàng: </strong>{order._id}</span>
  <span className="bg-white text-green-700 px-4 py-1 rounded-full mr-6 font-bold">{order.status}</span>
</div>
          <p className="mb-4"><strong>Thời điểm tạo đơn hàng:</strong> {new Date(order.createdAt).toLocaleDateString("vi-VN")}</p>
  
          {/* Hiển thị sản phẩm từ chi tiết đơn hàng */}
          <div className="p-4 bg-gray-50">
            {orderDetails[order._id]?.productList?.slice(0, 2).map((product) => (
              <div key={product.productId._id} className="flex items-center mb-4">
                <img
                  src={product.productId.imageLink}
                  alt={product.productId.name}
                  className="w-20 h-20 object-cover mr-4"
                />
                <div>
                  <p className="font-semibold">{product.productId.name}</p>
                  <p>Số lượng: {product.quantity}</p>
                  <p>Giá: {product.productId.price?.toLocaleString()}đ</p>
                </div>
              </div>
            ))}
  
            {/* Nếu có nhiều hơn 2 sản phẩm, hiển thị thông báo */}
            {orderDetails[order._id]?.productList?.length > 2 && (
              <p>... và {orderDetails[order._id].productList.length - 2} sản phẩm khác</p>
            )}
          </div>
  
          <div className="flex justify-between items-center mt-4">
          <div className="flex">
            {/* Nút "Xem chi tiết" */}
            <button
              className="border-2 border-orange-500 text-red-500 py-2 px-6 rounded-full hover:bg-orange-500 hover:text-white mr-6"
              onClick={() => handleOrderClick(order._id)} // Xử lý sự kiện Xem chi tiết
            >
              Xem chi tiết
            </button>

            {/* Nút "Hỗ trợ" */}
            <button
              className="border-2 border-orange-500 text-red-500 py-2 px-6 rounded-full hover:bg-orange-500 hover:text-white mr-6"
              onClick={() => handleSupportClick(order._id)} // Xử lý sự kiện Hỗ trợ
            >
              Hỗ trợ
            </button>

            {/* Nút "Mua lại" */}
            <button
              className="bg-orange-500 text-white py-2 px-6 rounded-full hover:bg-orange-700"
              onClick={() => handleReorderClick(order._id)} // Xử lý sự kiện Mua lại
            >
              Mua lại
            </button>
          </div>

          <p className="font-bold mr-5">{order.totalPrice ? order.totalPrice.toLocaleString() : "Chưa có giá"}đ</p>
          </div>
        </div>
      ))} 
    </div>
  );
  
  
};

export default OrderHistory;
