
import ChateMateLogo from './logo.jsx';
import Link from 'next/link';
import Image from 'next/image';
import User from './user.jsx';
import ChatLink from './ChatLink.jsx';
import LinkToOwlia from './LinkToOwlia.jsx';
import MeetMateLink from './MeetMateLink.jsx';

const SiadeBare = ({ user }) => {
  return (
    <div className='h-screen border bg-white rounded-xl p-2 c-b-c'>

      <ChateMateLogo />
      <div className="c-c-c">
        <ChatLink />
        <LinkToOwlia />
        <MeetMateLink />
      </div>
      <User user={user} />
    </div>
  )
}

export default SiadeBare
