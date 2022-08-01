import Post from "./Post"

function Posts({user, loggedInUser}) {
    return (
        <div>
            {user.posts ? user.posts.map((post) => {
                return <Post post={post} user={user} loggedInUser={loggedInUser} />
            }):null}
        </div>
    )
}

export default Posts