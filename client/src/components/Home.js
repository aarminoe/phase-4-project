import React, { useState } from "react";
import Posts from "./Posts";


function Home({userList, loggedInUser, onHandleNewPost}) {

    const [postText, setPostText] = useState('')

    function addNewPost(e) {
        e.preventDefault()
        console.log(postText)
        fetch(`/users/${loggedInUser.id}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                post: postText,
            })
        })
        .then(resp => resp.json())
        .then(data => console.log(data))
    }

    return(
        <div>
            <div>
                {loggedInUser.username}
                <form onSubmit={addNewPost}>
                    <input type='text' placeholder="Whats on your mind?" onChange={(e) => {setPostText(e.target.value)}}></input>
                    <button>Add Post</button>
                </form>
                {userList ? userList.map((user) => {
                    return  <Posts user={user} loggedInUser={loggedInUser}/>
                }):null}
            </div>
        </div>
    )
}

export default Home