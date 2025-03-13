
import ChateMateLogo from './logo.jsx';
import Link from 'next/link';
import Image from 'next/image';
import User from './user.jsx';
import ChatLink from './ChatLink.jsx';

const SiadeBare = ({ user }) => {

  return (
    <div className='h-screen border bg-white rounded-xl p-2 c-b-c'>

      <ChateMateLogo />
      <div className="c-c-c">
        <ChatLink />
        <Link className=' opacity-80 hover:opacity-100  c-c-c mt-8' href={'/Owlia'}>
          <Image
            src={"/icones/owliaLogo.svg"}
            width={20}
            height={20}
            alt='Owlia logo '
          />
          Owlia
        </Link>
        <Link href={"/Meetmates"} className="opacity-80  hover:opacity-100 c-c-c mt-8">
          <svg className="mr-2 w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M5 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path> <path d="M3 21v-2a4 4 0 0 1 4 -4h4c.96 0 1.84 .338 2.53 .901"></path> <path d="M16 3.13a4 4 0 0 1 0 7.75"></path> <path d="M16 19h6"></path> <path d="M19 16v6"></path> </svg>
          MeetMates
        </Link>
      </div>
      <User user={user} />
    </div>
  )
}

export default SiadeBare
