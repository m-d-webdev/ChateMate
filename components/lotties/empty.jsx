"use client";
import React from 'react'
import Lottie from 'react-lottie';
import ANimateData from "@/public/lotties/Empty2.json"

const EmptyLottie = ({ text = "No result " }) => {
    return (
        <div className='w-full c-c-c  font-semibold text-center text-gray-400'>
            <Lottie
                options={{
                    animationData: ANimateData,
                    loop: true,
                    autoplay: true
                }}
                height={200}
            />
            <div className="mt-8"></div>

            {text}
        </div>
    )
}

export default EmptyLottie
