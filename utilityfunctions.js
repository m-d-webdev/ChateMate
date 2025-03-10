import axios from 'axios'
import Cookies from 'js-cookie'
export const api = axios.create(
    {
        baseURL: "http://localhost:5000",
        headers: {
            Authorization: `Bearer ${Cookies.get('token') ? Cookies.get('token') : null}`
        },
        withCredentials: true
    }
)
// --------------


export const EncodMessage = (m) => {
    try {

        if (m.type == "text") {
            m.content = btoa(m.content);
            console.log(m);
            return m;
        } else {
            console.log('we will encode this =>', m.content);

            let ToUint8Array = new Uint8Array(m.content);

            let binaryed = String.fromCharCode(...ToUint8Array);

            let Codedbase64 = btoa(binaryed);

            m.content = Codedbase64;
            console.log('this is the result =>' ,m);
            
            return m

        }
    } catch (error) {
        return m
    }
}

export const DecodMessage = (m) => {
    try {

        if (m.type == "text") {

            m.content = atob(m.content);
            return m;

        } else {

            let decodedBinary = atob(m.content);
            let uint8Array = new Uint8Array([...decodedBinary].map(c => c.charCodeAt(0)));
            m.content = uint8Array.buffer;
            return m
        }
    } catch (error) {
        console.log(error);

        return m
    }
}


// -------------------------------
export const _onClickOutElem = (elem, func) => {
    const clk = e => {
        if (!elem.contains(e.target)) {
            document.removeEventListener("mousedown", clk)
            func();
        }
    }
    document.addEventListener("mousedown", clk);
}

export const CorrectTime = (t) => {
    const time = new Date(t);
    let deffTime = new Date() - time
    if ((deffTime / (1000 * 60 * 60 * 24)) > 1) {
        return time.toLocaleDateString()
    } else {
        return `${time.getHours()}:${time.getMinutes()}`
    }
}


