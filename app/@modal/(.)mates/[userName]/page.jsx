import GetUser from "@/app/user/profile/GetUser";
import BtnLogOut from "@/components/BtnLogOut";
import CustomDialog from "@/components/CustomDialog";
import SayHiBTN from "@/components/SayHelloBTN";
import { api } from "@/utilityfunctions";
import { Aoboshi_One } from 'next/font/google'
import Link from "next/link";


export default async function UserPage({ params }) {
    const { userName } = await params;
    try {
        const res = await api.get('/user', { params: { userName } })
        const mateData = res.data;
        const user = await GetUser()

        return (
            <CustomDialog className={'min-w-96'}>
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
                    <div className="w-full mt-8 ">
                        {
                            user._id == mateData._id ?
                                <>
                                    <div className="w-full r-p-c">

                                        <Link href={"/changeName"} className=" border mr-1 rounded-3xl border-gray-400 p-1 px-4 r-c-c">
                                            <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4"></path> <path d="M13.5 6.5l4 4"></path> <path d="M16 19h6"></path> </svg>
                                            Change name
                                        </Link >
                                        <Link href={"/changeStatus"} className="mr-1 border rounded-3xl border-gray-400 p-1 px-4 r-c-c">
                                            <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4"></path> <path d="M13.5 6.5l4 4"></path> <path d="M16 19h6"></path> </svg>
                                            Change status
                                        </Link >
                                        <Link href={"/changePic"} className=" border rounded-3xl border-gray-400 p-1 px-4 r-c-c">
                                            <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4"></path> <path d="M13.5 6.5l4 4"></path> <path d="M16 19h6"></path> </svg>
                                            Change profile picture
                                        </Link >
                                    </div>
                                    <div className="w-full r-e-c mt-5">
                                        <BtnLogOut />
                                    </div>
                                </>
                                :
                                <div className="w-full r-e-c">
                                    <SayHiBTN mate={mateData} />
                                </div>

                        }
                    </div>

                </div>
            </CustomDialog>
        );
    } catch (error) {
        console.log(error);

        return (
            <div className="mr-auto">
                User not found
            </div>
        )
    }

}
