import React, { useState } from "react";
import {
  IoBagOutline,
  IoPersonOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import { GoSearch } from "react-icons/go";
import { IoPerson } from "react-icons/io5";
import { IoCart } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Space } from 'antd';
import { logOut } from "../../redux/cartslice/AuthenticationSlice.js";

function Header() {


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { carts } = useSelector(state => state.allcart)
  const { user } = useSelector(state => state.user);
  const userName = user ? `${user.firstname}` : "";

  const handlelogOut = async () => {
    try {
      await fetch('/api/auth/logout');
      dispatch(logOut());
      navigate('/');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const items = [
    {
      key: '1',
      label: 'My Account',
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      label: 'Profile',
      onClick: () => navigate('/profile')

    },
    {
      key: '3',
      label: 'logout',
      onClick: () => handlelogOut()
    },

  ];
  return (
    <>

      <div className="container-fluid-lg">
        <div className="welcome">
          <div>
            <p>Welcome to the new Ramzan Ali website</p>
          </div>
        </div>
        <div className="nav-header">
          <div className="row w-100 align-items-center justify-content-center mx-auto">
            <div className="col-lg-4">
              <div className="collection ">
                <ul>
                  {/* <li>COLLECTIONS</li> */}
                  <li>JEWELLERY</li>
                  <li>ABOUT US</li>
                  <li onClick={() => navigate('/contact')}>CONTACTS</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4">
              <div
                className="icon"
                onClick={() => navigate("/")}
                style={{ cursor: "pointer" }}
              >
                <img src="" alt="" className="fluid" />
                <h4 className="ramzanali" title="ramzan ali jewller">RA Jewellery</h4>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }} className="col-lg-4">
              <div className="rs">
                <div
                  className="w-100 d-flex align-items-center"
                >
                  {/* <div className="dropdown" id="up" onClick={toggleArrow}>
                    <div
                      style={{ position: "absolute", top: "5px", left: "67px" }}
                    >
                      {arrow ? (
                        <IoIosArrowUp style={{ color: "#C6A856" }} />
                      ) : (
                        <IoIosArrowDown style={{ color: "#C6A856" }} />
                      )}
                    </div>
                    <select
                      style={{
                        backgroundColor: "unset",
                        color: "#C6A856",
                        border: "none",
                      }}
                      className="form-control w-100"
                      name=""
                      id=""
                    >
                      <option value="India">Rupees</option>
                      <option value="Usa">Dollar</option>
                      <option value="Euro">Euro</option>
                      <option value="Saudi">Riyal</option>6
                      <option value="Tokyo">Yen</option>
                    </select>
                  </div> */}

                  <div style={{ gap: "3vh" }} className="d-flex align-items-center w-75">

                    {
                      user ? <div className="mt-3"> {<Dropdown
                        menu={{
                          items,
                        }}
                      >
                        <a onClick={(e) => e.preventDefault()}>
                          <Space>
                            {
                              <p style={{ cursor: 'pointer' }} className="text-success fw-semibold">{userName}</p>
                            }
                          </Space>
                        </a>
                      </Dropdown>}
                      </div> : <div
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("/profile")}

                      >
                        <IoPersonOutline
                          style={{ color: "#C6A856", fontSize: "20px" }}
                        />
                      </div>
                    }
                    <div onClick={() => navigate('/cart')}>
                      <IoBagOutline
                        style={{ color: "#C6A856", fontSize: "20px", cursor: 'pointer' }}
                      />
                      <sup className="text-light">
                        {carts.length}
                      </sup>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* mobile-header */}
        <div className="mobile-menu">
          <div className="d-flex justify-content-around align-items-center">
            <div>
              <FaBars color="#8B825E" />
            </div>
            <div>
              <GoSearch color="#8B825E" />
            </div>
            <div className="mt-2">
              {
                user ? <div className=""> {<Dropdown
                  menu={{
                    items,
                  }}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      {
                        <p style={{ cursor: 'pointer' }} className="text-success fw-semibold">{userName}</p>
                      }
                    </Space>
                  </a>
                </Dropdown>}
                </div> : <div
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/profile")}

                >
                  <IoPersonOutline
                    style={{ color: "#C6A856", fontSize: "20px" }}
                  />
                </div>
              }
            </div>

            <div onClick={() => navigate('/cart')}>
              <IoCart color="#8B825E" />
              {
               carts.length
              }
            </div>
          </div>
        </div>
      </div>
    </>

  );
}

export default Header;
