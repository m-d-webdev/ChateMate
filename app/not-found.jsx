"use client";
import React from 'react'
import AnimateData from "@/public/lotties/notFound.json"
import Lottie from 'react-lottie'
const NotFound = () => {
  return (
    <div className='w-full h-screen c-c-c'>
      <Lottie options={{
        
        animationData: AnimateData,
        loop: true,
        autoplay: true
      }} height={300} />

    </div>
  )
}

export default NotFound
