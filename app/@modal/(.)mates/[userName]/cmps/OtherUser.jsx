// "use client";
import SayHiBTN from "@/components/usersCmps/SayHelloBTN";

import Link from "next/link";

const OtherUser = ({ mateData }) => {
    return (
        <div className="c-c-c w-full">
            <div className="c-c-c">
                <div className="p-4 rounded-full border border-gray-200">
                    <div className="p-2 rounded-full c-e-c relative bg-white drop-shadow-xl ">
                        <img src={mateData.pic ? mateData.pic : "https://i.pinimg.com/736x/d9/7b/bb/d97bbb08017ac2309307f0822e63d082.jpg"}
                            className="w-44 min-w-44 min-h-44  h-44  rounded-full object-cover object-top "
                            alt={mateData.fullName}
                        />
                        <span className="p-2 absolute text-sm  bottom-0  bg-blue-500 rounded-2xl text-white">
                            {mateData.userName}
                        </span>
                    </div>
                </div>
            </div>
            <div className="c-c-c max-w-screen-sm">
                <h1 className={`border-b-2 border-b text-center  border-b-gray-200  text-2xl font-extrabold   `}>{mateData.fullName}</h1>
                <p className="border-b-2 border-b text-center max-w-screen-sm  border-b-gray-200  text-md opacity-80 mt-4">{mateData.status}</p>
            </div>
            <div className="w-full r-w-p-c mt-8 ">
                <div className="w-full r-e-c">
                    <SayHiBTN mate={mateData} />
                </div>
            </div>

        </div>
    )
}

export default OtherUser
