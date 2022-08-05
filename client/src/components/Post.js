import Comments from "./Comments";
import React, {useState} from "react";

function Post({post, user, loggedInUser}) {

    console.log(post.user.username)
    console.log(loggedInUser.username)



    function handleLike() {
        console.log(user)
        console.log(post)
        console.log(loggedInUser.username)
        if (post.user.username === loggedInUser.username) {
            console.log('hi')
        }
        fetch(`/users/${post.user.id}/posts/${post.id}/post_likes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_who_liked: loggedInUser.username,
            })
        })
        .then(resp => resp.json())
        .then(d => console.log(d))
    }

    function handleDeletePost() {
        console.log(post.user)
        fetch(`/users/${post.user.id}/posts/${post.id}`, {
            method: 'DELETE'
        })
    }

    return (
        <div className="post-card">
            <p>{post.user.username} posted:</p>
            {post.user.username == loggedInUser.username ? <button onClick={handleDeletePost}>X</button> : null}
            Post {post.post}
            <button onClick={handleLike}>👍</button>
            <p className="who-liked">
                {post.post_likes.length !== 0 && post.post_likes.length > 1 ? <p>{post.post_likes[0].user_who_liked} and {post.post_likes.length} other people liked this</p>: null}
                {post.post_likes.length === 1 ? <p>{post.post_likes[0].user_who_liked} liked this</p>: null}
                <Comments post={post} user={user}/>
            </p>
        </div>
    )
}

export default Post