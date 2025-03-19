import React from "react";

function WireWork() {
  return (
    <div>
      <div className="grid2">
        <div className="item4"></div>
        <div className="item3">
          <div>
            <p className="otto">Filgree wirework adorned</p>
            <p
              style={{
                fontSize: "14px",
                letterSpacing: "1px",
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
              className="cascad"
            >
              Cascading Crescent Necklace
            </p>
            <button
              className="btn"
              style={{
                backgroundColor: "#BDA160",
                color: "#fff",
              }}
            >
              SHOP NOW
            </button>
          </div>
        </div>
      </div>
      <div className="marquee">
          <marquee behavior="scroll" diretion="left" >- BRINGING ANCIENT CULTURES AND HERITAGE BACK TO LIFE SINCE 1969</marquee>
      </div>
    </div>
  );
}

export default WireWork;
