import Comments from "./Comments";
import React, {useState} from "react";

function Post({post, loggedInUser}) {
 

    const [editPost, setEditPost] = useState(false)
    const [editPostText, setEditPostText] = useState('')
    const [postLiked, setPostLiked] = useState(false)
    const [currentPostLikes, setCurrentPostLikes] = useState(post.post_likes)

    console.log(loggedInUser)

    function handleLike() {
        let userFound = false
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

        // post.post_likes.forEach((like) => {
        //     console.log(like)
        //     if (like.user_who_liked === loggedInUser.username) {
        //         console.log('is liked')
        //         console.log(like)
        //         fetch(`/users/${post.user.id}/posts/${post.id}/post_likes/${like.id}`, {
        //             method: 'DELETE'
        //         })
        //         .then(setPostLiked((postLiked) => !postLiked))
                
        //     }
        //     return
        // })
        // console.log(post)
        // console.log(loggedInUser.username)
        // if (postLiked === false) {
        //     handleLikeFetch()
        // }
        

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
                {currentPostLikes.length !== 0 && currentPostLikes.length > 1 ? <p>{currentPostLikes[currentPostLikes.length -1].user_who_liked} and {currentPostLikes.length} other people liked this</p>: null}
                {currentPostLikes.length === 1 ? <p>{currentPostLikes[0].user_who_liked} liked this</p>: null}
                <Comments post={post} loggedInUser={loggedInUser}/>
            </p>
        </div>
    )
}

export default Post