
import Image from 'next/image';
import ListHistoryChats from './ListHistoryChats';

const Layout = ({ children }) => {

    return (
        <div className='w-full r-b-s p-4  h-screen'>
            <div className="r-s-c">
                <Image
                    src={'/icones/owliaLogo.svg'}
                    width={30}
                    height={30}
                    alt='owliaLogo'
                    className='mr-3'
                />
                <h1 className='font-bold text-xl'>Owlia</h1>
            </div>
            {children}
            <ListHistoryChats />
        </div>
    )
}

export default Layout
