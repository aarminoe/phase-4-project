import React, { useState } from "react";
import Post from "./Post";


function Home({userList, loggedInUser, onHandleNewPost, postList, onHandleEditPost, onHandleDeletePost}) {
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

    console.log(postList)
    return(
        <div>
            <div>
                <div className="home-add-post">
                    <form onSubmit={addNewPost}>
                        <input type='text' placeholder="Whats on your mind?" value={postText} onChange={(e) => {setPostText(e.target.value)}}></input>
                        <button>Add Post</button>
                    </form>
                </div>
                {postList.map((post) => {
                    return  <Post post={post} loggedInUser={loggedInUser} onHandleEditPost={onHandleEditPost} onHandleDeletePost={onHandleDeletePost}/>
                })}
            </div>
        </div>
    )
}

export default Home