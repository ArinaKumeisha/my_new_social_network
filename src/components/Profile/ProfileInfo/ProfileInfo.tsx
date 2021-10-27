import React, {ChangeEvent} from 'react';
import s from "./ProfileInfo.module.css"
import Preloader from "../../preloader/preloader";
import {ProfileType} from '../../../types/types';
import {ProfileStatusWithHooks} from './ProfileStatusWithHooks';
import avatar from "../../../assets/image/avatar.png";
import phone from "../../../assets/image/city.jpg";
import {Social} from './Social';

const ProfileInfo: React.FC<ProfileType> = props => {
    const {profile, status, updateStatus, isOwner, savePhoto} = props
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
                         className={s.info} alt={'photos'}
                    />
                    {isOwner &&
                    <input type={'file'}
                           onChange={onchangeImage}
                           name={'ddd'}
                    />}
                    <ProfileStatusWithHooks
                        status={status}
                        updateStatus={updateStatus}
                    />
                </div>

                <div className={s.descriptionBlock}>

                    <div className={s.description}>
                        <h3>Обо мне</h3>
                        <Social profile={profile}/>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ProfileInfo;

