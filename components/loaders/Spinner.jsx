import React from 'react'
import './loaderCss.css'

const Spinner = ({ isWhite = false, width = 26, height = 26, borderWidth = 5, brColor1 = "#0000", brColor2 = "#000000" }) => {
    const style = {
        background: isWhite ? "conic-gradient(#ffffff2c 10%,#ffffff)" : `conic-gradient(${brColor1} 10%,${brColor2})`,
        WebkitMask: `radial-gradient(farthest-side,#0000 calc(100% - ${borderWidth}px),#000 0)`,
        width, height
    }
    return (
        <div style={style} className={`spinner       `}></div>
    )
}

export default Spinner
