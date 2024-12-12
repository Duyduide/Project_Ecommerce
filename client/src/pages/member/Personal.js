import React, { useState, useEffect } from 'react';
import { Address } from 'components';
import { useSelector } from 'react-redux';
import { apiUpdateUser } from 'apis';
import Swal from 'sweetalert2';
import { UserCog, MapPin } from 'lucide-react';

const Personal = () => {
  const { current } = useSelector(state => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddressPopup, setShowAddressPopup] = useState(false);
  const [userAddress, setUserAddress] = useState('');
  
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    mobile: '',
    email: ''
  });

  useEffect(() => {
    if (current) {
      setFormData({
        firstname: current.firstname || '',
        lastname: current.lastname || '',
        mobile: current.mobile || '',
        email: current.email || ''
      });
      setUserAddress(current.address || '');
    }
  }, [current]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleAddressChange = (address) => {
    setUserAddress(address);
  };

  const handleAddressSubmit = () => {
    setShowAddressPopup(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!current?._id) {
      Swal.fire('Lỗi', 'Không tìm thấy thông tin người dùng', 'error');
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiUpdateUser(current._id, {
        ...formData,
        address: userAddress
      });
      
      if (response.success) {
        Swal.fire('Thành công', 'Đã cập nhật thông tin tài khoản', 'success');
      } else {
        Swal.fire('Thất bại', 'Đã xảy ra lỗi', 'error');
      }
    } catch (error) {
      Swal.fire('Thất bại', 'Đã xảy ra lỗi khi cập nhật thông tin', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="w-full p-4 px-10">
        <div className="flex items-center justify-center gap-2 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Thông tin tài khoản</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-10 p-6 mb-4 border rounded-lg shadow-md bg-gray-50">
          <div className="flex flex-row justify-between gap-4">
            <div className="flex flex-col flex-1 w-full gap-2">
              <label className="font-semibold" htmlFor="lastname">Họ</label>
              <input
                id="lastname"
                placeholder="Nhập họ"
                className="w-full p-2 transition-colors border border-gray-200 rounded-md shadow-inner outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={formData.lastname}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col flex-1 w-full gap-2">
              <label className="font-semibold" htmlFor="firstname">Tên</label>
              <input
                id="firstname"
                placeholder="Nhập tên"
                className="w-full p-2 transition-colors border border-gray-200 rounded-md shadow-inner outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={formData.firstname}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex flex-col flex-1 gap-2">
              <label className="font-semibold" htmlFor="mobile">Số điện thoại</label>
              <input
                id="mobile"
                placeholder="Nhập số điện thoại"
                className="w-full p-2 transition-colors border border-gray-200 rounded-md shadow-inner outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={formData.mobile}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <label className="font-semibold" htmlFor="email">Địa chỉ email</label>
              <input
                type="email"
                id="email"
                placeholder="Nhập địa chỉ email"
                className="w-full p-2 transition-colors border border-gray-200 rounded-md shadow-inner outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold">Địa chỉ</label>
            <div 
              onClick={() => setShowAddressPopup(true)}
              className="flex items-center gap-2 p-2 transition-colors border border-gray-200 rounded-md cursor-pointer hover:border-blue-500"
            >
              <MapPin className="w-5 h-5 text-gray-500" />
              <span>{userAddress || "Chọn địa chỉ"}</span>
            </div>
          </div>

          {showAddressPopup && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-xl">
                <div className="flex justify-between mb-4">
                  <h2 className="text-xl font-bold">Chọn địa chỉ</h2>
                  <button 
                    type="button"
                    onClick={() => setShowAddressPopup(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                <Address 
                  onAddressChange={handleAddressChange}
                />
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddressPopup(false)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100"
                  >
                    Hủy
                  </button>
                  <button
                    type="button"
                    onClick={handleAddressSubmit}
                    className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Xác nhận
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className={`px-6 py-3 text-white rounded-md transition-all transform 
                ${isLoading 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg active:scale-95'
                }
                flex items-center gap-2`}
            >
              <UserCog className="w-5 h-5" />
              {isLoading ? 'Đang cập nhật...' : 'Cập nhật thông tin'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Personal;