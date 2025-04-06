import React, { useRef } from 'react';
import Slider from "react-slick";

const Banner = () => {
  const sliderRef = useRef(null); 

  const settings = {
    dots: true,         
    infinite: true,     
    speed: 500,         
    slidesToShow: 1,    
    slidesToScroll: 1,  
    autoplay: true,         // Tự động chuyển đổi
    autoplaySpeed: 2000,    // Tốc độ tự động chuyển đổi (ms)
  };

  const goToSlide = (index) => {
    sliderRef.current.slickGoTo(index); 
  };

  return (
    <div className='flex flex-col flex-auto'>
      <div className='relative w-full'>
        <Slider {...settings} ref={sliderRef}>
          <div>
            <img  
              src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/iphone-16-pro-max-thu-cu-moi-home.jpg"
              alt="banner 1"
              className='object-contain object-top w-full'
            />
          </div>
          <div>
            <img  
              src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/oppo-find-n5-dat-truoc-home.jpg"
              alt="banner 2"
              className='object-contain object-top w-full'
            />
          </div>
          <div>
            <img  
              src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/dien-thoai-samsung-galaxy-s25-ultra-ho-henie-home-xanh-duong.png"
              alt="banner 3"
              className='object-contain object-top w-full'
            />
          </div>
          <div>
            <img  
              src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/vivo-y04-home-2-4.png"
              alt="banner 4"
              className='object-contain object-top w-full'
            />
          </div>
        </Slider>

        <div className='w-full mt-4 overflow-hidden'>
          <div className='relative flex flex-col items-center justify-between w-full h-full p-4 shadow-xl rounded-b-md'>
            <div className='z-10 flex flex-row justify-between w-full'>
              <span 
                onClick={() => goToSlide(0)} 
                className="p-2 border-t-2 border-transparent cursor-pointer text-black-500 hover:text-black-700 hover:border-blue-500 focus:outline-none focus:border-blue-500"
              >
                MỚI NHẤT
              </span>
              <span 
                onClick={() => goToSlide(1)} 
                className="p-2 border-t-2 border-transparent cursor-pointer text-black-500 hover:text-black-700 hover:border-blue-500 focus:outline-none focus:border-blue-500"
              >
                ĐẶT TRƯỚC
              </span>
              <span 
                onClick={() => goToSlide(2)} 
                className="p-2 border-t-2 border-transparent cursor-pointer text-black-500 hover:text-black-700 hover:border-blue-500 focus:outline-none focus:border-blue-500"
              >
                LÊN ĐỜI
              </span>
              <span 
                onClick={() => goToSlide(3)} 
                className="p-2 border-t-2 border-transparent cursor-pointer text-black-500 hover:text-black-700 hover:border-blue-500 focus:outline-none focus:border-blue-500"
              >
                MUA NGAY
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;