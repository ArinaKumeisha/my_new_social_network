import React, {useState} from 'react';
import s from "./ProfileInfo.module.css"
import Preloader from "../../preloader/preloader";
import {ProfileType} from '../../../types/types';
import {ProfileStatusWithHooks} from './ProfileStatusWithHooks';
import avatar from "../../../assets/image/avatar.png";
import phone from "../../../assets/image/city.jpg";
import {Contacts} from './Contacts';
import ProfileData from "./ProfileData/ProfileData";
import ProfileDataForm from "./ProfileData/ProfileDataForm";


const ProfileInfo: React.FC<ProfileType> = props => {
    const {profile, status, updateStatus, isOwner, savePhoto} = props
    const [editMode, setEditeMode] = useState<boolean>(false)
    if (!profile) {
        return <Preloader/>
    }
    const onchangeImage = (e: any) => {
        if (e.target.files.length)
            savePhoto(e.target.files[0])
    }
    let contacts: any = profile.contacts
    return (
        <>
            <img src={phone} className={s.item} alt={'phone'}/>
            <div className={s.block}>
                <div>
                    <img src={
                        profile.photos.large || avatar}
                         className={s.info} alt={'photos'}
                    />
                    {isOwner &&
                    <label className={s.uploadFile}>
                        <input type={'file'}
                               onChange={onchangeImage}
                               className={s.style}
                        />
                        upload photo
                    </label>}
                    <ProfileStatusWithHooks
                        status={status}
                        updateStatus={updateStatus}
                    />
                </div>

                <div className={s.descriptionBlock}>

                    <div className={s.description}>
                        {editMode? <ProfileDataForm profile={profile} isOwner={isOwner}/> :
                            <ProfileData profile={profile} isOwner={isOwner}
                                         activateEditeMode={()=> setEditeMode(true)}/>}

                        <h3>Contacts:</h3>
                        {Object.keys(contacts).map(c => {
                            return <Contacts key={c} contactTitle={c} contactValue={contacts[c]}/>
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}


export default ProfileInfo;

