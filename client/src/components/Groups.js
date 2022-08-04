import Group from "./Group"

function Groups({groupList, loggedInUser, onToOtherProfile}) {
    console.log(groupList)
    return( 
        <div>
            {groupList.map((group) => {
                return <Group group={group} loggedInUser={loggedInUser} onToOtherProfile={onToOtherProfile}/>
            })}
        </div>
    )
}

export default Groups