import React from "react";
import mobile from "../img/mobile.png";
import laptop from "../img/laptops.png";
import applicance from "../img/applicance.png";
import fashion from "../img/fashion.png";

const categories = [
  {
    id: 1,
    img: mobile,
    label: "Mobile & Tablets",
  },
  {
    id: 2,
    img: laptop,
    label: "Laptop",
  },
  {
    id: 3,
    img: applicance,
    label: "Home & Appliance",
  },
  {
    id: 4,
    img: fashion,
    label: "Fashion",
  },
  {
    id: 5,
    img: mobile,
    label: "Mobile",
  },
  {
    id: 6,
    img: laptop,
    label: "Laptop",
  },
  {
    id: 7,
    img: applicance,
    label: "Appliance",
  },
  {
    id: 8,
    img: fashion,
    label: "Fashion",
  },
];

function CategoryList() {
  return (
    <div className="flex justify-evenly items-center bg-white rounded-xl  py-5">
      {categories.map((item) => (
        <a
          key={item.id}
          href="/login"
          className="text-xl text-center place-items-center gap-5"
        >
          <div>
            <img
              src={item.img}
              alt={item.label}
              className="w-25 h-fit mx-auto"
            />
            <p className="text-[16px] font-semibold">{item.label}</p>
          </div>
        </a>
      ))}
    </div>
  );
}

export default CategoryList;
