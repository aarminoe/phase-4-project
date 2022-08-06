import Comments from "./Comments";
import React, {useState} from "react";

function Post({post, loggedInUser}) {
    console.log(post)
    console.log(post.user.username)
    console.log(loggedInUser.username)

    const [editPost, setEditPost] = useState(false)
    const [editPostText, setEditPostText] = useState('')



    function handleLike() {
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

    function handleEditPost(e) {
        e.preventDefault()
        fetch(`/users/${post.user.id}/posts/${post.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                post: editPostText
            })
        })
        .then(resp => resp.json)
        .then(data => console.log(data))
    }
    
    function handleEditPostClick() {
        setEditPost((editPost) => !editPost)
    }

    return (
        <div className="post-card">
            <p>{post.user.username} posted:</p>
            {post.user.username == loggedInUser.username ? <button onClick={handleDeletePost}>X</button> : null}
            {editPost ? 
            <div>
                <form onSubmit={handleEditPost}>
                    <input type='text' onChange={(e) => setEditPostText(e.target.value)}></input>
                    <button>Add Edit</button>
                </form>
            </div>
        :null}
            {post.user.username == loggedInUser.username ? <button onClick={handleEditPostClick}>Edit Post</button>: null}
            <p>{post.created_at}</p>
            Post {post.post}
            <button onClick={handleLike}>👍</button>
            <p className="who-liked">
                {post.post_likes.length !== 0 && post.post_likes.length > 1 ? <p>{post.post_likes[0].user_who_liked} and {post.post_likes.length} other people liked this</p>: null}
                {post.post_likes.length === 1 ? <p>{post.post_likes[0].user_who_liked} liked this</p>: null}
                <Comments post={post} loggedInUser={loggedInUser}/>
            </p>
        </div>
    )
}

export default Post