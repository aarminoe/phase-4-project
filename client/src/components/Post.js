import Comments from "./Comments";
import React, {useState} from "react";

function Post({post, user}) {

    console.log(post)
    console.log(user)
    return (
        <div className="post-card">
            <p>{user.username} posted:</p>
            Post {post.post}
            <p className="who-liked">
                {post.post_likes.length !== 0 && post.post_likes.length > 1 ? <p>{post.post_likes[0].user_who_liked} and {post.post_likes.length} other people liked this</p>: null}
                {post.post_likes.length === 1 ? <p>{post.post_likes[0].user_who_liked} liked this</p>: null}
                <Comments post={post} user={user}/>
            </p>
        </div>
    )
}

export default Post