import React, { useState } from "react"
import FriendsList from "./FriendsList"

function OtherUsersProfile({friendData, userList, onToOtherProfile}) {

    console.log(console.log(friendData))

    const [seeFriends, setSeeFriends] = useState(false)
    const [clickedUserData, setClickedUserData] = useState(null)
    const [sendingMessage, setSendingMessage] = useState(false)

    function handleOtherProfileFriends() {
        userList.forEach((user) => {
            if (user.username === friendData.username) {
                setClickedUserData(user)
            }
        })
        setSeeFriends((seeFriends) => !seeFriends)
    }

    function handleNewMessageClick() {
        setSendingMessage((sendingMessage) => !sendingMessage)
    }

    function handleNewMessageSend(e) {
        e.preventDefault()
        console.log(friendData)
    }

    return (
        <div>
            {friendData ? <img className='profile-avatar' src={friendData.avatar_url}></img> : null}
            <div>
                {friendData? friendData.username : null}
                <button className="message-icon" onClick={handleNewMessageClick}>🖂</button>
                <div>
                    {sendingMessage ?
                    <form onSubmit={handleNewMessageSend}>
                        <input type='text'></input>
                        <button>Send</button> 
                    </form> 
                    : null}
                    
                </div>
                <div>
                    {friendData ? friendData.bio : null}
                </div>
                <button onClick={handleOtherProfileFriends} >See Friends of {friendData ? friendData.username : null}</button>
                {seeFriends ? <FriendsList clickedUserData={clickedUserData} userList={userList} onToOtherProfile={onToOtherProfile} setSeeFriends={setSeeFriends} seeFriends={seeFriends} /> : null}
            </div>
        </div>
    )
}

export default OtherUsersProfile