import React from 'react'
import FriendComp from './friendComp';

const ChatList = async () => {

    const users = [
        {
            id: 1,
            fullName: "Ahmed Bennani",
            userName: "ahmed_b",
            img: "https://i.pinimg.com/236x/f4/2d/bf/f42dbf035036b76346f3e3286c64f9b4.jpg",
            lastMessage: "Hey, how are you?",
            sentAt: "2025-02-25T14:30:00Z"
        },
        {
            id: 2,
            fullName: "Sarah El Amrani",
            userName: "sarah.amr",
            img: "https://i.pinimg.com/236x/f4/2d/bf/f42dbf035036b76346f3e3286c64f9b4.jpg",
            lastMessage: "I'll call you later!",
            sentAt: "2025-02-25T13:45:00Z"
        },
        {
            id: 3,
            fullName: "Omar Khalil",
            userName: "omar_kh",
            img: "https://i.pinimg.com/236x/f4/2d/bf/f42dbf035036b76346f3e3286c64f9b4.jpg",
            lastMessage: "Did you check that link?",
            sentAt: "2025-02-25T12:20:00Z"
        },
        {
            id: 4,
            fullName: "Layla Hamzaoui",
            userName: "layla_hz",
            img: "https://i.pinimg.com/236x/f4/2d/bf/f42dbf035036b76346f3e3286c64f9b4.jpg",
            lastMessage: "See you tomorrow!",
            sentAt: "2025-02-25T11:10:00Z"
        },
        {
            id: 5,
            fullName: "Hassan Taoufik",
            userName: "hassan_tk",
            img: "https://i.pinimg.com/236x/f4/2d/bf/f42dbf035036b76346f3e3286c64f9b4.jpg",
            lastMessage: "Let's meet up later.",
            sentAt: "2025-02-25T10:05:00Z"
        },
        {
            id: 6,
            fullName: "Yasmine Rachid",
            userName: "yasmine_r",
            img: "https://i.pinimg.com/236x/f4/2d/bf/f42dbf035036b76346f3e3286c64f9b4.jpg",
            lastMessage: "Just finished work!",
            sentAt: "2025-02-25T09:30:00Z"
        },
        {
            id: 7,
            fullName: "Khalid Mansour",
            userName: "khalid_m",
            img: "https://i.pinimg.com/236x/f4/2d/bf/f42dbf035036b76346f3e3286c64f9b4.jpg",
            lastMessage: "I'll send you the details soon.",
            sentAt: "2025-02-25T08:45:00Z"
        },
        {
            id: 8,
            fullName: "Nour Belkacem",
            userName: "nour_bk",
            img: "https://i.pinimg.com/236x/f4/2d/bf/f42dbf035036b76346f3e3286c64f9b4.jpg",
            lastMessage: "Thank you!",
            sentAt: "2025-02-25T07:55:00Z"
        },
        {
            id: 9,
            fullName: "Rachid El Idrissi",
            userName: "rachid_ei",
            img: "https://i.pinimg.com/236x/f4/2d/bf/f42dbf035036b76346f3e3286c64f9b4.jpg",
            lastMessage: "Did you get my email?",
            sentAt: "2025-02-25T06:20:00Z"
        },
        {
            id: 10,
            fullName: "Salma Jebli",
            userName: "salma_j",
            img: "https://i.pinimg.com/236x/f4/2d/bf/f42dbf035036b76346f3e3286c64f9b4.jpg",
            lastMessage: "Good morning!",
            sentAt: "2025-02-25T05:10:00Z"
        },
        {
            id: 11,
            fullName: "Hamza Ziani",
            userName: "hamza_z",
            img: "https://i.pinimg.com/236x/f4/2d/bf/f42dbf035036b76346f3e3286c64f9b4.jpg",
            lastMessage: "Can we talk now?",
            sentAt: "2025-02-24T22:50:00Z"
        },
        {
            id: 12,
            fullName: "Fatima Ould",
            userName: "fatima_ou",
            img: "https://i.pinimg.com/236x/f4/2d/bf/f42dbf035036b76346f3e3286c64f9b4.jpg",
            lastMessage: "I'm almost there!",
            sentAt: "2025-02-24T21:15:00Z"
        },
        {
            id: 13,
            fullName: "Ali Bouras",
            userName: "ali_b",
            img: "https://i.pinimg.com/236x/f4/2d/bf/f42dbf035036b76346f3e3286c64f9b4.jpg",
            lastMessage: "Let's catch up soon.",
            sentAt: "2025-02-24T20:40:00Z"
        },
        {
            id: 14,
            fullName: "Meriem Cherkaoui",
            userName: "meriem_ch",
            img: "https://i.pinimg.com/236x/f4/2d/bf/f42dbf035036b76346f3e3286c64f9b4.jpg",
            lastMessage: "Have a great day!",
            sentAt: "2025-02-24T19:30:00Z"
        },
        {
            id: 15,
            fullName: "Yassine Bouziane",
            userName: "yassine_bz",
            img: "https://i.pinimg.com/236x/f4/2d/bf/f42dbf035036b76346f3e3286c64f9b4.jpg",
            lastMessage: "I'll be late tonight.",
            sentAt: "2025-02-24T18:05:00Z"
        },
        {
            id: 16,
            fullName: "Imane Loukili",
            userName: "imane_lk",
            img: "https://i.pinimg.com/236x/f4/2d/bf/f42dbf035036b76346f3e3286c64f9b4.jpg",
            lastMessage: "Sounds good!",
            sentAt: "2025-02-24T17:25:00Z"
        },
        {
            id: 17,
            fullName: "Tariq Jabbari",
            userName: "tariq_jb",
            img: "https://i.pinimg.com/236x/f4/2d/bf/f42dbf035036b76346f3e3286c64f9b4.jpg",
            lastMessage: "Where are you now?",
            sentAt: "2025-02-24T16:45:00Z"
        },
        {
            id: 18,
            fullName: "Aya Benhadi",
            userName: "aya_bh",
            img: "https://i.pinimg.com/236x/f4/2d/bf/f42dbf035036b76346f3e3286c64f9b4.jpg",
            lastMessage: "I'll let you know soon.",
            sentAt: "2025-02-24T15:20:00Z"
        },
        {
            id: 19,
            fullName: "Mohamed Fassi",
            userName: "mohamed_f",
            img: "https://i.pinimg.com/236x/f4/2d/bf/f42dbf035036b76346f3e3286c64f9b4.jpg",
            lastMessage: "See you at the meeting!",
            sentAt: "2025-02-24T14:10:00Z"
        },
        {
            id: 20,
            fullName: "Nada Tazi",
            userName: "nada_tz",
            img: "https://i.pinimg.com/236x/f4/2d/bf/f42dbf035036b76346f3e3286c64f9b4.jpg",
            lastMessage: "It was great talking to you!",
            sentAt: "2025-02-24T13:00:00Z"
        }
    ];


    return (
        <div className="c-s-c w-3/12  bg-white drop-shadow-md rounded-2xl h-full max-w-xl p-4">
            <div className="w-full  r-b-c">
                <span className="r-s-e">
                    <svg className='w-8 h-8' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M6.5 3h11c1.325 0 2.5 1 2.5 2.5c0 2 -1.705 3.264 -2 3.5l-4.5 4l2 -5h-9a2.5 2.5 0 0 1 0 -5z"></path> <path d="M17.5 21h-11c-1.325 0 -2.5 -1 -2.5 -2.5c0 -2 1.705 -3.264 2 -3.5l4.5 -4l-2 5h9a2.5 2.5 0 1 1 0 5z"></path> </svg>
                    <h1 className='font-bold text-xl ml-3'>Chats</h1>
                </span>
                <button>
                    <svg className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path> <path d="M9 4v16"></path> <path d="M15 10l-2 2l2 2"></path> </svg>
                </button>
            </div>

            <div className="w-full mt-8 rounded-3xl border r-s-c p-2">
                <svg className='opacity-70  w-6 h-6 ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path> <path d="M21 21l-6 -6"></path> </svg>
                <input type="text" placeholder='Search' className='ml-4 border-none outline-none w-full' />
            </div>
            <div className="h-full w-full c-s-c mt-2 overflow-auto scrl_none">
                {
                    users.map(u => <FriendComp data={u} key={u.id} />)
                }
            </div>
        </div>
    )
}

export default ChatList
