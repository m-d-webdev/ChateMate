import React from 'react'
import './loaderCss.css'

const Spinner = ({ isWhite = false, width = 26, height = 26, borderWidth = 5, brColor1 = "#0000", brColor2 = "#000000" }) => {

    return (
        <div className={isWhite ? "spinnerWhite" : "spinner"}></div>
    )
}

export default Spinner
