import React from 'react';
import {ContactsType, ProfilesType} from "../../../../types/types";
import s from './ProfileData.module.css'
import {Contacts} from "../Contacts";
import style from '../../../../assets/common/common.module.css'


type PropsType = {
    profile: ProfilesType
    isOwner: boolean
    activateEditeMode: () => void
}
const ProfileData = (props: PropsType) => {
    const {profile, activateEditeMode, isOwner} = props
    let contacts: any = profile.contacts
    return (
        <div className={s.info}>
            {isOwner &&
            <button onClick={activateEditeMode} className={style.commonBtn}>
                Change data
            </button>}
            <h3>Обо мне</h3>

            <h4>FullName:
                {profile.fullName ?
                    <b>{profile.fullName}</b> :
                    <i> no information </i>}</h4>

            <h4>Looking for a job:
                {profile.lookingForAJob ?
                    <b>Yes</b> : <b>No</b>}</h4>

            <h4>My professional skills:
                {profile.lookingForAJobDescription ?
                    <b> {profile.lookingForAJobDescription} </b> :
                    <div><i> no information</i></div>}</h4>

            <h4>About Me: {profile.aboutMe ?
                <b>{profile.aboutMe}</b> :
                <div><i> no information</i></div>} </h4>

            <h3>Contacts:</h3>
            {Object.keys(contacts).map(c => {
                return <Contacts
                    key={c}
                    contactTitle={c}
                    contactValue={contacts[c]}/>
            })}
        </div>
    )
}

export default ProfileData;