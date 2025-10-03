import React, { useEffect } from "react";
import CategoryList from "../components/CategoryList";
import MainBanner from "../components/mainBanner";
import TopDeals from "../components/TopDeals";
import ThreeBanner from "../components/ThreeBanner";
import fetchdata from "../config/fetchdata";

function HomePage() {
  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    try {
      const getuserapi = await fetchdata?.GetSingleuser(
        "18a68893-d1bb-438a-a5b1-ce57d2407271"
      );
      console.log("getuserapi", getuserapi);
    } catch (error) {
      console.log("Catch in get user ", error);
    }
  };
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
