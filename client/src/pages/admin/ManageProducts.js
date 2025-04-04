import React, { useState, useEffect } from 'react';
import { apiFetchProductByPage, apiFetchProductByName, apiDeleteProduct } from 'apis'
import Swal from 'sweetalert2';
import UpdateProduct from './UpdateProduct'
import { set } from 'react-hook-form';

const ManageProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortField, setSortField] = useState('updatedAt');
    const [sortOrder, setSortOrder] = useState('descend');
    const [editProduct, setEditProduct] = useState(null);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 10;

    useEffect(() => {
        fetchProducts();
    }, [currentPage, sortField, sortOrder]);

    const handleEditProduct = (productId) => {
        setEditProduct(productId) // Store only the ID
    };

    const fetchProducts = async () => {
        setLoading(true);
        const response = await apiFetchProductByPage('all', currentPage, sortField, sortOrder, pageSize);
        if (response.success) {
            setProducts(response.productData);
            setTotalPages(Math.ceil(response.totalProducts / pageSize));
            setLoading(false);
        } 
    };

    const handleSearch = async () => {
        if (searchTerm.trim()) {
            setLoading(true);
            const response = await apiFetchProductByName(searchTerm);
            if (response.success) {
                setProducts(response.productData);
            } 
            setLoading(false);
        } else {
            // If search term is empty, fetch all products
            fetchProducts();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setCurrentPage(1); // Reset to first page when searching
            handleSearch();
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            const result = await Swal.fire({
                title: 'Xác nhận xóa',
                text: 'Bạn có chắc chắn muốn xóa sản phẩm này?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Xóa',
                cancelButtonText: 'Hủy'
            });

            if (result.isConfirmed) {
                const response = await apiDeleteProduct(productId);
                
                if (response.success) {
                    Swal.fire({
                        title: 'Thành công',
                        text: 'Đã xóa sản phẩm thành công',
                        icon: 'success'
                    });

                    // Check if current page has only one product
                    if (products.length === 1 && currentPage > 1) {
                        setCurrentPage(prev => prev - 1);
                    } else {
                        fetchProducts();
                    }
                } else {
                    Swal.fire({
                        title: 'Lỗi',
                        text: 'Không thể xóa sản phẩm',
                        icon: 'error'
                    });
                }
            }
        } catch (error) {
            Swal.fire({
                title: 'Lỗi',
                text: 'Đã xảy ra lỗi khi xóa sản phẩm',
                icon: 'error'
            });
        }
    };

    return (
        <div className="container relative flex flex-col p-6 py-10 mx-auto w-main">
          { editProduct && <div className='absolute inset-0 min-h-screen bg-white'>
              <UpdateProduct 
                productId={editProduct}
                setEditProduct={setEditProduct}
                />
            </div>
          }
            
            {/* Search Bar */}
            <div className="mb-6">
                <input
                    placeholder="Tìm kiếm sản phẩm theo tên..."
                    className="w-full px-4 py-2 border-2 rounded-lg border-sky-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => {setSearchTerm(e.target.value);}}
                    onKeyDown={handleKeyDown}
                />
            </div>

            {/* Product Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="text-white bg-sky-800">
                            <th className="px-6 py-3 text-left">STT</th>
                            <th className="px-6 py-3 text-left">Hình ảnh</th>
                            <th className="px-6 py-3 text-left">Tên sản phẩm</th>
                            <th className="px-6 py-3 text-left">Loại</th>
                            <th className="px-6 py-3 text-right">Giá</th>
                            <th className="px-6 py-3 text-center">Tồn kho</th>
                            <th className="px-6 py-3 text-center">Đánh giá</th>
                            <th className="px-6 py-3 text-center">Cập nhật</th>
                            <th className="px-6 py-3 text-center">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {loading ? (
                            <tr>
                                <td colSpan="9" className="px-6 py-4 text-center">
                                    Đang tải...
                                </td>
                            </tr>
                        ) : products.length === 0 ? (
                            <tr>
                                <td colSpan="9" className="px-6 py-4 text-center">
                                    Không tìm thấy sản phẩm
                                </td>
                            </tr>
                        ) : (
                            products.map((product, index) => (
                                <tr key={product._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        {(currentPage - 1) * pageSize + index + 1}
                                    </td>
                                    <td className="px-6 py-4">
                                        <img
                                            src={product.imageLink || '/placeholder-image.jpg'}
                                            alt={product.name}
                                            className="object-cover w-12 h-12 rounded"
                                        />
                                    </td>
                                    <td className="px-6 py-4 font-medium">{product.name}</td>
                                    <td className="px-6 py-4 capitalize">{product.__t || 'product'}</td>
                                    <td className="px-6 py-4 text-right">
                                        {new Intl.NumberFormat('vi-VN', { 
                                            style: 'currency', 
                                            currency: 'VND' 
                                        }).format(product.price)}
                                    </td>
                                    <td className="px-6 py-4 text-center">{product.stock}</td>
                                    <td className="px-6 py-4 text-center">{product.rating}</td>
                                    <td className="px-6 py-4 text-center whitespace-nowrap">
                                        {new Date(product.updatedAt).toLocaleDateString('vi-VN')}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex justify-center space-x-2">
                                            <button
                                                className="px-3 py-1 text-white transition-colors bg-blue-500 rounded hover:bg-blue-600"
                                                onClick={() => {handleEditProduct(product._id)}}
                                            >
                                                Sửa
                                            </button>
                                            <button
                                                className="px-3 py-1 text-white transition-colors bg-red-500 rounded hover:bg-red-600"
                                                onClick={() => {handleDeleteProduct(product._id);}}
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
                        products.length < pageSize
                            ? 'bg-gray-300 cursor-not-allowed' 
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    disabled={products.length < pageSize}
                >
                    Trang sau
                </button>
            </div>
        </div>
    );
};

export default ManageProduct;