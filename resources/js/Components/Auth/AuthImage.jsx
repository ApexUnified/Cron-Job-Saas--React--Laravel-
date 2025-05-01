import React from 'react'
import CurvedImage from '../../../assets/img/curved-images/curved9.jpg';
export default function AuthImage() {
    return (
        <>
            <div className="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6" style={{ backgroundImage: `url(${CurvedImage})` }}></div>
        </>
    )
}
