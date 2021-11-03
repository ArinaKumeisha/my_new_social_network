import React, {useState} from 'react';
import s from "./ProfileInfo.module.css"
import Preloader from "../../preloader/preloader";
import {ProfileType} from '../../../types/types';
import {ProfileStatusWithHooks} from './ProfileStatusWithHooks';
import avatar from "../../../assets/image/avatar.png";
import phone from "../../../assets/image/city.jpg";
import ProfileData from "./ProfileData/ProfileData";
import ProfileDataForm from "./ProfileData/ProfileDataForm";


const  ProfileInfo: React.FC<ProfileType> = props => {
    const {profile, status, updateStatus, isOwner, savePhoto,userId, saveProfile, error} = props
    const [editMode, setEditeMode] = useState<boolean>(false)
    if (!profile) {
        return <Preloader/>
    }
    const onchangeImage = (e: any) => {
        if (e.target.files.length)
            savePhoto(e.target.files[0])
    }

    return (
        <>
            <img src={phone} className={s.item} alt={'phone'}/>
            <div className={s.block}>
                <div>
                    <img src={
                        profile.photos.large || avatar}
                         className={s.photo} alt={'photos'}
                    />

                    {isOwner &&

                        <input type={'file'}
                               onChange={onchangeImage}
                               className={s.style}
                        />}

                    <ProfileStatusWithHooks
                        status={status}
                        updateStatus={updateStatus}
                    />
                </div>

                    <div className={s.description}>
                        {editMode?
                            <ProfileDataForm profile={profile}
                                             isOwner={isOwner}
                                             userId={userId}
                                             saveProfile={saveProfile}
                                             error={error}
                            activateEditeMode={()=>setEditeMode(false)}/> :

                            <ProfileData profile={profile}
                                         isOwner={isOwner}
                                         activateEditeMode={()=>
                                             setEditeMode(true)}/>}

                </div>
            </div>
        </>
    )
}


export default ProfileInfo;

