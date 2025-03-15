"use server";

import Lottie from 'react-lottie'
import AnimateData from "@/public/lotties/internetError.json"
const ServerError = () => {
    return (
        <div className='w-full h-screen c-c-c'>
            <Lottie options={{
                animationData: AnimateData,
                loop: true,
                autoplay: trye
            }} height={150} />

        </div>
    )
}

export default ServerError
