import React, { useState } from "react"
import Friend from "./Friend"

function Profile({loggedInUser}) {

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
                <div>{loggedInUser.friends.map((friend) => {
                    return <Friend friend={friend} />
                })}</div>
            </div>
        </div>
        }
        </div>
    )
}

export default Profile