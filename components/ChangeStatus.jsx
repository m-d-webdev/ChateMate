"use client";
import React, { useState } from 'react'
import CustomInput from './CustomInput'
import BtnSave from './BtnSave';
import { api } from '@/utilityfunctions';

const ChangeStatus = ({ user }) => {
    
    const [newStatus, setnewStatus] = useState(user.status || "");
    const [IsLoading, setIsLoading] = useState(false);


    const handelSaveStatus = async () => {
        setIsLoading(true)
        let res = await api.post("/user/updateUserStatus", { newStatus })
        if (res.status == 200) {
            window.location.href = "/"
        }
        setIsLoading(false)
    }
    return (
        <>
            <h2 className='opacity-80 border-b-2 mb-8 w-full border-gray-300'>Change name</h2>
            <CustomInput
                Svg={({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path> <path d="M9 10l.01 0"></path> <path d="M15 10l.01 0"></path> <path d="M9.5 15a3.5 3.5 0 0 0 5 0"></path> </svg>}
                input_class={'pt-3'}
                onChange={(e) => { setnewStatus(e) }}
                placeholder='Feeling something? Write it down..'
                value={newStatus}
                id='status'

                className='mb-2 max-w-none mt-2'
            />


            <div className="c-s-s w-full mt-8">
                <span onClick={e=> setnewStatus(e.target.innerText)} className="border cursor-pointer hover:opacity-100  opacity-80 mt-4 p-2 px-4 font-extrabold border-gray-400 rounded-xl">
                    Feeling great today! 😊
                </span>
                <span onClick={e=> setnewStatus(e.target.innerText)} className="border cursor-pointer hover:opacity-100  opacity-80 mt-4 p-2 px-4 font-extrabold border-gray-400 rounded-xl">
                    Just another day in paradise 🌴
                </span>
                <span onClick={e=> setnewStatus(e.target.innerText)} className="border cursor-pointer hover:opacity-100  opacity-80 mt-4 p-2 px-4 font-extrabold border-gray-400 rounded-xl">
                    Stay focused and never give up! 💪
                </span>
                <span onClick={e=> setnewStatus(e.target.innerText)} className="border cursor-pointer hover:opacity-100  opacity-80 mt-4 p-2 px-4 font-extrabold border-gray-400 rounded-xl">
                    Success starts with a single step 👣
                </span>
                <span onClick={e=> setnewStatus(e.target.innerText)} className="border cursor-pointer hover:opacity-100  opacity-80 mt-4 p-2 px-4 font-extrabold border-gray-400 rounded-xl">
                    My brain has stopped working for today 🧠💀
                </span>
                <span onClick={e=> setnewStatus(e.target.innerText)} className="border cursor-pointer hover:opacity-100  opacity-80 mt-4 p-2 px-4 font-extrabold border-gray-400 rounded-xl">
                    I’m not lazy, just on energy-saving mode 🔋
                </span>
                <span onClick={e=> setnewStatus(e.target.innerText)} className="border cursor-pointer hover:opacity-100  opacity-80 mt-4 p-2 px-4 font-extrabold border-gray-400 rounded-xl">
                    Just here for the memes 😆
                </span>
                <span onClick={e=> setnewStatus(e.target.innerText)} className="border cursor-pointer hover:opacity-100  opacity-80 mt-4 p-2 px-4 font-extrabold border-gray-400 rounded-xl">
                    Happy and grateful! ❤️
                </span>
            </div>
            {
                newStatus != user.status && newStatus != "" &&
                <BtnSave
                    onClick={handelSaveStatus}

                    IsLoading={IsLoading}
                />
            }
        </>
    )
}

export default ChangeStatus
