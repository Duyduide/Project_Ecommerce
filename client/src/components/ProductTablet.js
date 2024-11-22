import React, { useEffect, useState } from 'react';
import { apiGetTablet } from '../apis'; 
import { useNavigate } from 'react-router-dom';

const ProductTablet = () => {
  const [tablets, setTablets] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchTablets = async () => {
    const result = await apiGetTablet();
    if (result.success === false) {
      setError(result.message);
    } else {
      setTablets(result.productData.slice(0, 5)); // Chỉ lấy 5 sản phẩm
    }
  };

  useEffect(() => {
    fetchTablets();
  }, []);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="product-phone-container">
      <h1 className="heading">Máy tính bảng</h1>
      {error && <p className="error-message">Error: {error}</p>}
      <div className="product-list">
        {tablets.length === 0 ? (
          <p className="no-data-message">Chưa có sản phẩm</p>
        ) : (
          tablets.map((tablet) => (
            <div key={tablet._id} className="product-card" onClick={() => handleProductClick(tablet._id)}>
              <img src={tablet.imageLink} alt={tablet.name} className="product-image" />
              <div className="product-details">
                <h2 className="product-name">{tablet.name}</h2>
                <p className="product-price">{tablet.price} VND</p>
                <p className="product-origin">Xuất xứ: {tablet.origin}</p>
                <p className="product-description">{tablet.description}</p>
                {/*<button className="add-to-cart-btn">Thêm vào giỏ</button>*/}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductTablet;