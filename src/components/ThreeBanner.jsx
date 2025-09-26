import React from 'react'
import banner1 from "../assets/img/banner1.jpg";
import banner2 from "../assets/img/banner2.jpg";
import banner3 from "../assets/img/banner3.jpg";

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
                        className="w-full lg:h-[250px] md:h-[200px] h-[150px] object-cover"
                    />
                    </a>
                    
                </div>
            ))}
            
        </div>
    </div>
  )
}

export default ThreeBanner
