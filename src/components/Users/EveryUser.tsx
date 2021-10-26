import React from 'react';
import s from "./user.module.css";
import {NavLink} from "react-router-dom";
import avatar from "../../assets/image/avatar.png";
import {UserType} from "../../types/types";
import style from '../../assets/common/common.module.css'

type PropsType = {
    user: UserType
    followingInProgress: number[]
    follow: (userID: number) => void
    unFollow: (userID: number) => void
}
export const EveryUser = (props: PropsType) => {
    const {user, followingInProgress, follow, unFollow,} = props

    return (
        <div key={user.id}
             className={s.user}>
            <div className={s.common}>
                <NavLink className={s.photo} to={'./profile/' + user.id}>
                    <img src={user.photos.small ? user.photos.small : avatar}
                    alt={'photos'}/>
                </NavLink>

                <div className={s.followAndDescription}>
                    <div className={s.left}>
                        {user.followed ?
                            <button disabled={followingInProgress.some(id => id === user.id)}
                                    onClick={() => {
                                        unFollow(user.id);
                                    }} className={style.commonBtn}>UnFollow
                            </button>
                            :
                            <button disabled={followingInProgress.some(id => id === user.id)}
                                    onClick={() => {
                                        follow(user.id)
                                    }} className={style.commonBtn}>Follow
                            </button>
                        }

                        <div>{user.name}</div>
                        <div>{user.status}</div>
                    </div>
                    <div className={s.right}>
                    </div>
                </div>
            </div>
        </div>
    )

}
