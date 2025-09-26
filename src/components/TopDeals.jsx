import React, { useRef } from "react";
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
  ];

  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth / 2;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-white rounded-xl px-4 md:px-10 py-5 relative">
      <h1 className="text-2xl font-bold mb-5">Top Deals of the Day</h1>

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className="flex space-x-5 overflow-x-auto scrollbar-hide-lg scroll-smooth"
      >
        {categories.map((item) => (
          <a key={item.id} href={item.link} className="flex-shrink-0 w-40 md:w-48 text-center">
            <img
              src={item.img}
              alt={item.label}
              className="w-full h-40 md:h-48 object-contain mx-auto"
            />
            <p className="text-[14px] mt-2">{item.label}</p>
            <p className="text-[16px] font-semibold">₹{item.price}</p>
          </a>
        ))}
      </div>

      {/* Custom arrows */}
      <div className="absolute top-1/2 left-0 w-full flex justify-between items-center -translate-y-1/2">
        <button
          onClick={() => scroll("left")}
          className="flex bg-white h-10 w-8 md:h-12 md:w-10 rounded-r-xl items-center justify-center shadow-md cursor-pointer"
        >
          <LeftOutlined className="text-black text-lg md:text-xl" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="flex bg-white h-10 w-8 md:h-12 md:w-10 rounded-l-xl items-center justify-center shadow-md cursor-pointer"
        >
          <RightOutlined className="text-black text-lg md:text-xl" />
        </button>
      </div>
    </div>
  );
}

export default TopDeals;
