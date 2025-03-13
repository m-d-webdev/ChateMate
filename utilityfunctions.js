import moment from "moment";
import axios from 'axios'
import Cookies from 'js-cookie'
import { GetSocket } from './config/socket';

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
            return  m.content;
        } else {
            let ToUint8Array = new Uint8Array(m.content);

            let toChar = ToUint8Array.reduce((t, e) => t + String.fromCharCode(e), "");
            let Codedbase64 = btoa(toChar);

            m.content = Codedbase64;

            return m

        }
    } catch (error) {
        console.log('failed en code => ', error);

        return error
    }
}

export const DecodMessage = (m) => {
    try {

        if (m.type == "text") {

            m.content = atob(m.content);
            console.log(m.content);
            
            return m.content;

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
// -----------

export const SendFileAsCunks = async (m) => {
    return new Promise(
        (resolve, reject) => {
            try {
                console.log();
                const socket = GetSocket()
                if (!socket) {
                    reject('failed ! socket out ');
                }

                let TotaleSize = m.content.byteLength;
                let one_chunk_size = 64 * 1024
                let totaleChunkSent = 0
                let LoopSending = () => {
                    if (totaleChunkSent < TotaleSize) {

                        let chunk = m.content.slice(totaleChunkSent, totaleChunkSent + one_chunk_size);

                        socket.emit("data-chunk", { chunk, chat_id: m.chat_id, message_id: m._id, SocketTO: m.SocketTO }, (response) => {

                            if (response.ok) {
                                totaleChunkSent += one_chunk_size;
                                LoopSending()
                            } else {
                                reject('failed , friend out ')
                            }
                        })

                    } else {
                        delete m['content']
                        socket.emit("data-chunk-end", { type: m.type, chat_id: m.chat_id, _id: m._id, sendAt: m.sendAt, recievedBy: [], readBy: [], senderId: m.senderId, SocketTO: m.SocketTO }, () => {
                            resolve()
                        })
                    }

                }
                LoopSending();
                // resolve()
            } catch (error) {
                console.log('this is the error of chunking file => ', error);
                reject(error)

            }
        }
    )
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

// export const  = (t) => {
//     const time = new Date(t);
//     let deffTime = new Date() - time
//     if ((deffTime / (1000 * 60 * 60 * 24)) > 1) {
//         return time.toLocaleDateString()
//     } else {
//         return `${time.getHours()}:${time.getMinutes()}`
//     }
// }

export function CorrectTime(timestamp) {
    const now = moment();
    const messageTime = moment(timestamp);
    if (now.diff(messageTime, "seconds") < 60) return "Just now";
    if (now.diff(messageTime, "minutes") < 60) return messageTime.fromNow(); 
    if (now.isSame(messageTime, "day")) return messageTime.format("h:mm A"); 
    if (now.diff(messageTime, "days") === 1) return "Yesterday";
    return messageTime.format("DD MMM YYYY"); 
}

export default function ChatMessage({ timestamp }) {
    return <p>Last message: {formatMessageTime(timestamp)}</p>;
}


