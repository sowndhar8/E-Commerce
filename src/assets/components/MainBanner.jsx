import React, { useRef } from "react";
import { Carousel } from "antd";
import banner1 from "../img/banner1.jpg";
import banner2 from "../img/banner2.jpg";
import banner3 from "../img/banner3.jpg";
import banner4 from "../img/banner4.jpg";
import banner5 from "../img/banner5.jpg";
import banner6 from "../img/banner6.jpg";
import banner7 from "../img/banner7.jpg";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

function MainBanner() {
  const carouselRef = useRef(null);

  const banners = [
    { id: 1, img: banner1 },
    { id: 2, img: banner2 },
    { id: 3, img: banner3 },
    { id: 4, img: banner4 },
    { id: 5, img: banner5 },
    { id: 6, img: banner6 },
    { id: 7, img: banner7 },
  ];

  return (
    <div className="w-full relative">
      <div className="rounded-2xl overflow-hidden">
        <Carousel
          ref={carouselRef}
          autoplay={{ dotDuration: true }}
          autoplaySpeed={5000}
          draggable
          pauseOnDotsHover
        >
          {banners.map((item) => (
            <div key={item.id}>
              <img
                src={item.img}
                alt={`banner-${item.id}`}
                className="w-full h-[350px] object-cover"
              />
            </div>
          ))}
        </Carousel>
      </div>

      {/* Custom arrows overlay */}
      <div className="absolute top-0 left-0 w-full h-full flex justify-between items-center ">
        <div
          className="flex bg-white h-20 w-10 rounded-r-xl cursor-pointer items-center justify-center"
          onClick={() => {
            carouselRef.current.prev();
          }}
        >
          <LeftOutlined className="text-black text-xl" />
        </div>
        <div
          className="flex bg-white h-20 w-10 rounded-l-xl cursor-pointer items-center justify-center"
          onClick={() => {
            carouselRef.current.next();
          }}
        >
          <RightOutlined className="text-black text-xl" />
        </div>
      </div>
    </div>
  );
}

export default MainBanner;
