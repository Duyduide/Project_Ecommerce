import React, { useEffect, useState } from 'react';
import { apiGetHeadPhone } from '../apis'; 
import { useNavigate } from 'react-router-dom';
import '../css/Product.css';  

const ProductHeadphone = () => {
  const [headphones, setHeadphones] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchHeadPhones = async () => {
    const result = await apiGetHeadPhone();
    if (result.success === false) {
      setError(result.message);
    } else {
      setHeadphones(result.slice(0, 5)); // Chỉ lấy 5 sản phẩm
    }
  };

  useEffect(() => {
    fetchHeadPhones();
  }, []);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="product-phone-container">
      <h1 className="heading">Tai Nghe</h1>
      {error && <p className="error-message">Error: {error}</p>}
      <div className="product-list">
        {headphones.length === 0 ? (
          <p className="no-data-message">Chưa có sản phẩm</p>
        ) : (
          headphones.map((headphone) => (
            <div key={headphone._id} className="product-card" onClick={() => handleProductClick(headphone._id)}>
              <img src={headphone.imageLink} alt={headphone.name} className="product-image" />
              <div className="product-details">
                <h2 className="product-name">{headphone.name}</h2>
                <p className="product-price">{headphone.price} VND</p>
                <p className="product-origin">Xuất xứ: {headphone.origin}</p>
                <p className="product-description">{headphone.description}</p>
                {/*<button className="add-to-cart-btn">Thêm vào giỏ</button>*/}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductHeadphone;