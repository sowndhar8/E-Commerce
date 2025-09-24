import React from 'react'
import banner1 from "../img/banner1.jpg";
import banner2 from "../img/banner2.jpg";
import banner3 from "../img/banner3.jpg";
import { link } from 'motion/react-client';

function ThreeBanner() {

    const banners = [
        { id: 1, link:"/", img: banner1 },
        { id: 2, link:"/", img: banner2 },
        { id: 3, link:"/", img: banner3 },
    ]
  return (
    <div>
        <div className="flex rounded-2xl overflow-hidden gap-2">
            {banners.map((item) => (
                <div key={item.id}>
                    <a href={item.link}>
                    <img
                        src={item.img}
                        alt={`banner-${item.id}`}
                        className="w-full h-[250px] object-cover"
                    />
                    </a>
                    
                </div>
            ))}
            
        </div>
    </div>
  )
}

export default ThreeBanner
