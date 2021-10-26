import React from 'react';
import s from "./ProfileInfo.module.css"
import Preloader from "../../preloader/preloader";
import {ProfileType} from '../../../types/types';
import {ProfileStatusWithHooks} from './ProfileStatusWithHooks';
import avatar from "../../../assets/image/avatar.png";
import girl from "../../../assets/image/arina.jpg";
import phone from "../../../assets/image/city.jpg";
import {Social} from './Social';
import {useSelector} from 'react-redux';
import {AppStateType} from '../../../redux/redux_store'

const ProfileInfo: React.FC <ProfileType>=props => {
    const {profile,status,updateStatus }=props
    const isPhoto = useSelector<AppStateType, boolean>(state => state.profilePage.isPhoto)
    if (!profile) {
        return <Preloader/>
    }

    return (
        <>
            <img src={phone} className={s.item}  alt={'phone'}/>
            <div className={s.block}>
                <div>
                    <img src={
                        isPhoto ?
                            girl :
                            profile.photos.large ?
                                profile.photos.large :
                                avatar}
                         className={s.info} alt={'photos'}
                    />
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

