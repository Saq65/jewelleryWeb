import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartslice/CartSlice";
import { toast, Toaster } from "react-hot-toast";
import { Swiper } from "swiper/react";
import { SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from 'swiper/modules';

function ProductInfo() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState([]);
  const [imgshow, setimgshow] = useState();

  useEffect(() => {
    if (!slug) {
      console.error("Slug is undefined! Cannot fetch product.");
      return;
    }

    console.log("Fetching product with slug:", slug);
    axios.get(`http://localhost:5000/api/product/getproduct/${slug}`)
    // axios.get(`https://jewellerymern-ojza.onrender.com/api/product/getproduct/${slug}`)
      .then(res => {
        console.log("Product data received:", res.data);
        setProduct(res.data);
      })
      .catch(err => console.error("Error fetching product:", err));
  }, [slug]); // Ensure it re-runs when `slug` changes


  if (!product) {
    return <h2 className="text-center mt-5">Loading...</h2>;
  }


  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success("Product added to cart!");
  };

  const handleImgClick = (e) => {
    const clickedId = e.target.id;
    if (clickedId === "img1") {
      setimgshow(
        <img
          src={product.images && product.images.length > 1 ? product.images[1] : "placeholder.jpg"}
          id="img1" style={{ width: '100%', height: '100%' }} alt="firstimg"
        />
      );
    } else if (clickedId === "img2") {
      setimgshow(
        <img
          src={product.images && product.images.length > 2 ? product.images[2] : "placeholder.jpg"}
          id="img1" style={{ width: '100%', height: '100%' }} alt="firstimg"
        />);
    } else if (clickedId === "img3") {
      setimgshow(
        <img
          src={product.images && product.images.length > 3 ? product.images[3] : "placeholder.jpg"}
          id="img1" style={{ width: '100%', height: '100%' }} alt="firstimg"
        />);
    } else if (clickedId === "img4") {
      setimgshow(
        <img
          src={product.images && product.images.length > 0 ? product.images[0] : "placeholder.jpg"}
          id="img1" style={{ width: '100%', height: '100%' }} alt="firstimg"
        />);
    }
  };


  return (
    <div className="container-fluid">
      <div className="desktop-v" style={{ marginTop: '30px' }}>
        <div className="row w-100 mx-auto justify-content-center">
          <div className="col-lg-2 border">
            <div style={{ display: 'flex', flexDirection: 'column', rowGap: '5px' }}>
              <div className="firstcard">
                <div style={{ height: '120px' }} onClick={handleImgClick}
                >
                  <img
                    src={product.images && product.images.length > 1 ? product.images[1] : "placeholder.jpg"}
                    id="img1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="firstimg" />
                </div>
              </div>
              <div className="firstcard">
                <div style={{ height: '120px' }} onClick={handleImgClick} >
                  <img
                    src={product.images && product.images.length > 2 ? product.images[2] : "placeholder.jpg"}
                    id="img2" className="img-fluid" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="firstimg" />
                </div>
              </div>
              <div className="firstcard">
                <div style={{ height: '120px' }} onClick={handleImgClick} >
                  <img
                    src={product.images && product.images.length > 3 ? product.images[3] : "placeholder.jpg"}
                    id="img3" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="firstimg" />
                </div>
              </div>
              <div className="firstcard">
                <div style={{ height: '120px' }} onClick={handleImgClick} >
                  <img
                    src={product.images && product.images.length > 0 ? product.images[0] : "placeholder.jpg"}
                    id="img4" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="firstimg" />
                </div>
              </div>

            </div>
          </div>
          <div className="col-lg-4 ">
            <div className="">
              {imgshow ? <div style={{ height: '450px' }}>
                {imgshow}
              </div> : <img
                src={product.images && product.images.length > 0 ? product.images[0] : "placeholder.jpg"}
                id="img4" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="firstimg" />}
            </div>
          </div>
          <div className="col-lg-5 border">
            <div className="p-2">
              <div>
                <h4>{product.productName}</h4>
              </div>
              <div >
                <p> ₹ {product.price}</p>
              </div>
              <hr />
            </div>
            <div>
              <p>{product.description}</p>
            </div>
            <div>
              <button className="btn btn-primary" onClick={handleAddToCart}>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>

      <div className="mobile-v">
        <div style={{ marginBottom: '80px' }}>
          <div>
            <Swiper 
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
            pagination={true} modules={[Pagination,Autoplay]} className="mySwiper">
              <SwiperSlide>
                <div className="card">
                  <div onClick={handleImgClick}
                  >
                    <img
                      src={product.images && product.images.length > 0 ? product.images[0] : "placeholder.jpg"}
                      id="img1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="firstimg" />
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="card">
                  <div onClick={handleImgClick}
                  >
                    <img
                      src={product.images && product.images.length > 1 ? product.images[1] : "placeholder.jpg"}
                      id="img1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="firstimg" />
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="card">
                  <div onClick={handleImgClick}
                  >
                    <img
                      src={product.images && product.images.length > 2 ? product.images[2] : "placeholder.jpg"}
                      id="img1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="firstimg" />
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="card">
                  <div onClick={handleImgClick}
                  >
                    <img
                      src={product.images && product.images.length > 3 ? product.images[3] : "placeholder.jpg"}
                      id="img1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="firstimg" />
                  </div>
                </div>
              </SwiperSlide>

            </Swiper>
          </div>
          <div >
            <div className="p-1">
              <div>
                <h4>{product.productName}</h4>
              </div>
              <div >
                <p> ₹ {product.price}</p>
              </div>
              <hr />
            </div>
            <div>
              <p id="mobdesc">{product.description}</p>
            </div>
            <div>
              <button className="btn btn-primary w-100" onClick={handleAddToCart}>Add to Cart</button>
            </div>
          </div>
        </div>

      </div>
      <Toaster />
    </div>
  );
}


export default ProductInfo;

