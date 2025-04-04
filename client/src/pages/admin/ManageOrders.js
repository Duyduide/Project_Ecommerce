import React, { useState, useEffect } from 'react';
import { apiQueryAllOrders, apiUpdateOrder, apiDeleteOrder, apiGetOrdersByPayOSOrderId } from 'apis';
import Swal from 'sweetalert2';

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 10;

    const statusColors = {
        'Processing': 'bg-yellow-100 text-yellow-800',
        'Delivering': 'bg-purple-100 text-purple-800',
        'Delivered': 'bg-green-100 text-green-800',
        'Cancelled': 'bg-red-100 text-red-800'
    };
    const statusMap = {
        Processing: 'Đang xử lý',
        Delivering: 'Đang giao hàng',
        Delivered: 'Đã giao hàng thành công',
        Cancelled: 'Đã hủy',
      };
    useEffect(() => {
        fetchOrders();
    }, [currentPage]);

    const fetchOrders = async () => {
        setLoading(true);
        const response = await apiQueryAllOrders(currentPage, pageSize);
        if (response.success) {
            setOrders(response.orderData);
            setTotalPages(Math.ceil(response.totalOrders / pageSize));
        }
        setLoading(false);
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const result = await Swal.fire({
                title: 'Xác nhận thay đổi',
                text: `Bạn có chắc chắn muốn chuyển trạng thái đơn hàng sang "${newStatus}"?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Xác nhận',
                cancelButtonText: 'Hủy'
            });

            if (result.isConfirmed) {
                const response = await apiUpdateOrder(orderId, {status: newStatus});
                if (response.success) {
                    Swal.fire({
                        title: 'Thành công',
                        text: 'Cập nhật trạng thái đơn hàng thành công',
                        icon: 'success'
                    });
                    fetchOrders();
                }
            }
        } catch (error) {
            Swal.fire({
                title: 'Lỗi',
                text: 'Đã xảy ra lỗi khi cập nhật trạng thái đơn hàng',
                icon: 'error'
            });
        }
    };
    const handleUpdate = async (orderId) => {
        // Find the current order
        const currentOrder = orders.find(order => order._id === orderId);
        
        const { value: formValues } = await Swal.fire({
            title: 'Cập nhật thông tin đơn hàng',
            html: `
                <div class="space-y-4">
                    <div class="text-left">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Tên khách hàng</label>
                        <input
                            id="swal-name"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value="${currentOrder.name}"
                        />
                    </div>
                    <div class="text-left">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            id="swal-email"
                            type="email"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value="${currentOrder.email}"
                        />
                    </div>
                    <div class="text-left">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                        <input
                            id="swal-phone"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value="${currentOrder.phone}"
                        />
                    </div>
                    <div class="text-left">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
                        <textarea
                            id="swal-address"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="2"
                        >${currentOrder.address}</textarea>
                    </div>
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: 'Cập nhật',
            cancelButtonText: 'Hủy',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            focusConfirm: false,
            preConfirm: () => {
                const name = document.getElementById('swal-name').value;
                const email = document.getElementById('swal-email').value;
                const phone = document.getElementById('swal-phone').value;
                const address = document.getElementById('swal-address').value;
                return { name, email, phone, address };
            }
        });
        if (formValues) {
            try {
                const response = await apiUpdateOrder(orderId, formValues);
                
                if (response.success) {
                    await Swal.fire({
                        title: 'Thành công',
                        text: 'Cập nhật thông tin đơn hàng thành công',
                        icon: 'success'
                    });
                    fetchOrders(); // Refresh the orders list
                } else {
                    throw new Error('Cập nhật thất bại');
                }
            } catch (error) {
                await Swal.fire({
                    title: 'Lỗi',
                    text: 'Đã xảy ra lỗi khi cập nhật thông tin đơn hàng',
                    icon: 'error'
                });
            }
        }
    };
    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            fetchOrders();
            return;
        }

        setLoading(true);
        try {
            const response = await apiGetOrdersByPayOSOrderId(searchTerm);
            if (response.success) {
                setOrders(response.orderData);
            } else {
                setOrders([]);
            }
        } catch (error) {
            setOrders([]);
        } finally {
            setLoading(false);
        }
    };
    const handleDelete = async (orderId) => { 
        try {
            const result = await Swal.fire({
                title: 'Xác nhận xóa',
                text: `Bạn có chắc chắn muốn xóa đơn hàng?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Xác nhận',
                cancelButtonText: 'Hủy'
            });
            if(result.isConfirmed) {
                const response = await apiDeleteOrder(orderId);
                if(response.success) {
                    Swal.fire({
                        title: 'Thành công',
                        text: 'Đã xóa đơn hàng thành công',
                        icon: 'success'
                    });
                    fetchOrders();
                }   
            }
        }
        catch {
            Swal.fire({
                title: 'Lỗi',
                text: 'Đã xảy ra lỗi khi xóa sản phẩm',
                icon: 'error'
            });
        }
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="container relative flex flex-col p-6 py-10 mx-auto w-main">
            {/* Search Bar */}
            <div className="mb-6">
                <input
                    placeholder="Tìm kiếm đơn hàng theo mã đơn hàng..."
                    className="w-full px-4 py-2 border-2 rounded-lg border-sky-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="text-white bg-sky-800">
                            <th className="px-4 py-3 text-left">Mã đơn hàng</th>
                            <th className="px-4 py-3 text-left">Khách hàng</th>
                            <th className="px-6 py-3 text-right">Tổng tiền</th>
                            <th className="px-6 py-3 text-center">Trạng thái</th>
                            <th className="px-6 py-3 text-center">Phương thức thanh toán</th>
                            <th className="px-6 py-3 text-center">Ngày đặt</th>
                            <th className="px-6 py-3 text-center">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {loading ? (
                            <tr>
                                <td colSpan="8" className="px-6 py-4 text-center">
                                    Đang tải...
                                </td>
                            </tr>
                        ) : orders.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="px-6 py-4 text-center">
                                    Không tìm thấy đơn hàng
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-50">
                                    <td className="px-4 py-4 font-medium">
                                        {order.payOSOrderId}
                                    </td>
                                    <td className="px-4 py-4">
                                        <div>{order.name}</div>
                                        <div className="text-sm text-gray-500">{order.email}</div>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-right">
                                            {new Intl.NumberFormat('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND'
                                            }).format(order.totalPrice)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={order.status}
                                            onChange={e => handleStatusChange(order._id, e.target.value)}
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status]}`}
                                        >
                                            {['Processing', 'Delivering', 'Delivered', 'Cancelled'].map((status) => (
                                                <option 
                                                    key={status} 
                                                    value={status}
                                                    className='text-sm font-medium'
                                                >
                                                        {statusMap[status]}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium">
                                            <span>
                                                {order.paymentMethod === 'COD' ? 'Thanh toán khi nhận hàng' : 'Quét mã VietQR'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center whitespace-nowrap">
                                        {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                                    </td>
                                    <td className="px-6 py-4 ">
                                        <div className='flex flex-col space-y-2'>
                                            <button
                                                className="px-3 py-1 text-white transition-colors bg-blue-500 rounded hover:bg-blue-600"
                                                onClick={() => { handleUpdate(order._id) }}
                                            >
                                                Sửa
                                            </button>
                                            <button
                                                className="px-3 py-1 text-white transition-colors bg-red-500 rounded hover:bg-red-600"
                                                onClick={() => { handleDelete(order._id) }}
                                            >
                                                Xóa
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6 space-x-2">
                <button
                    className={`px-4 py-2 rounded transition-colors ${
                        currentPage === 1 
                            ? 'bg-gray-300 cursor-not-allowed' 
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Trang trước
                </button>
                <span className="px-4 py-2">
                    Trang {currentPage} của {totalPages}
                </span>
                <button
                    className={`px-4 py-2 rounded transition-colors ${
                        orders.length < pageSize
                            ? 'bg-gray-300 cursor-not-allowed' 
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    disabled={orders.length < pageSize}
                >
                    Trang sau
                </button>
            </div>
        </div>
    );
};

export default ManageOrders;