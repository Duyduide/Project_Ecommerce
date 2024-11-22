import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { apiGetProductById } from '../apis/product';
import '../css/Detail.css';

const DetailProduct = () => {
  const { productId } = useParams(); 
  const [productDetail, setProductDetail] = useState(null); 
  const [error, setError] = useState(null);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [isAdded, setIsAdded] = useState(false); 
  const [quantity, setQuantity] = useState(1); 

  const location = useLocation();
  const product = location.state?.product; 
  const [cartCount, setCartCount] = useState(cart.length); // Thêm state cartCount
  const fetchProductDetails = async () => {
    try {
      const result = await apiGetProductById(productId);
      if (result.success === false) {
        setError(result.message);
      } else {
        setProductDetail(result.productData);
        setQuantity(1); 
      }
    } catch (err) {
      setError('Lỗi khi tải dữ liệu sản phẩm');
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);
// trang navigate
  // useEffect(() => {
  //   // Cập nhật lại giỏ hàng khi có thay đổi
  //   localStorage.setItem('cart', JSON.stringify(cart));
  // }, [cart]);
  useEffect(() => {
    // Cập nhật lại giỏ hàng và số lượng giỏ hàng khi có thay đổi
    localStorage.setItem('cart', JSON.stringify(cart));
    setCartCount(cart.length); 
  }, [cart]);


  const handleAddToCart = (product) => {
    const newProduct = {
      id: product.id,
      name: product.name,
      imageLink: product.imageLink,
      price: product.price,
      stock: product.stock,
      quantity,
    };
  

    const existingProduct = cart.find(
      (item) =>
        item.id === newProduct.id &&
        item.name === newProduct.name &&
        item.price === newProduct.price &&
        item.imageLink === newProduct.imageLink &&
        item.quantity === newProduct.quantity
    );
 
    let updatedCart;
    if (existingProduct) {

      updatedCart = cart.map((item) => {
        if (item === existingProduct) {
          return { ...item, quantity: item.quantity + quantity };
        }
        return item;
      });
    } else {
  
      updatedCart = [...cart, newProduct];
    }

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  
    setIsAdded(true);
  
    setTimeout(() => {
      setIsAdded(false);
    }, 3000);
  };

  const handleQuantityChange = (event) => {
    let value = Math.max(1, event.target.value);
    if (productDetail && value > productDetail.stock) {
      value = productDetail.stock; 
    }
    setQuantity(value);
  };

  const increaseQuantity = () => {
    if (productDetail && quantity < productDetail.stock) {
      setQuantity(prevQuantity => prevQuantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!productDetail) {
    return <p className="loading-message">Đang tải...</p>;
  }


  return (
    <div className="product-detail-container">
      <div className="product-header">
        <h1>{productDetail.name}</h1>
        <p className="product-price">{productDetail.price} VND</p>
      </div>
       {/* Hiển thị số lượng sản phẩm trong giỏ hàng */}
       {/* <div className="cart-info">
        <p>Giỏ hàng của bạn: {cartCount} sản phẩm</p>
      </div> */}
      <div className="product-detail">
        <div className="product-image-container">
          <img src={productDetail.imageLink} alt={productDetail.name} className="product-image" />
        </div>

        <div className="product-info">
          <div className="product-info-item">
            <p className="info-label">Xuất xứ:</p>
            <p>{productDetail.origin}</p>
          </div>

          <div className="product-info-item">
            <p className="info-label">Mô tả:</p>
            <p>{productDetail.description}</p>
          </div>

          <div className="product-info-item">
            <p className="info-label">Nhà sản xuất:</p>
            <p>{productDetail.manufacturer}</p>
          </div>

          <div className="product-info-item">
            <p className="info-label">Chip:</p>
            <p>{productDetail.processor}</p>
          </div>

          <div className="product-info-item">
            <p className="info-label">RAM/ROM:</p>
            <p>{productDetail.ramRom}</p>
          </div>

          <div className="product-info-item">
            <p className="info-label">Pin:</p>
            <p>{productDetail.battery}</p>
          </div>

          <div className="product-info-item">
            <p className="info-label">Camera:</p>
            <p>{productDetail.camera}</p>
          </div>

          <div className="product-info-item">
            <p className="info-label">Màn hình:</p>
            <p>{productDetail.screen}</p>
          </div>

          <div className="product-info-item">
            <p className="info-label">Kết nối:</p>
            <p>{productDetail.connection}</p>
          </div>

          <div className="product-info-item">
            <p className="info-label">SIM:</p>
            <p>{productDetail.sim}</p>
          </div>

          <div className="product-info-item">
            <p className="info-label">Kho còn:</p>
            <p>{productDetail.stock} sản phẩm</p>
          </div>

          <div className="product-info-item">
            <p className="info-label">Bảo hành:</p>
            <p>{productDetail.warrantyPeriod} - Chính sách: {productDetail.warrantyPolicy}</p>
          </div>

          <div className="product-info-item">
            <p className="info-label">Đánh giá:</p>
            <p>{productDetail.rating} sao</p>
          </div>
        </div>
      </div>
      
      <div className="product-action">
        <div className="quantity-selector">
          <label htmlFor="quantity">Số lượng: </label>
          <div className="quantity-input">
            <button className="quantity-btn" onClick={decreaseQuantity}>-</button>
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
            />
            <button className="quantity-btn" onClick={increaseQuantity}>+</button>
          </div>
        </div>

        <button className="btn-add-to-card" onClick={() => handleAddToCart(productDetail)}>Thêm vào giỏ hàng</button>

        {isAdded && (
          <div className="cart-notification">
            <p>Sản phẩm đã được thêm vào giỏ hàng</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailProduct;