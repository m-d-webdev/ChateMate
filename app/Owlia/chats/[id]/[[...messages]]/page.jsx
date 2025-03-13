"use client"
import WriteMessage from '@/components/WriteMessage';

import React, { useEffect, useRef, useState } from 'react'
import Message from '@/components/message';
import { _onClickOutElem, api, DecodMessage } from '@/utilityfunctions';
import Loader from '@/components/loaders/Loader';
import { useFriends } from '@/app/user/profile/FriendProvider';
import owlWelcoming from '@/public/lotties/owlWelcoming.json'
import Lottie from 'react-lottie';
import { useRouter } from 'next/navigation';

const page = ({ params }) => {
    const { id, messages } = React.use(params);
    const { thisUser } = useFriends()
    const Router = useRouter()

    // -------
    const [FaileToResponse, setFaileToResponse] = useState(false);
    const [ChatMessages, setMessages] = useState([]);
    const [NewMessage, setNewMessage] = useState("")
    const [isWaitingForResponse, setWaitingForResponse] = useState(false)
    const messageContainerRef = useRef();

    useEffect(() => {
        let MessgeFromUrl = Array.isArray(messages) ? messages[0] : messages;
        if (MessgeFromUrl) {
            MessgeFromUrl = decodeURIComponent(MessgeFromUrl);
            GetFirstResponse(MessgeFromUrl);
            Router.replace(`/Owlia/chats/${id}`)
        }
    }, []);

    const GetFirstResponse = async (MessgeFromUrl) => {
        setWaitingForResponse(true);
        setMessages(pv => ([
            {
                content: MessgeFromUrl,
                isFromMe: true,
            }
        ]));

        setNewMessage("");
        let res = await api.post("/owlia/ask", {
            chatHistroy: [
                { role: "user", content: MessgeFromUrl }
            ]
        }).catch(res => {
            setWaitingForResponse(false);
            setFaileToResponse(true)
        })

        if (res.status == 200) {
            setMessages(pv => ([
                ...pv,
                {
                    content: res.data.answer.reply,
                    isFromMe: false,
                }
            ]))
        } else {

            setFaileToResponse(true)
        }
        setWaitingForResponse(false);
    }


    const SendMessage = async () => {

        setWaitingForResponse(true);

        let chatHistroy = ChatMessages.map(m => ({ role: m.isFromMe ? "user" : "assistant", content: m.content })).slice(-3);

        chatHistroy.push(
            {
                role: "user",
                content: NewMessage
            }
        )


        setMessages(pv => ([
            ...pv,
            {
                content: NewMessage,
                isFromMe: true,
            }
        ]));


        setNewMessage("");

        let res = await api.post("/owlia/ask", { chatHistroy })


        if (res.status == 200) {
            setMessages(pv => ([
                ...pv,
                {
                    content: res.data.answer.reply,
                    isFromMe: false,
                }
            ]))

            messageContainerRef.current.scrollTo({
                top: messageContainerRef.current?.scrollHeight - 300,
                behavior: "smooth"
            })

        } else {
            setFaileToResponse(true)
        }

        setWaitingForResponse(false);
    }


    return (
        <div className="h-full  w-full  max-w-6xl c-c-c">

            <div style={{ paddingBottom: `${messageContainerRef.current?.offsetHeight - 500}px` }} ref={messageContainerRef} className='h-full scrl_none pt-10 mb-2 w-full max-h-full overflow-auto ' >
                {
                    ChatMessages.length == 0 &&
                    <div className='w-full h-full c-c-c'>
                        <Lottie options={{
                            animationData: owlWelcoming,
                            loop: true,
                            autoplay: true
                        }} height={180} />
                        <h1 className='mt-2 text-2xl '>Hi there !</h1>
                    </div>
                }

                {
                    ChatMessages.map((m, i) => {
                        m.img = m.isFromMe ? (thisUser?.pic || "https://i.pinimg.com/236x/56/2e/be/562ebed9cd49b9a09baa35eddfe86b00.jpg") : "/icones/owliaLogo.svg";
                        return <Message m={m} key={i} />
                    })
                }

                {
                    isWaitingForResponse &&
                    <div className="w-full r-s-c">
                        <Loader height={70} />
                    </div>
                }
                {
                    FaileToResponse &&
                    <p className="text-red-500 ">
                        Owlia encountered an error and could not respond
                    </p>
                }
            </div>
            <WriteMessage
                onChange={e => setNewMessage(e)}
                className={''}
                onSend={SendMessage}
                value={NewMessage}
                isWaitinForRespose={isWaitingForResponse}
                placeholder={"Ask Owlia anything .. "}
            />
        </div>
    )
}

export default page
