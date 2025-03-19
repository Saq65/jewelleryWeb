import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import axios from "axios";

export function JewellerysSlider() {
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/banner/showbanner")
      // .get("https://jewellerymern-ojza.onrender.com/api/banner/showbanner")
      .then((res) => setBanner(res.data))
      .catch((err) => console.log(err));
  }, []);  

  return (
    <div className="">
      <div className="swiper">
        <Swiper
          pagination={{ clickable: true }}
          navigation={true} 
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          modules={[Pagination, Autoplay, Navigation]}
          className="mySwiper"
        >
          {banner.slice().reverse().map((showdata, index) => (
            <SwiperSlide key={showdata.id || showdata._id || index}>
              <div>
                <img
                  src={showdata.image}
                  className="img-fluid h-100 w-100"
                  alt="banner"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
