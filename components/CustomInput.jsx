"use client";
import React, { useState } from 'react'

const CustomInput = ({ className, Svg, placeholder = "", id = "customIput", label, value = "", onChange = () => { }, type }) => {
    const [localvalue, setValue] = useState(value)
    const handelChangeVal = e => {
        onChange(e.target.value);
        setValue(e.target.value)
    }

    return (
        <div className={`w-full relative border rounded-xl max-w-md r-s-c bg-white pl-10 ${className}`}>
            <input type={type ? type : "text"} id={id} onChange={handelChangeVal} className='border-none font-bold   pt-5 w-full outline-none  ml-2 p-2 inputCustomInput' placeholder={placeholder} value={localvalue} />
            <label htmlFor={id} className='absolute left-14 op-80 labelCustomInput'>{label}</label>
            <div className="absolute left-2 cntSvgCustomInput">
                <Svg className='w-5 h-5' />
            </div>
        </div>
    )
}

export default CustomInput
