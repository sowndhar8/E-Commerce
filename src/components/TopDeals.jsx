import React, { useRef } from "react";
import { Carousel } from "antd";
import washing from "../assets/img/washing.png";
import fridge from "../assets/img/fridge.png";
import tv from "../assets/img/tv.png";
import ac from "../assets/img/ac.png";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

function TopDeals() {
  const categories = [
    { id: 1, link: "/login", img: washing, label: "Washing Machine", price: 23999 },
    { id: 2, link: "/login", img: fridge, label: "Refrigerator", price: 47999 },
    { id: 3, link: "/login", img: tv, label: "Smart TV", price: 12999 },
    { id: 4, link: "/login", img: ac, label: "Air Conditioner", price: 9999 },
    { id: 5, link: "/login", img: washing, label: "Washing Machine", price: 2999 },
    { id: 6, link: "/login", img: fridge, label: "Refrigerator", price: 32999 },
    { id: 7, link: "/login", img: tv, label: "Smart TV", price: 19999 },
    { id: 8, link: "/login", img: ac, label: "Air Conditioner", price: 15999 },
    { id: 9, link: "/login", img: washing, label: "Washing Machine", price: 9999 },
    { id: 10, link: "/login", img: fridge, label: "Refrigerator", price: 23999 },
    { id: 11, link: "/login", img: tv, label: "Smart TV", price: 12999 },
    { id: 12, link: "/login", img: ac, label: "Air Conditioner", price: 9999 },
    { id: 13, link: "/login", img: washing, label: "Washing Machine", price: 2999 },
    { id: 14, link: "/login", img: fridge, label: "Refrigerator", price: 32999 },
    { id: 15, link: "/login", img: tv, label: "Smart TV", price: 19999 },
  ];

  const carouselRef = useRef(null);

  return (
    <div className="bg-white rounded-xl px-10 relative">
      <h1 className="text-2xl font-bold py-5">Top Deals of the Day</h1>

      <Carousel
        ref={carouselRef}
        arrows={false}
        dots={false}
        draggable
        slidesToShow={10}   // show 10 at a time
        slidesToScroll={1}  // move only 1 per click
        infinite={false}    // stop at the end
      >
        {categories.map((item) => (
          <div key={item.id} className="px-5">
            <a
              href={item.link}
              className="text-xl text-center block"
            >
              <div>
                <img
                  src={item.img}
                  alt={item.label}
                  className="w-25 h-[200px] object-contain mx-auto"
                />
                <p className="text-[14px] text-black">{item.label}</p>
                <p className="text-[16px] text-black font-semibold">
                  ₹{item.price}
                </p>
              </div>
            </a>
          </div>
        ))}
      </Carousel>

      {/* Custom arrows */}
      <div className="absolute top-1/2 left-0 w-full flex justify-between items-center -translate-y-1/2">
        <div
          className="flex bg-white h-12 w-10 rounded-r-xl cursor-pointer items-center justify-center shadow-2xl shadow-black"
          onClick={() => carouselRef.current.prev()}
        >
          <LeftOutlined className="text-black text-lg" />
        </div>
        <div
          className="flex bg-white h-12 w-10 rounded-l-xl cursor-pointer items-center justify-center shadow-2xl shadow-black"
          onClick={() => carouselRef.current.next()}
        >
          <RightOutlined className="text-black text-lg" />
        </div>
      </div>
    </div>
  );
}

export default TopDeals;
