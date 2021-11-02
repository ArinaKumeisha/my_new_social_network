import React from 'react';
import {ProfilesType} from "../../../../types/types";
import s from './ProfileData.module.css'


type PropsType = {
    profile: ProfilesType
    isOwner: boolean
    activateEditeMode:()=>void
}
const ProfileData = (props: PropsType) => {
    const {profile, activateEditeMode, isOwner} = props

    return (
        <div className={s.info}>
            {isOwner && <button onClick={activateEditeMode}>dss</button>}
            <h3>Обо мне</h3>

            <h4>FullName:
                {profile.fullName ? <b>{profile.fullName}</b> :
                    <i> no information </i>}</h4>

            <h4>Looking for a job:
                {profile.lookingForAJob ? <b>Yes</b> : <b>No</b>}</h4>

            <h4>My professional skills:
                {profile.lookingForAJobDescription ?
                    <b> {profile.lookingForAJobDescription} </b> :
                    <div><i> no information</i></div>}</h4>
        </div>
    )
}

export default ProfileData;