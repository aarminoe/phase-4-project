import Comments from "./Comments";
import React, {useState} from "react";

function Post({post, loggedInUser, onHandleEditPost}) {
 

    const [editPost, setEditPost] = useState(false)
    const [editPostText, setEditPostText] = useState('')
    const [postLiked, setPostLiked] = useState(false)
    const [currentPostLikes, setCurrentPostLikes] = useState(post.post_likes)

    console.log(loggedInUser)
    console.log(post)

    function handleLike() {
        let userFound = false
        console.log(post.post_likes)
        setPostLiked((postLiked) => !postLiked)
        for (let i=0;i<currentPostLikes.length; i++) {
            if (currentPostLikes[i].user_who_liked === loggedInUser.username) {
                console.log('deleting like')
                handleDeletePostLike(currentPostLikes[i])
                userFound = true
                fetch(`/users/${post.user.id}/posts/${post.id}/post_likes/${currentPostLikes[i].id}`, {
                    method: 'DELETE'
                })
            }
        }
        if (userFound === false) {
            console.log('adding like')
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
            .then(like => handleAddPostLike(like))
        }
    }

    function handleAddPostLike(like) {
        const updatedPostLikes = [...currentPostLikes, like]
        setCurrentPostLikes(updatedPostLikes)
    }

    function handleDeletePostLike(deletedLike) {
        const updatedPostLikes = currentPostLikes.filter((like) => {
            return like !== deletedLike
        })
        setCurrentPostLikes(updatedPostLikes)
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
        .then(resp => resp.json())
        .then(data => onHandleEditPost(data))
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
            Post {post.post}
            <button onClick={handleLike}>👍</button>
            <p className="who-liked">
                {currentPostLikes.length !== 0 && currentPostLikes.length > 1 ? <p>{currentPostLikes[currentPostLikes.length -1].user_who_liked} and {currentPostLikes.length} other people liked this</p>: null}
                {currentPostLikes.length === 1 ? <p>{currentPostLikes[0].user_who_liked} liked this</p>: null}
                <Comments post={post} loggedInUser={loggedInUser}/>
            </p>
        </div>
    )
}

export default Post