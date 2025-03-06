import React from 'react'
import './loaderCss.css'

const Spinner = ({ isWhite = false }) => {
    const style = {
        background: isWhite ? "conic-gradient(#ffffff2c 10%,#ffffff)" : "conic-gradient(#0000 10%,#000000)",
        WebkitMask: "radial-gradient(farthest-side,#0000 calc(100% - 5px),#000 0)",

    }
    return (
        <div style={style}  className={`spinner       `}></div>
    )
}

export default Spinner
