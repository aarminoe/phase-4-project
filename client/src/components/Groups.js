import Group from "./Group"

function Groups({groupList, loggedInUser, onToOtherProfile, onToGroupPage, groupClickedOn}) {
    console.log(groupList)
    return( 
        <div>
            <p className="group-header">
                Groups:
            </p>
            {groupList.map((group) => {
                return <Group group={group} loggedInUser={loggedInUser} onToOtherProfile={onToOtherProfile} onToGroupPage={onToGroupPage} groupClickedOn={groupClickedOn}/>
            })}
        </div>
    )
}

export default Groups