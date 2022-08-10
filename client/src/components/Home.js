import React, { useState } from "react";
import Post from "./Post";


function Home({userList, loggedInUser, onHandleNewPost, postList}) {
    console.log(postList)
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

    function handlePostTextChange(e) {
        setPostText(e.target.value)
    }

    console.log(postList)
    return(
        <div>
            <div>
                {loggedInUser.username}
                <form onSubmit={addNewPost}>
                    <input type='text' placeholder="Whats on your mind?" value={postText} onChange={handlePostTextChange}></input>
                    <button>Add Post</button>
                </form>
                {postList.map((post) => {
                    return  <Post post={post} loggedInUser={loggedInUser}/>
                })}
            </div>
        </div>
    )
}

export default Home