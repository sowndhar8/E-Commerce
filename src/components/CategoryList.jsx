import React from "react";
import mobile from "../assets/img/mobile.png";
import laptop from "../assets/img/laptops.png";
import applicance from "../assets/img/applicance.png";
import fashion from "../assets/img/fashion.png";

const categories = [
  { id: 1, img: mobile, label: "Mobile & Tablets" },
  { id: 2, img: laptop, label: "Laptop" },
  { id: 3, img: applicance, label: "Home & Appliance" },
  { id: 4, img: fashion, label: "Fashion" },
  { id: 5, img: mobile, label: "Mobile" },
  { id: 6, img: laptop, label: "Laptop" },
  { id: 7, img: applicance, label: "Appliance" },
  { id: 8, img: fashion, label: "Fashion" },
]

function CategoryList() {
  return (
    <div className="bg-white rounded-xl py-5 px-2">
      {/* Horizontal scroll container */}
      <div className="flex lg:justify-evenly space-x-4 overflow-x-auto scrollbar-hide">
        {categories.map((item) => (
          <a
            key={item.id}
            href="/login"
            className="flex-shrink-0 w-24 text-center"
          >
            <div>
              <img
                src={item.img}
                alt={item.label}
                className="w-full h-auto mx-auto"
              />
              <p className="text-[14px] font-semibold mt-2">{item.label}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
