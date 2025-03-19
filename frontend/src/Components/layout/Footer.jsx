import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaFacebook, FaInstagram, FaPinterest, FaTwitter } from "react-icons/fa6";

const Footer = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <>
      {/* Footer Section Start */}
      <div className="marginbootom"></div>
      <footer style={{backgroundColor:'#083057',padding:'20px'}} className="section-t-space mt-4">
        <div className="container-fluid-lg">

          <div className="main-footer section-b-space section-t-space ">
            <div className="row w-100 justify-content-center mx-auto" style={{ marginTop: "30px" }}>
            
              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="footer-title">
                  <h4>My Account</h4>
                </div>
                <div className="footer-contain">
                  <ul>
                    {user ? (
                      <>
                        <li>
                          <Link to="/">
                            <a className="text-content">
                              Profile &amp; Details
                            </a>
                          </Link>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link to="/">
                            <a className="text-content">
                              Profile &amp; Details
                            </a>
                          </Link>
                        </li>
                      </>
                    )}
                    {user ? (
                      <>
                        <li>
                          <Link to="/">
                            <a className="text-content">Order History</a>
                          </Link>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link to="/">
                            <a className="text-content">Order History</a>
                          </Link>
                        </li>
                      </>
                    )}
                    {user ? (
                      <>
                        <li>
                          <Link to="/">
                            <a className="text-content">Address Manage</a>
                          </Link>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link to="/">
                            <a className="text-content">Address Manage</a>
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-sm-3">
                <div className="footer-title">
                  <h4>Information</h4>
                </div>
                <div className="footer-contain">
                  <ul>
                    <li>
                      <Link to="/returnefund">
                        <a className="text-content">Returns</a>
                      </Link>
                    </li>

                    <li>
                      <Link to="/faq">
                        <a className="text-content">FAQ</a>
                      </Link>
                    </li>

                    <li>
                      <Link to="/privacy">
                        <a className="text-content">Privacy Policy</a>
                      </Link>
                    </li>
                    <li>
                      <Link to="/terms-conditions">
                        <a className="text-content">Terms & Conditions</a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-sm-3">
                <div className="footer-title">
                  <h4>Who Are We?</h4>
                </div>
                <div className="footer-contain">
                  <ul>
                    <li>
                      <Link to="/about">
                        <a className="text-content">About Us</a>
                      </Link>
                    </li>

                    {/* <li>
                      <Link to="/" className="text-content">
                        Career
                      </Link>
                    </li> */}
                    <li>
                      <Link to="/contact">
                        <a className="text-content">Contact Us</a>
                      </Link>
                    </li>
                    {/* <li>
                      <Link to="/">
                        <a className="text-content">Site Map</a>
                      </Link>
                    </li> */}
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="footer-title">
                  <h4>Contact Us</h4>
                </div>
                <div className="footer-contact">
                  <ul>
                    <li>
                      <div className="footer-number">
                        <i data-feather="phone" />
                        <div className="contact-number">
                          <h5>(+91) 7355722399</h5>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="footer-number">
                        <i data-feather="mail" />
                        <div className="contact-number">
                          <h6 className="text-content">Email Address :</h6>
                          <h5>
                            <a href="mailto: farmerack@gmail.com">
                              saklainshaikh974@gmail.com
                            </a>
                          </h5>
                        </div>
                      </div>
                    </li>
                    <li className="social-app">
                      <h5 className="mb-2 text-content">Download App :</h5>
                      <ul className="footer-social">
                        <li className="mb-0">
                          <a
                            href="https://play.google.com/store/apps"
                            target="_blank"
                          >
                            <img
                              src="https://themes.pixelstrap.com/fastkart/assets/images/playstore.svg"
                              className="blur-up lazyload"
                              alt
                            />
                          </a>
                        </li>
                        <li className="mb-0">
                          <a
                            href="https://www.apple.com/in/app-store/"
                            target="_blank"
                          >
                            <img
                              src="https://themes.pixelstrap.com/fastkart/assets/images/appstore.svg"
                              className="blur-up lazyload"
                              alt
                            />
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="sub-footer section-small-space">
            <div className="reserve">
              <h6 className="text-content">
                ©2025  Saqlain
              </h6>
            </div>
            <div className="payment">
              {/* <img
                src="../assets/images/payment/1.png"
                className="blur-up lazyload"
                alt
              /> */}
            </div>
            <div className="social-link">
              <ul className="footer">
                <li>
                  <a href="https://www.facebook.com/" target="_blank">
                    <span><FaFacebook /></span>
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/" target="_blank">
                    <span><FaTwitter /></span>
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/" target="_blank">
                    <span><FaInstagram /></span>
                  </a>
                </li>
                <li>
                  <a href="https://in.pinterest.com/" target="_blank">
                    <span><FaPinterest /></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      {/* Footer Section End    */}
    </>
  );
};

export default Footer;
