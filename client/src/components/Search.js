import React, { useState } from "react"
import SearchedUsers from "./SearchedUsers"

function Search({userList, loggedInUser, onToOtherProfile, onHandleAddFriend, newFriend, addedFriend}) {

    const [searchedUser, setSearchedUser] = useState('')


    function handleSearch(e) {
        setSearchedUser(e.target.value.toLowerCase())
    }

 
    return (
        <div className="search">
            <div className="search-header">
                Search:   
            </div>
            <input className="search-bar" type='text' onChange={handleSearch}></input>
            {searchedUser.length >= 1 ? userList.map((user) => {
                return <SearchedUsers user={user} searchedUser={searchedUser} loggedInUser={loggedInUser} onToOtherProfile={onToOtherProfile} onHandleAddFriend={onHandleAddFriend} newFriend={newFriend} addedFriend={addedFriend}/>
            }) : null}
        </div>
    )
}

export default Search
