import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import '../css/Cart.css';

const DetailCart = () => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

  useEffect(() => {
    // Lấy giỏ hàng từ localStorage khi component được mount
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    // Cập nhật lại localStorage khi cart thay đổi
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleRemoveItem = (productId, productAttributes) => {
    const { name, price, imageLink } = productAttributes;
    const updatedCart = cart.filter(
      (item) =>
        !(
          item.id === productId &&
          item.name === name &&
          item.price === price &&
          item.imageLink === imageLink
        )
    );
    setCart(updatedCart);
  };

  const handleChangeQuantity = (productId, newQuantity, productAttributes) => {
    const { name, price, imageLink } = productAttributes;

    const updatedCart = cart.map((item) => {
      // Xác định sản phẩm cần thay đổi dựa trên tất cả thuộc tính
      if (
        item.id === productId &&
        item.name === name &&
        item.price === price &&
        item.imageLink === imageLink
      ) {
        const validQuantity = Math.max(1, Math.min(newQuantity, item.stock)); // Giới hạn số lượng
        return { ...item, quantity: validQuantity };
      }
      return item; // Giữ nguyên các sản phẩm khác
    });

    setCart(updatedCart);
  };

  const calculateTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  return (
    <div className="cart-container">
      <h1>Giỏ Hàng</h1>
      {cart.length === 0 ? (
        <p>
          Giỏ hàng của bạn hiện trống. Hãy <Link to="/products">mua sắm</Link> ngay!
        </p>
      ) : (
        <div>
          <ul className="cart-items-list">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="cart-item-details">
                  <img src={item.imageLink} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-info">
                    <p className="cart-item-name">{item.name}</p>
                    <p className="cart-item-price">{formatCurrency(item.price)}</p>
                    <div className="cart-item-quantity">
                      <button
                        onClick={() =>
                          handleChangeQuantity(item.id, item.quantity - 1, {
                            name: item.name,
                            price: item.price,
                            imageLink: item.imageLink,
                          })
                        }
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>Số lượng: {item.quantity}</span>
                      <button
                        onClick={() =>
                          handleChangeQuantity(item.id, item.quantity + 1, {
                            name: item.name,
                            price: item.price,
                            imageLink: item.imageLink,
                          })
                        }
                        disabled={item.quantity >= item.stock}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="btn-remove"
                      onClick={() =>
                        handleRemoveItem(item.id, {
                          name: item.name,
                          price: item.price,
                          imageLink: item.imageLink,
                        })
                      }
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <p>
              <strong>Tổng cộng:</strong> {formatCurrency(calculateTotal)}
            </p>
            <Link to="/checkout">
              <button className="btn-checkout">Phương thức thanh toán</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailCart;
