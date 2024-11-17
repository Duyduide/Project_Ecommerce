import React, { useEffect, useState } from 'react';
import { apiGetPhone } from '../apis'; 
import { useNavigate } from 'react-router-dom';
import '../css/Product.css';  

const ProductPhone = () => {
  const [phones, setPhones] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchPhones = async () => {
    const result = await apiGetPhone();
    if (result.success === false) {
      setError(result.message);
    } else {
      setPhones(result.slice(0, 5)); // Chỉ lấy 5 sản phẩm
    }
  };

  useEffect(() => {
    fetchPhones();
  }, []);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="product-phone-container">
      <h1 className="heading">Điện Thoại</h1>
      {error && <p className="error-message">Error: {error}</p>}
      <div className="product-list">
        {phones.length === 0 ? (
          <p className="no-data-message">Chưa có sản phẩm</p>
        ) : (
          phones.map((phone) => (
            <div key={phone._id} className="product-card" onClick={() => handleProductClick(phone._id)}>
              <img src={phone.imageLink} alt={phone.name} className="product-image" />
              <div className="product-details">
                <h2 className="product-name">{phone.name}</h2>
                <p className="product-price">{phone.price} VND</p>
                <p className="product-origin">Xuất xứ: {phone.origin}</p>
                <p className="product-description">{phone.description}</p>
                {/*<button className="add-to-cart-btn">Thêm vào giỏ</button>*/}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductPhone;