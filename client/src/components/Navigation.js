import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import path from '../utils/path';
import { getCurrent } from '../store/user/asyncActions'
import { useSelector, useDispatch } from 'react-redux'
import { IoLogOut } from "react-icons/io5";
import { MdManageAccounts } from "react-icons/md";
import { LuMenuSquare } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { logout } from '../store/user/userSlice'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

const categories = [
  {
    name: 'Điện thoại, Tablet',
    subCategories: ['iPhone', 'Samsung', 'Oppo', 'Xiaomi', 'iPad', 'Samsung Tab']
  },
  {
    name: 'Laptop',
    subCategories: ['MacBook', 'Dell', 'HP', 'Lenovo', 'Asus', 'Gaming Laptop']
  },
  {
    name: 'Âm thanh',
    subCategories: ['Tai nghe', 'Loa bluetooth', 'Soundbar', 'Micro']
  },
  {
    name: 'Đồng hồ, Camera',
    subCategories: ['Apple Watch', 'Samsung Watch', 'Camera DSLR', 'Camera Mirrorless']
  },
  {
    name: 'Đồ gia dụng',
    subCategories: ['Nồi cơm điện', 'Máy lọc không khí', 'Quạt điện', 'Máy hút bụi']
  },
  {
    name: 'Phụ kiện',
    subCategories: ['Sạc dự phòng', 'Cáp sạc', 'Ốp lưng', 'Bàn phím']
  },
  {
    name: 'PC, Màn hình, Máy in',
    subCategories: ['PC Gaming', 'PC Văn phòng', 'Màn hình Gaming', 'Máy in']
  },
  {
    name: 'Tivi',
    subCategories: ['Samsung', 'LG', 'Sony', 'TCL']
  },
  {
    name: 'Thu cũ đổi mới',
    subCategories: ['Thu iPhone cũ', 'Thu iPad cũ', 'Thu laptop cũ']
  },
  {
    name: 'Hàng cũ',
    subCategories: ['iPhone cũ', 'iPad cũ', 'Laptop cũ', 'Đồng hồ cũ']
  },
  {
    name: 'Khuyến mãi',
    subCategories: ['Flash Sale', 'Giảm sốc', 'Ưu đãi', 'Combo tiết kiệm']
  },
  {
    name: 'Tin công nghệ',
    subCategories: ['Tin tức', 'Đánh giá', 'Mẹo hay', 'Thủ thuật']
  }
];

const Navigation = () => {
  const [showProducts, setShowProducts] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate(); // Hook điều hướng từ react-router-dom

  const dispatch = useDispatch();

  const { isLoggedIn, current }  = useSelector(state => state.user)
  useEffect(() => { 
    if (isLoggedIn) {
      dispatch(getCurrent())
    }
  }, [dispatch, isLoggedIn])

  const handleSearch = () => {
    if (searchQuery) {
      navigate(`/search?query=${searchQuery}`); // Điều hướng đến trang tìm kiếm sản phẩm
    }
  };
  const handleCategoryClick = (subCategory) => {
    navigate(`/category/${subCategory}`); // Điều hướng đến trang sản phẩm của danh mục con
  };

  const handleLogin = () => {
    navigate(path.LOGIN); // Điều hướng đến trang đăng nhập
  };

  const handleOrderLookup = () => {
    if (isLoggedIn) {
      navigate('/order-lookup'); // Điều hướng đến trang tra cứu đơn hàng
    } else {
      navigate('/login'); // Nếu chưa đăng nhập, điều hướng đến trang đăng nhập
    }
  };
  const userButtonClasses = 
  "flex items-center gap-2 border rounded-md bg-slate-500 bg-opacity-20 px-1 py-2 hover:text-gray-200 text-xs";
  return (
    <div className="bg-blue-200 w-full">
      {/* Khung giới hạn nội dung thanh điều hướng */}
      <div className="w-main h-[48px] py-2  mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          {/* Products Dropdown */}
          <div className="relative">
            <button
              className="flex items-center space-x-1 hover:text-gray-200"
              onMouseEnter={() => setShowProducts(true)}
              onClick={() => setShowProducts(!showProducts)}
            >
              <span>Sản phẩm</span>
              <ChevronDown size={20} />
            </button>

            {/* Products Menu */}
            {showProducts && (
              <div
                className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg z-50"
                onMouseLeave={() => {
                  setShowProducts(false);
                  setActiveCategory(null);
                }}
              >
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className="relative"
                    onMouseEnter={() => setActiveCategory(index)}
                  >
                    <div className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer">
                      {category.name}
                    </div>

                    {/* Subcategories */}
                    {activeCategory === index && (
                      <div className="absolute left-full top-0 w-64 bg-white rounded-md shadow-lg">
                        {category.subCategories.map((sub, subIndex) => (
                          <div
                            key={subIndex}
                            className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleCategoryClick(sub)}
                          >
                            {sub}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Lookup */}
          <div
            className="cursor-pointer hover:text-gray-200"
            onClick={handleOrderLookup}
          >
            Tra cứu đơn hàng
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <input
            type="search"
            placeholder="Search products"
            className="px-4 py-1 rounded-md text-gray-800 w-72"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />

          {/* Cart */}
          <div className="cursor-pointer hover:text-gray-200">
            <img src="giohangwhite.png" alt="Cart" className="h-7" />
          </div>

          {/* Login/User Info */}
          {isLoggedIn ? (
          <Menu as="div" className="relative inline-block text-left">
            <MenuButton className={userButtonClasses}>
              <FaRegUserCircle className="text-xl" />
              <span className="text-sm">{`${current?.lastname}`}</span>
              <ChevronDown className="h-5 w-5 text-gray-400" />
            </MenuButton>
            <MenuItems
              className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg"
            >
              <div className="py-1">
                <MenuItem>
                  {({ active }) => (
                    <button
                      onClick={() => { navigate('/account') }}
                      className={`${
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      } block w-full text-left px-4 py-2 text-sm`}
                    >
                      <MdManageAccounts className="mr-2 h-5 w-5 text-gray-500" />
                      Thông tin tài khoản
                    </button>
                  )}
                </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <button
                        type="button"
                        onClick={ () => { dispatch(logout()) } }
                        className={`${
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } block w-full text-left px-4 py-2 text-sm`}
                      >
                        <IoLogOut className="mr-2 h-5 w-5 text-gray-500" />
                        Đăng xuất
                      </button>
                    )}
                  </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        ) : (
          <button
            className={userButtonClasses}
            onClick={handleLogin}
          >
            <FaRegUserCircle className="text-xl" />
            <span className="px-0.5 text-sm">Đăng nhập</span>
          </button>
        )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
