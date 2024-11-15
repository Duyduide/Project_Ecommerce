import React, { useEffect, useState } from 'react';
import { apiGetLaptop } from '../apis'; 
import { useNavigate } from 'react-router-dom';
import '../css/Product.css';  

const ProductLaptop = () => {
  const [laptops, setLaptops] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchLaptops = async () => {
    const result = await apiGetLaptop();
    if (result.success === false) {
      setError(result.message);
    } else {
      setLaptops(result.slice(0, 5)); // Chỉ lấy 5 sản phẩm
    }
  };

  useEffect(() => {
    fetchLaptops();
  }, []);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="product-phone-container">
      <h1 className="heading">Máy tính</h1>
      {error && <p className="error-message">Error: {error}</p>}
      <div className="product-list">
        {laptops.length === 0 ? (
          <p className="no-data-message">Chưa có sản phẩm</p>
        ) : (
          laptops.map((laptop) => (
            <div key={laptop._id} className="product-card" onClick={() => handleProductClick(laptop._id)}>
              <img src={laptop.imageLink} alt={laptop.name} className="product-image" />
              <div className="product-details">
                <h2 className="product-name">{laptop.name}</h2>
                <p className="product-price">{laptop.price} VND</p>
                <p className="product-origin">Xuất xứ: {laptop.origin}</p>
                <p className="product-description">{laptop.description}</p>
                {/*<button className="add-to-cart-btn">Thêm vào giỏ</button>*/}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductLaptop;