import React from 'react'
import Lottie from 'react-lottie'
import animateData from '@/public/lotties/Animation - 1741007456695.json'
const Loader = ({ width , height = 100 }) => {
    return (
        <div>
            <Lottie
                options={{
                    animationData: animateData,
                    autoplay: true,
                    loop: true,
                }}
                width={width}
                height={height}
            />
        </div>
    )
}

export default Loader
