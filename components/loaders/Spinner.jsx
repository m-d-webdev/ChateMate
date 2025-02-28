import React from 'react'
import './loaderCss.css'

const Spinner = ({ d = "border-gray-700  border-4  w-7  h-7" }) => {

    return (
        <div className={`spinner      ${d}  `}></div>
    )
}

export default Spinner
