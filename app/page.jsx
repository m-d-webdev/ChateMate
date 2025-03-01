import Image from "next/image";
import Link from "next/link";

export default  function Home() {
  return (
    <div className="w-full  p-10   h-screen c-b-s">
      <div className=""></div>
      <div className="r-p-c rounded-md border w-full h-full ">
        <div className="c-s-s">
          <div className="w-full c-s-s mb-5">
            <h1 className="text-4xl">Whooo’s ready to chat? </h1>
            <h2 className="max-w-xl  opacity-80 mt-5 text-xl">
              Welcome to ChatMate – the wildest place to chat with friends, meet new ones, and dive into smart, fun conversations with Owlia! Let’s get talking
            </h2>
          </div>
          <div className="w-full r-s-c mt-7">

            <Link href={"/Chats"} className="r-c-c text-white px-5 py-2  rounded-3xl w-2/4 bg-black">
              Join the Chat
              <svg className="fill-white ml-3" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m700-300-57-56 84-84H120v-80h607l-83-84 57-56 179 180-180 180Z" /></svg>
            </Link>

          </div>

          <Link href={"/Owlia"} className=" font-bold r-s-c mt-20">

            <Image
              src={'./icones/owliaLogo.svg'}
              width={"20"}
              height={"20"}
              className="mr-2"
              alt="logo"
            />

            Dive into the future with Owlia !

          </Link>
          <Link href={"/Meetmates"} className=" font-bold r-s-c mt-5">
            <svg className="mr-2 w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M5 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path> <path d="M3 21v-2a4 4 0 0 1 4 -4h4c.96 0 1.84 .338 2.53 .901"></path> <path d="M16 3.13a4 4 0 0 1 0 7.75"></path> <path d="M16 19h6"></path> <path d="M19 16v6"></path> </svg>
            Invite friends in MeetMates
          </Link>
        </div>
        <div className="h-full c-e-e">
          <img src="/media/logoImg.png" className="h-96" alt="" />
        </div>
      </div>
      <div className="w-full  r-b-c mt-12">
        <div className="r-s-c ml-10">
          <span className="text-bold opacity-70">
            We are posting new features here :
          </span>

          <a className="r-s-c opacity-60 hover:opacity-100  " href="https://facebook.com" target="_blank">
            <svg className="w-6 h-6 stroke-2 stroke-blue-500  ml-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3"></path> </svg>
            <p className="ml-2  text-blue-500">
              ChateMate.fb
            </p>
          </a>

          <a className="r-s-c ml-5 opacity-60 hover:opacity-100  " href="https://instagramm.com" target="_blank">
            <svg className="w-6 stroke-2 stroke-blue-500  h-6 ml-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z"></path> <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path> <path d="M16.5 7.5l0 .01"></path> </svg>
            <p className="ml-2  text-blue-500">
              ChateMate.insta
            </p>
          </a>

          <a className="r-s-c  ml-5 opacity-60 hover:opacity-100 " href="https://www.linkedin.com" target="_blank">
            <svg className="w-6 stroke-2 stroke-blue-500 h-6 ml-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path> <path d="M8 11l0 5"></path> <path d="M8 8l0 .01"></path> <path d="M12 16l0 -5"></path> <path d="M16 16v-3a2 2 0 0 0 -4 0"></path> </svg>
            <p className="ml-2 text-blue-500">
              ChateMate.lin
            </p>
          </a>

        </div>
        <Link href={"/l"} className="opacity-70  r-s-c mr-10">
          Mind Behind ChatMate
          <svg className="w-6 h-6 ml-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path> <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path> </svg>
        </Link>
      </div>
    </div>
  );
}
