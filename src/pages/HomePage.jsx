import React from "react";
import CategoryList from "../components/CategoryList";
import MainBanner from "../components/mainBanner";
import TopDeals from "../components/TopDeals";
import ThreeBanner from "../components/ThreeBanner";

function HomePage() {
  return (
    <div className=" lg:px-40 md:px-16 px-4 py-5 bg-gray-100 space-y-3">
      {/* Top Category List */}
      <div>
        <CategoryList />
      </div>

      {/* Banner Section */}
      <div>
        <MainBanner />
      </div>

      {/* Top Deals */}
      <div>
        <TopDeals />
      </div>

      {/* Three Banners */}
      <div>
        <ThreeBanner />
      </div>
    </div>
  );
}

export default HomePage;
