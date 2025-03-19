import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate, useParams } from "react-router-dom"; // Import navigation hook
import axios from "axios";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartslice/CartSlice";
import { toast, Toaster } from "react-hot-toast";
import { BsCart4 } from "react-icons/bs";

export function JoyGift() {
  const [showdata, setShowdata] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { slug } = useParams();
  // Fetch product data
  useEffect(() => {
    axios.get('http://localhost:5000/api/product/getproduct')
    // axios.get('https://jewellerymern-ojza.onrender.com/api/product/getproduct')
      .then(res => {
        console.log("Fetched products:", res.data); // Debugging
        setShowdata(res.data);
      })
      .catch(err => console.error("Error fetching products:", err));
  }, []);


  // Function to add product to cart
  const HandleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success("Product added to cart!");
  };


  function handleProductClick(product) {
    if (!product.slug) {
      console.error("Product slug is missing!", product);
      return;
    }
    navigate(`/productinfo/${product.slug}`);
  }


  return (
    <div className="joyfirstproduct">
      <div className="joy">
        <div className="joy-heading">
          <h4>The Joy of Gifting</h4>
        </div>
        <div className="gifting-slider">
          <Swiper
            navigation={false}
            modules={[Navigation, Autoplay]}
            slidesPerView={5}
            spaceBetween={10}
            loop={false}
            breakpoints={{
              320: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 5 },
            }}
            className="mySwiper2"
          >
            {showdata.slice().reverse().map((info) => (
        <SwiperSlide key={info._id}>
        <div className="card mt-1" style={{ backgroundColor: 'unset', border: 'none', borderRadius: '10px' }}>
          <div id="joycard" onClick={() => handleProductClick(info)}>
            <img
              id="productimage"
              style={{ width: '100%', height: '100%', borderRadius: '5px', objectFit: 'cover', mixBlendMode: 'color-burn' }}
              className="mx-auto img-fluid"
              src={info.images && info.images.length > 0 ? info.images[0] : "placeholder.jpg"}
              alt={info.productName}
            />
          </div>
          <div className="text-center mt-2">
            <span className="productName">{info.productName}</span>
            <span className="text-secondary">Sale price ₹{info.price}</span>
          </div>
          <div className="mt-3 d-flex justify-content-center align-items-center">
            <button  onClick={() => HandleAddToCart(info)}
              className="btn btn-outline-dark d-flex align-items-center justify-content-center addtocart">
              <BsCart4 className="mx-2" /> Add to Cart
            </button>
          </div>
        </div>
      </SwiperSlide>
      
            ))}
          </Swiper>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
