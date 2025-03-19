import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [formdata, setformdata] = useState({});

  const Handlechange = (e) => {
    const { id, name, value, type, checked } = e.target;
  
    setformdata((prevData) => {
      if (
        ["AName", "Pincode", "State", "City", "HNo", "StreetDet", "LandMark", "AreaDet", "Address"].includes(id)
      ) {
        return {
          ...prevData,
          Addresses: [
            {
              ...prevData.Addresses?.[0],
              [id]: value,
            },
          ],
        };
      } else {
        return { ...prevData, [id]: type === "checkbox" ? checked : value };
      }
    });
  };
  

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
      // const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formdata,
          Addresses: formdata.Addresses || [], 
        }),
      });
  
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");
  
      alert("Account created successfully 😊");
      navigate("/profile");
    } catch (err) {
      alert(err.message);
      console.error("Signup Error:", err);
    }
  };
  

  return (
    <div className="container-fluid-lg d-flex justify-content-center align-items-center">
      <div className="signup">
        <div className="heading">
          <h3>Sign Up</h3>
          <p className="text-center">Please fill in the information below:</p>
        </div>
        <form onSubmit={handlesubmit}>
          <input type="text" placeholder="First name" id="firstname" required onChange={Handlechange} className="form-control border" />
          <input type="text" placeholder="Last name" id="lastname" required onChange={Handlechange} className="form-control border mt-3" />
          <input type="email" placeholder="E-mail" id="email" required onChange={Handlechange} className="form-control border mt-3" />
          <input type="tel" placeholder="Mobile number" id="mobile" required onChange={Handlechange} className="form-control border mt-3" />

          <div className="mt-3 d-flex" style={{ gap: "20px" }}>
            <label>
              <input type="radio" id="gender" name="gender" value="male" onChange={Handlechange}  /> Male
            </label>
            <label>
              <input type="radio" id="gender"  name="gender" value="female" onChange={Handlechange}  /> Female
            </label>
          </div>

          <input type="password" placeholder="Password" id="password" required minLength={5} maxLength={8} onChange={Handlechange} className="form-control border mt-3" />

          <div className="mt-3">
            <input type="text" name="AName" placeholder="Area Name" id="AName" onChange={Handlechange} required className="border p-2 w-full" />
            <input type="number" name="Pincode" minLength={6} maxLength={6} placeholder="Pincode" id="Pincode" onChange={Handlechange} required className="border p-2 w-full" />
            <input type="text" name="State" placeholder="State" id="State" onChange={Handlechange} required className="border p-2 w-full" />
            <input type="text" name="City" placeholder="City" id="City" onChange={Handlechange} required className="border p-2 w-full" />
            <input type="text" name="HNo" placeholder="House No" id="HNo" onChange={Handlechange} required className="border p-2 w-full" />
            <input type="text" name="StreetDet" placeholder="Street Details" id="StreetDet" onChange={Handlechange} required className="border p-2 w-full" />
            <input type="text" name="LandMark" placeholder="Landmark" id="LandMark" onChange={Handlechange} className="border p-2 w-full" />
            <input type="text" name="AreaDet" placeholder="Area Details" id="AreaDet" onChange={Handlechange} className="border p-2 w-full" />
            <input type="text" name="Address" placeholder="Full Address" id="Address" onChange={Handlechange} required className="border p-2 w-full" />
          </div>

          <button type="submit" className="form-control text-light border mt-3" style={{ backgroundColor: "#45474E" }}>
            CREATE ACCOUNT
          </button>

          <p className="text-center mt-3">
            Already have an account?{" "}
            <span className="text-primary" onClick={() => navigate("/profile")} style={{ cursor: "pointer" }}>
              Log in
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
