import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { apiFetchProductByName } from '../apis';

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // Get search query from URL
  const searchQuery = searchParams.get('query') || '';
  console.log('Search Query from URL:', searchQuery); // Log giá trị của searchQuery lấy từ URL
  const fetchProducts = async () => {
    if (!searchQuery) return;
    
    try {
      const result = await apiFetchProductByName(searchQuery);
      if (result.success === false) {
        setError(result.message);
        setProducts([]);
      } else {
        setProducts(result.productData || []);
      }
    } catch (err) {
      setError('An error occurred while fetching products');
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchQuery]);

  const handleProductClick = (id) => {
    window.scrollTo(0, 0);
    navigate(`/product/${id}`);
  };

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="w-full p-6">
      <h1 className="text-left text-2xl font-bold uppercase mb-5">
        Kết quả tìm kiếm cho: "{searchQuery}"
      </h1>
      {error && <p className="text-red-500 text-center font-bold mb-5">Error: {error}</p>}
      <div className="grid grid-cols-5 gap-6">
        {products.length === 0 ? (
          <p className="text-center text-lg font-medium col-span-full">
            Không có sản phẩm nào phù hợp với "{searchQuery}"
          </p>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-2 transition-transform cursor-pointer hover:border-gray-400 relative"
              onClick={() => handleProductClick(product._id)}
            >
              {/* Rest of the product card remains the same */}
              <div className="p-3">
                <img
                  src={product.imageLink}
                  alt={product.name}
                  className="w-48 h-48 object-contain bg-white rounded-md"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2 h-12 overflow-hidden uppercase">
                  {product.name}
                </h2>
                <p className="text-red-600 text-xl font-extrabold mb-2">
                  {product.price.toLocaleString()}đ
                </p>
                <p className="text-lg text-gray-700 font-bold uppercase mb-2">
                  <span className="text-lg text-gray-600">{product.origin.toUpperCase()}</span>
                </p>
                <p className="text-yellow-500 text-base font-medium">
                  {renderStars(product.rating || 0)}
                </p>
              </div>
            </div>
            
          ))
        )}
      </div>
    </div>
  );
};

export default SearchResult;