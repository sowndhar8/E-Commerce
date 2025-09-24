import React from "react";
import { Badge } from 'antd';
import logo from "../img/logo.png";
import { CgProfile } from "react-icons/cg";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";

function NavBar() {
  return (
    <div>
      <div className="flex justify-between items-center text-black shadow-2xl px-40 py-5">
        <img src={logo} alt="logo" className="w-32 h-fit" />
        <div>
          <div className="flex gap-15">
            <div className="flex items-center">
              <a href="/login" className="text-xl">
                <div className="flex items-center gap-1">
                  <CgProfile size={20} />
                  Login
                </div>
              </a>
              <span className="mx-2">|</span>
              <a href="/register" className="text-xl">
                Register
              </a>
            </div>
            <a href="/wishlist" className="text-xl">
              <div className="flex items-center gap-1">
                <FaHeart  size={20} color="red" bgcolor="red" />
                WishList
              </div>
            </a>
            <a href="/cart" className="text-xl">
              <div className="flex items-center gap-1">
                <Badge size="small" count={2}>
                <BsCart3 size={20} />
                </Badge>
                Cart
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
