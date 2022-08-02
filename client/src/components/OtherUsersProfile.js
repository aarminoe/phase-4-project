import React, { useState } from "react"
import FriendsList from "./FriendsList"

function OtherUsersProfile({friendData, userList, onToOtherProfile}) {

    console.log(console.log(friendData))

    const [seeFriends, setSeeFriends] = useState(false)
    const [clickedUserData, setClickedUserData] = useState(null)

    function handleOtherProfileFriends() {
        userList.forEach((user) => {
            if (user.username === friendData.username) {
                setClickedUserData(user)
            }
        })
        setSeeFriends((seeFriends) => !seeFriends)
    }

    return (
        <div>
            {friendData.avatar_url ? <img className='profile-avatar' src={friendData.avatar_url}></img> : null}
            <div>
                {friendData.username}
                <div>
                    {friendData.bio ? friendData.bio : null}
                </div>
                <button onClick={handleOtherProfileFriends} >See Friends of {friendData.username}</button>
                {seeFriends ? <FriendsList clickedUserData={clickedUserData} userList={userList} onToOtherProfile={onToOtherProfile} setSeeFriends={setSeeFriends} seeFriends={seeFriends} /> : null}
            </div>
        </div>
    )
}

export default OtherUsersProfile