"use client";
import React, { useState } from 'react'
import CustomInput from './CustomInput'
import BtnSave from './BtnSave';
import { api } from '@/utilityfunctions';

const ChangeName = ({ user }) => {
    const [newFullName, setnewFullName] = useState(user.fullName);
    const [IsLoading, setIsLoading] = useState(false);


    const handelSaveName = async () => {
        setIsLoading(true)
        let res = await api.post("/user/updateFullName", { newFullName })
        console.log(res);
        if(res.status == 200){
            window.location.href ="/"
        }
        setIsLoading(false)
    }
    return (
        <>
            <h2 className='opacity-80 border-b-2 mb-8 w-full border-gray-300'>Change name</h2>
            <CustomInput
                Svg={({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path> <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path> </svg>}
                label={"Full name"}
                onChange={(e) => { setnewFullName(e) }}
                placeholder=''
                value={newFullName}
                id='name'

                className='mb-2 mt-5'
            />
            {
                newFullName != user.fullName && newFullName != "" &&
                <BtnSave
                    onClick={handelSaveName}

                    IsLoading={IsLoading}
                />
            }
        </>
    )
}

export default ChangeName
