"use client";
import React, { useEffect, useState } from 'react'

const CustomInput = ({ disabled, isError = false, className, Svg, placeholder = "", id = "customIput", label, value = "", onChange = () => { }, type, input_class="" }) => {

    return (
        <div className={`w-full overflow-hidden relative border ${isError ? "border-red-500" : ""} rounded-xl max-w-md r-s-c bg-white pl-10 ${className}`}>
            <input disabled={disabled} type={type ? type : "text"} id={id} name={id} onChange={e => onChange(e.target.value)} className={`border-none peer font-bold   w-full outline-none  ml-2 p-2 pt-5 inputCustomInput ${input_class}`} placeholder={placeholder} value={value} />
            <label htmlFor={id} className={`absolute left-14 op-80  peer-focus:text-${isError ? "red" : "blue"}-500 labelCustomInput ${isError ? "text-red-500" : ""} `}>{label}</label>
            <div className={`absolute left-2  peer-focus:*:stroke-${isError ? "red" : "blue"}-500 cntSvgCustomInput`}>
                <Svg className='w-5 h-5  ' />
            </div>
        </div>
    )
}

export default CustomInput
