"use server"
import Image from 'next/image';
import { Aoboshi_One } from 'next/font/google'
// import { useRouter } from 'next/router';
import GetUser from '../user/profile/GetUser';
import WriteMessage from '@/components/WriteMessage';
import Link from 'next/link';
import { EncodMessage } from '@/utilityfunctions';

const aoboshi_One = Aoboshi_One({
    subsets: ['latin'],
    weight: ['400']
});


const page = async () => {
    const user = await GetUser();
    return (

        <div className="h-full w-full max-w-screen-lg  overflow-auto scrl_none  c-s-c">

            <Image
                src={'/icones/owliaLogo.svg'}
                width={120}
                height={120}
                className=' mb-12'
                alt='owliaLogo'
            />


            <div className={` tracking-[.1px] mt-4 ${aoboshi_One.className}  text-center`}>
                <p className='text-xl font-medium  opacity-80'>

                    <span className='text-2xl font-semibold  opacity-100 '>  Welcome! </span>
                    This is Owlia, an AI that you can interact with freely. It understands multiple languages, including Arabic and French, and is used in a straightforward way to assist you with your requests.
                </p>

                <p className='text-xl mt-4  font-medium opacity-80'>
                    You also have the option to save your chat history. However, keep in mind that saved messages are not encrypted, so avoid sharing sensitive information.
                </p>
            </div>

            <Link href={`/Owlia/chats/${user?.userName}${Date.now()}`} className='p-2 px-8 rounded-3xl r-c-c mt-8 bg-black text-white font-semibold'>
                Start a new chat with owlia
                <svg className='ml-2 stroke-2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M18 15l3 -3l-3 -3"></path> <path d="M3 12h18"></path> <path d="M3 9v6"></path> </svg>
            </Link>

            <div className="c-s-s mt-8 w-full ">
                <div className="c-s-s mb-8">
                    <h3 className='opacity-70'>Casual Conversation</h3>
                    <div className="r-w-s-s w-full mt-2">
                        <Link href={`/Owlia/chats/${user?.userName}${Date.now()}/${encodeURIComponent("Hey, how's your day going?")}`} className={`hover:scale-105 font-semibold  hover:drop-shadow-lg cursor-pointer ml-2 p-2 px-4 border border-gray-200 bg-white   rounded-xl mt-2 ${aoboshi_One.className}`}>Hey, how's your day going?</Link>
                        <Link href={`/Owlia/chats/${user?.userName}${Date.now()}/${encodeURIComponent("Tell me something interesting!")}`} className={`hover:scale-105 font-semibold  hover:drop-shadow-lg cursor-pointer ml-2 p-2 px-4 border border-gray-200 bg-white   rounded-xl mt-2 ${aoboshi_One.className}`}>Tell me something interesting!</Link>
                        <Link href={`/Owlia/chats/${user?.userName}${Date.now()}/${encodeURIComponent("What's new in tech these days?")}`} className={`hover:scale-105 font-semibold  hover:drop-shadow-lg cursor-pointer ml-2 p-2 px-4 border border-gray-200 bg-white   rounded-xl mt-2 ${aoboshi_One.className}`}>What's new in tech these days?</Link>

                    </div>
                </div>

                <div className="c-s-s mb-8">
                    <h3 className='opacity-70'>Learning & Knowledge</h3>
                    <div className="r-w-s-s w-full mt-2">
                        <Link href={`/Owlia/chats/${user?.userName}${Date.now()}/${encodeURIComponent("Can you explain quantum physics in simple terms?")}`} className={`hover:scale-105 font-semibold  hover:drop-shadow-lg cursor-pointer ml-2 p-2 px-4 border border-gray-200 bg-white   rounded-xl mt-2 ${aoboshi_One.className}`}>Can you explain quantum physics in simple terms?</Link>
                        <Link href={`/Owlia/chats/${user?.userName}${Date.now()}/${encodeURIComponent("How does machine learning work?")}`} className={`hover:scale-105 font-semibold  hover:drop-shadow-lg cursor-pointer ml-2 p-2 px-4 border border-gray-200 bg-white   rounded-xl mt-2 ${aoboshi_One.className}`}>How does machine learning work?</Link>
                        <Link href={`/Owlia/chats/${user?.userName}${Date.now()}/${encodeURIComponent("Tell me about the history of Morocco.")}`} className={`hover:scale-105 font-semibold  hover:drop-shadow-lg cursor-pointer ml-2 p-2 px-4 border border-gray-200 bg-white   rounded-xl mt-2 ${aoboshi_One.className}`}>Tell me about the history of Morocco.</Link>

                    </div>
                </div>

                <div className="c-s-s mb-8">
                    <h3 className='opacity-70'>Creative & Fun</h3>
                    <div className="r-w-s-s w-full mt-2">
                        <Link href={`/Owlia/chats/${user?.userName}${Date.now()}/${encodeURIComponent("Can you write me a short sci-fi story?")}`} className={`hover:scale-105 font-semibold  hover:drop-shadow-lg cursor-pointer ml-2 p-2 px-4 border border-gray-200 bg-white   rounded-xl mt-2 ${aoboshi_One.className}`}>Can you write me a short sci-fi story?</Link>
                        <Link href={`/Owlia/chats/${user?.userName}${Date.now()}/${encodeURIComponent("If you were a superhero, what powers would you have?")}`} className={`hover:scale-105 font-semibold  hover:drop-shadow-lg cursor-pointer ml-2 p-2 px-4 border border-gray-200 bg-white   rounded-xl mt-2 ${aoboshi_One.className}`}>If you were a superhero, what powers would you have?</Link>
                        <Link href={`/Owlia/chats/${user?.userName}${Date.now()}/${encodeURIComponent("Describe a futuristic city in 2050.")}`} className={`hover:scale-105 font-semibold  hover:drop-shadow-lg cursor-pointer ml-2 p-2 px-4 border border-gray-200 bg-white   rounded-xl mt-2 ${aoboshi_One.className}`}>Describe a futuristic city in 2050.</Link>

                    </div>
                </div>

                <div className="c-s-s mb-8">
                    <h3 className='opacity-70'>Problem-Solving & Advice</h3>
                    <div className="r-w-s-s w-full mt-2">
                        <Link href={`/Owlia/chats/${user?.userName}${Date.now()}/${encodeURIComponent("I need help debugging my JavaScript code.")}`} className={`hover:scale-105 font-semibold  hover:drop-shadow-lg cursor-pointer ml-2 p-2 px-4 border border-gray-200 bg-white   rounded-xl mt-2 ${aoboshi_One.className}`}>I need help debugging my JavaScript code.</Link>
                        <Link href={`/Owlia/chats/${user?.userName}${Date.now()}/${encodeURIComponent("What's the best way to learn a new language?")}`} className={`hover:scale-105 font-semibold  hover:drop-shadow-lg cursor-pointer ml-2 p-2 px-4 border border-gray-200 bg-white   rounded-xl mt-2 ${aoboshi_One.className}`}>What's the best way to learn a new language?</Link>
                        <Link href={`/Owlia/chats/${user?.userName}${Date.now()}/${encodeURIComponent("How do I improve my interview skills?")}`} className={`hover:scale-105 font-semibold  hover:drop-shadow-lg cursor-pointer ml-2 p-2 px-4 border border-gray-200 bg-white   rounded-xl mt-2 ${aoboshi_One.className}`}>How do I improve my interview skills?</Link>

                    </div>
                </div>

                <div className="c-s-s mb-8">
                    <h3 className='opacity-70'>Personalized Topics</h3>
                    <div className="r-w-s-s w-full mt-2">
                        <Link href={`/Owlia/chats/${user?.userName}${Date.now()}/${encodeURIComponent("I want to practice my English—can we have a conversation?")}`} className={`hover:scale-105 font-semibold  hover:drop-shadow-lg cursor-pointer ml-2 p-2 px-4 border border-gray-200 bg-white   rounded-xl mt-2 ${aoboshi_One.className}`}>I want to practice my English—can we have a conversation?</Link>
                        <Link href={`/Owlia/chats/${user?.userName}${Date.now()}/${encodeURIComponent("Give me some ideas for my website.")}`} className={`hover:scale-105 font-semibold  hover:drop-shadow-lg cursor-pointer ml-2 p-2 px-4 border border-gray-200 bg-white   rounded-xl mt-2 ${aoboshi_One.className}`}>Give me some ideas for my website.</Link>
                        <Link href={`/Owlia/chats/${user?.userName}${Date.now()}/${encodeURIComponent("How can I optimize my online business?")}`} className={`hover:scale-105 font-semibold  hover:drop-shadow-lg cursor-pointer ml-2 p-2 px-4 border border-gray-200 bg-white   rounded-xl mt-2 ${aoboshi_One.className}`}>How can I optimize my online business?</Link>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default page
