import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGetProductById } from '../apis/product'; 
import '../css/Detail.css';

const DetailProduct = () => {
  const { productId } = useParams(); // Lấy productId từ URL
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  

  const fetchProductDetails = async () => {
    const result = await apiGetProductById(productId);
    if (result.success === false) {
      setError(result.message);
    } else {
      setProduct(result.productData);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!product) {
    return <p className="loading-message">Loading...</p>;
  }

  return (
    <div className="product-detail-container">
      <div className="product-header">
        <h1>{product.name}</h1>
        <p className="product-price">{product.price} VND</p>
      </div>
      
      <div className="product-detail">
        <div className="product-image-container">
          <img src={product.imageLink} alt={product.name} className="product-image" />
        </div>

        <div className="product-info">
          <div className="product-info-item">
            <p className="info-label">Xuất xứ:</p>
            <p>{product.origin}</p>
          </div>

          <div className="product-info-item">
            <p className="info-label">Mô tả:</p>
            <p>{product.description}</p>
          </div>

          <div className="product-info-item">
            <p className="info-label">Nhà sản xuất:</p>
            <p>{product.manufacturer}</p>
          </div>

          <div className="product-info-item">
            <p className="info-label">Chip:</p>
            <p>{product.processor}</p>
          </div>

          <div className="product-info-item">
            <p className="info-label">RAM/ROM:</p>
            <p>{product.ramRom}</p>
          </div>

          <div className="product-info-item">
            <p className="info-label">Pin:</p>
            <p>{product.battery}</p>
          </div>

          <div className="product-info-item">
            <p className="info-label">Camera:</p>
            <p>{product.camera}</p>
          </div>

          <div className="product-info-item">
            <p className="info-label">Màn hình:</p>
            <p>{product.screen}</p>
          </div>

          <div className="product-info-item">
            <p className="info-label">Kết nối:</p>
            <p>{product.connection}</p>
          </div>

          <div className="product-info-item">
            <p className="info-label">SIM:</p>
            <p>{product.sim}</p>
          </div>

          <div className="product-info-item">
            <p className="info-label">Kho còn:</p>
            <p>{product.stock} sản phẩm</p>
          </div>

          <div className="product-info-item">
            <p className="info-label">Bảo hành:</p>
            <p>{product.warrantyPeriod} - Chính sách: {product.warrantyPolicy}</p>
          </div>

          <div className="product-info-item">
            <p className="info-label">Đánh giá:</p>
            <p>{product.rating} sao</p>
          </div>
        </div>
      </div>
      
      <div className="product-action">
        <button className="btn-add-to-card">Thêm vào giỏ hàng</button>
        <button className="btn-compare">So sánh</button>
      </div>
    </div>
  );
};

export default DetailProduct;
