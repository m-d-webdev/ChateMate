"use client";
import { api } from '@/utilityfunctions';
import React, { useState } from 'react'
import Spinner from './loaders/Spinner';
import BtnSave from './BtnSave';

const ChangeProfilePicture = ({ user }) => {
    const [choosedPic, setChoosedPic] = useState(user.pic)
    const [file, setFile] = useState(null)
    const handelChangePic = async (e) => {
        if (e.target.files.length > 0) {
            setFile(e.target.files[0])
            setChoosedPic(URL.createObjectURL(e.target.files[0]))
        }
    }

    const [IsLoading, setIsLoading] = useState(false);

    const handelSubmitPic = async (e) => {
        e.preventDefault()
        setIsLoading(true);

        const formDat = new FormData();

        formDat.append("pic", file)
        let res = await api.post("/user/ChangePic",
            formDat,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );
        if (res.status == 200) {
            window.location.href = "/"
        }
        setIsLoading(false)

    }
    return (
        <>
            <h2 className="w-full opacity-80 border-b-2 border-gray-300">
                Change profile picture
            </h2>

            <img src={choosedPic || "https://i.pinimg.com/736x/d9/7b/bb/d97bbb08017ac2309307f0822e63d082.jpg"} alt="" className="img w-44 mt-5 mb-5   h-44" />

            <form onSubmit={handelSubmitPic} action="" encType='multipart/form-data' className='w-full'>

                <input onChange={handelChangePic} accept='image/*' type="file" name="" className='hidden' id="inpPic" />
                <label htmlFor='inpPic' className='r-c-c w-full border rounded-2xl border-gray-400 p-1 mt-1'>
                    <svg className='mr-2 w-5 h-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path> <path d="M7 9l5 -5l5 5"></path> <path d="M12 4l0 12"></path> </svg>
                    Upload from device
                </label>

                {
                    choosedPic != user.pic &&
                    <BtnSave

                        IsLoading={IsLoading}
                        onClick={() => { }}
                    />
                }

            </form>

        </>
    )
}

export default ChangeProfilePicture
