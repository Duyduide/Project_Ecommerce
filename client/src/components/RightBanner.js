import React from 'react'

const Banner = () => {
  return (
    <div className='flex flex-col justify-between h-full gap-5'>
        <div>
            <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'>
                <img  
                    src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:10/plain/https://dashboard.cellphones.com.vn/storage/dknt-ma-m4-04-04.jpg"
                    alt="rightBanner"
                    className='flex-1 object-contain object-top border-2 rounded-md shadow-xl'
                ></img>  
            </a>
        </div>
        <div>
            <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'>
                <img  
                    src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:10/plain/https://dashboard.cellphones.com.vn/storage/dien-thoai-samsung-galaxy-m55-5g-8gb-256gb-gia-sale.png"
                    alt="rightBanner"
                    className='flex-1 object-contain object-top border-2 rounded-md shadow-xl'
                ></img>  
            </a>
        </div>
        
    </div>
  )
}

export default Banner