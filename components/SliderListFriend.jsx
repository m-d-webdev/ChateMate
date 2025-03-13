import React from 'react'

const SliderListFriend = ({ CurrentIndex, OpenAll }) => {
    return (
        <>
            {
                OpenAll ?
                    <div style={{ height: "77.88px", top: CurrentIndex * 75.5 + "px" }} className=" sliderChatList  absolute left-0 rounded-3xl pb-4 "><div className="bg-blue-500 h-full rounded-full  w-full p-[2px]"></div></div>
                    :
                    <div style={{ height: "58px", top: CurrentIndex * 73 + "px" }} className=" sliderChatList  absolute  left-0 p-px rounded-full bg-blue-500 "></div>
            }
        </>
    )
}

export default SliderListFriend
