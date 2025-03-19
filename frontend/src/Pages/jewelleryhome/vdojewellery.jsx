import React from 'react'

function Vdojewellery() {
    return (
        <div>
            <div className="video-container" >
                <video style={{ objectFit: 'cover' }} autoPlay="true" preload='metadata' playsInline="true" src=".\Assests\vdo.mp4" muted loop height="440" width="100%"></video>
            </div>
            <div className="marquee2">
                <marquee behavior="scroll" direction="right">- BRINGING ANCIENT CULTURES AND HERITAGE BACK TO LIFE SINCE 1969</marquee>
            </div>
        </div>
    )
}

export default Vdojewellery;