
import ListHistoryChats from './ListHistoryChats';
import OwliaChatsProvider from './Provider';
import LinkToMain from './cmps/linkToMain';

const Layout = ({ children }) => {

    return (
        <OwliaChatsProvider>
            <div className='w-full r-b-s p-4  h-screen'>

                <LinkToMain />

                {children}

                <ListHistoryChats />
            </div>
        </OwliaChatsProvider>
    )
}

export default Layout
