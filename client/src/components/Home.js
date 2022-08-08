import React, { useState } from "react";
import Post from "./Post";


function Home({userList, loggedInUser, onHandleNewPost, postList}) {
    console.log(userList)
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
        .then(data => {
            onHandleNewPost(data, loggedInUser)
            setPostText('')
        })
    }

    console.log(postList)
    return(
        <div>
            <div>
                {loggedInUser.username}
                <form onSubmit={addNewPost}>
                    <input type='text' placeholder="Whats on your mind?" value={postText} onChange={(e) => {setPostText(e.target.value)}}></input>
                    <button>Add Post</button>
                </form>
                {postList ? postList.sort().map((post) => {
                    return  <Post post={post} loggedInUser={loggedInUser}/>
                }):null}
            </div>
        </div>
    )
}

export default Home