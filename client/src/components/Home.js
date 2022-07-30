import React from "react";
import Posts from "./Posts";


function Home({userList, loggedInUser}) {

    return(
        <div>
            <div>
                {loggedInUser.username}
                {userList ? userList.map((user) => {
                    return  <Posts user={user} />
                }):null}
            </div>
        </div>
    )
}

export default Home