import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInStart, signInSuccess } from "../../redux/cartslice/AuthenticationSlice";
import toast, { Toaster } from "react-hot-toast";

function Profile() {
  const navigate = useNavigate();
  const [formdata, setformdata] = useState({});
  const [error, seterror] = useState();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user)
  const dataChange = (e) => {
    setformdata({ ...formdata, [e.target.id]: e.target.value });
  };
  const HandleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data being sent:", formdata);

    try {
      dispatch(signInStart())
      const res = await fetch("http://localhost:5000/api/auth/signin", {
      // const res = await fetch("https://jewellerymern-ojza.onrender.com/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });

      const data = await res.json();
      console.log("Response data:", data);

      if (res.ok) {
        dispatch(signInSuccess(data))
        alert("logged in ✅")
        navigate("/");
      } else {
        seterror(data.message || "An error occurred");
      }
    } catch (error) {
      console.error("Error during login:", error);
      seterror("Unable to connect to the server");
    }
  };

  console.log("User data:", user);  

  return (
    <div className="container-fluid-lg ">
      {
        user ? <div className="mt-5 mx-3">
          <div>
            <div>
              <h3>Profile</h3>
              <div className="card w-100 p-2" >
                <div>
                  <p>Fullname: {`${user.firstname} ${user.lastname}`}</p>
                </div>
                <div>
                  <p>Email: {user.email}</p>
                </div>
                <div>
                  <p>Mobile: {user.mobile}</p>
                </div>
                <div>
                  <p>Gender: {user.gender}</p>
                </div>
                <div>
                  {
                    user.Addresses?.map((address, index) => (
                    
                      <div>
                         <p><span>City:</span> {address.City}</p>
                         <p><span>Pincode:</span> {address.Pincode}</p>
                         <p><span>Street:</span> {address.StreetDet}</p>
                         <p><span>State:</span> {address.State}</p>
                         <p>address {address.Address}</p>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>

          </div>

        </div> :
          <div className="d-flex justify-content-center align-items-center">
            <div className="login">
              <div className="heading">
                <h3>Login</h3>
                <p className="text-center">
                  Enter your email and password to login:
                </p>
              </div>
              <form action="#" onSubmit={HandleSubmit}>
                <div>
                  <input
                    type="email"
                    placeholder="E-mail"
                    className="form-control border"
                    name=""
                    id="email"
                    onChange={dataChange}
                  />
                </div>
                <div className="mt-3">
                  <input
                    type="password"
                    placeholder="Password"
                    className="form-control border"
                    name=""
                    id="password"
                    onChange={dataChange}
                  />
                </div>
                <div className="mt-3">
                  <button
                    type="submit"
                    className="form-control text-light border"
                    name=""
                    style={{ backgroundColor: "#45474E" }}
                    id=""
                  >
                    LOGIN
                  </button>
                </div>
                <div className="mt-3">
                  <p className="text-center">
                    Don't have an account?{" "}
                    <span
                      className="text-primary"
                      onClick={() => navigate("/signup")}
                      style={{ cursor: "pointer" }}
                    >
                      Sign up
                    </span>
                  </p>
                </div>
              </form>
            </div>
          </div>
      }

      <div>
        <h4 className="text-danger">{error}</h4>
      </div>
      <Toaster />
    </div>
  );
}

export default Profile;
