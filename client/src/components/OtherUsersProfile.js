import React from "react"
import FriendsList from "./FriendsList"

function OtherUsersProfile({friendData}) {

    console.log(console.log(friendData))

    return (
        <div>
            {friendData.avatar_url ? <img className='profile-avatar' src={friendData.avatar_url}></img> : null}
            <div>
                {friendData.username}
                <div>
                    {friendData.bio ? friendData.bio : null}
                </div>
                <button >See Friends of {friendData.username}</button>
            </div>
        </div>
    )
}

export default OtherUsersProfile