import React, { useState } from "react"
import FriendsList from "./FriendsList"


function Profile({loggedInUser, userList}) {

    const [pictureFile, setPictureFile] = useState(null)


    function handlePictureFile(e) {
        setPictureFile(e.target.value)
        console.log(e.target.value)
    }

    return(
        <div>
        {!loggedInUser.avatar_url ? 
        <div>
            <header>Please Create Your Profile!</header>
            <form>
                <p>Upload Profile Picture:</p>
                <input type='file' onChange={handlePictureFile}/>
                <p>Add About Me:</p>
                <input type='text' />
            </form>
        </div>   
        :
        <div>
            <img src={loggedInUser.avatar_url}></img>
            <div>
                <div>
                    {loggedInUser.bio}
                </div>
                <FriendsList loggedInUser={loggedInUser} userList={userList}/>
            </div>
        </div>
        }
        </div>
    )
}

export default Profile