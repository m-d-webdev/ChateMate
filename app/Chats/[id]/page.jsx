import Image from 'next/image';
import { Aoboshi_One } from 'next/font/google'
import Message from '@/components/message';
import React from 'react';
import InputMessage2 from '@/components/InputMessage2';
import ChatHead from '@/components/chatHead';
const aoboshi_One = Aoboshi_One({
    subsets: ['latin'],
    weight: ['400']
})
const page = ({ params }) => {
    const { id } = React.use(params);

    const messages = [
        {
            id: 1,
            img: "https://i.pinimg.com/236x/03/eb/d6/03ebd625cc0b9d636256ecc44c0ea324.jpg",
            content: "Hi there! How are you today?",
            isFromMe: true,
        },
        {
            id: 2,
            img: "/icones/owliaLogo.svg",
            content: "I'm doing well, thank you! How can I assist you?",
            isFromMe: false,
        },
        {
            id: 3,
            img: "https://i.pinimg.com/236x/03/eb/d6/03ebd625cc0b9d636256ecc44c0ea324.jpg",
            content: "Can you tell me more about letter spacing in Tailwind CSS?",
            isFromMe: true,
        },
        {
            id: 4,
            img: "/icones/owliaLogo.svg",
            content: "Sure! Letter spacing can be adjusted using the `tracking` utility classes.",
            isFromMe: false,
        },
        {
            id: 5,
            img: "https://i.pinimg.com/236x/03/eb/d6/03ebd625cc0b9d636256ecc44c0ea324.jpg",
            content: "That's great! Can you show me an example?",
            isFromMe: true,
        },
        {
            id: 6,
            img: "/icones/owliaLogo.svg",
            content: "Certainly! You can use classes like `tracking-tight`, `tracking-normal`, and `tracking-wide` Certainly! You can use classes like `tracking-tight`, `tracking-normal`, and `tracking-wide` Certainly! You can use classes like `tracking-tight`, `tracking-normal`, and `tracking-wide`.",
            isFromMe: false,
        },
        {
            id: 7,
            img: "https://i.pinimg.com/236x/03/eb/d6/03ebd625cc0b9d636256ecc44c0ea324.jpg",
            content: "How do I customize letter spacing in my project?",
            isFromMe: true,
        },
        {
            id: 8,
            img: "/icones/owliaLogo.svg",
            content: "You can add custom values in your Tailwind configuration file under the `letterSpacing` section.",
            isFromMe: false,
        },
        {
            id: 9,
            img: "https://i.pinimg.com/236x/03/eb/d6/03ebd625cc0b9d636256ecc44c0ea324.jpg",
            content: "Can I use negative letter spacing?",
            isFromMe: true,
        },
        {
            id: 10,
            img: "/icones/owliaLogo.svg",
            content: "Yes, you can use negative values in your configuration for tighter letter spacing.",
            isFromMe: false,
        },
        {
            id: 11,
            img: "https://i.pinimg.com/236x/03/eb/d6/03ebd625cc0b9d636256ecc44c0ea324.jpg",
            content: "What are some common use cases for letter spacing?",
            isFromMe: true,
        },
        {
            id: 12,
            img: "/icones/owliaLogo.svg",
            content: "Common use cases include improving readability, creating emphasis, or achieving a specific aesthetic.",
            isFromMe: false,
        },
        {
            id: 13,
            img: "https://i.pinimg.com/236x/03/eb/d6/03ebd625cc0b9d636256ecc44c0ea324.jpg",
            content: "Can I apply letter spacing to headings and paragraphs?",
            isFromMe: true,
        },
        {
            id: 14,
            img: "/icones/owliaLogo.svg",
            content: "Absolutely! You can apply letter spacing to any text element using the appropriate classes.",
            isFromMe: false,
        },
        {
            id: 15,
            img: "https://i.pinimg.com/236x/03/eb/d6/03ebd625cc0b9d636256ecc44c0ea324.jpg",
            content: "Thanks for the help! This is really useful.",
            isFromMe: true,
        },
        {
            id: 16,
            img: "/icones/owliaLogo.svg",
            content: "You're welcome! If you have any more questions, feel free to ask.",
            isFromMe: false,
        },
        {
            id: 17,
            img: "https://i.pinimg.com/236x/03/eb/d6/03ebd625cc0b9d636256ecc44c0ea324.jpg",
            content: "What other utilities should I explore in Tailwind CSS?",
            isFromMe: true,
        },
        {
            id: 18,
            img: "/icones/owliaLogo.svg",
            content: "You might want to look into margin, padding, and color utilities for better layout control.",
            isFromMe: false,
        },
        {
            id: 19,
            img: "https://i.pinimg.com/236x/03/eb/d6/03ebd625cc0b9d636256ecc44c0ea324.jpg",
            content: "Awesome! I’ll check those out. Thank you!",
            isFromMe: true,
        },
        {
            id: 20,
            img: "/icones/owliaLogo.svg",
            content: "Happy to help! Enjoy your coding!",
            isFromMe: false,
        },
    ];

    return (
        <div className="h-full w-full c-c-c max-w-6xl px-4 ">
            <ChatHead data={id} />
            {
                messages.length == 0 ?
                    <div className='c-c-c mb-20'>
                        <Image
                            src={'/icones/owliaLogo.svg'}
                            width={80}
                            height={80}
                            alt='owliaLogo'
                        />
                        <h1 className={`text-3xl tracking-[.5px] mt-4 ${aoboshi_One.className}`}>
                            What's up ? Let’s chat and have a good time!
                        </h1>
                    </div>
                    :
                    <div className='h-full scrl_none pt-10 mb-2 w-full max-h-full overflow-auto ' >
                        {
                            messages.map(m => <Message m={m} key={m.id} />)
                        }
                    </div>

            }
            <InputMessage2 />
        </div>

    )
}

export default page
