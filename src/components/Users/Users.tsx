import React from "react";
import s from "./user.module.css"
import {UsersType} from "../../types/types";
import {Paginator} from "../../assets/common/Paginator";
import {EveryUser} from "./EveryUser";

export let Users: React.FC<UsersType> = props => {
    return (
        <>
            <Paginator
                onPageHandler={props.onPageHandler}
                pageSize={props.pageSize}
                totalUsersCount={props.totalUsersCount}
                currentPage={props.currentPage}
            />
            <div className={s.users}>
                {
                    props.users.map(u => <EveryUser
                        key={u.id}
                        user={u}
                        follow={props.follow}
                        unFollow={props.unFollow}
                        followingInProgress={props.followingInProgress}/>)
                }
            </div>
        </>

    )
}









