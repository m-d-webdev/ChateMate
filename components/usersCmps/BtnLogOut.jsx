"use client";
import { api } from '@/utilityfunctions'
import React from 'react'

const BtnLogOut = ({ className }) => {
    const handelLogOut = async () => {
        api.post("/logout").then(res => {
            window.location.href = "/"
        })
    }
    return (
        <button onClick={handelLogOut} className={`  rounded-xl r-c-c ${className}`}>
            Logout
            <svg className="ml-2 stroke-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path> <path d="M9 12h12l-3 -3"></path> <path d="M18 15l3 -3"></path> </svg>
        </button>
    )
}

export default BtnLogOut
