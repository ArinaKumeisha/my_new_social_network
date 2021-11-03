import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./myPosts/MyPostsContainer";
import {ProfileType} from '../../types/types';

const Profile = (props: ProfileType) => {
    return (
        <div>
            <ProfileInfo
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}
                isOwner={props.isOwner}
                savePhoto={props.savePhoto}
                userId={props.userId}
                saveProfile={props.saveProfile}
                error={props.error}
            />
            <MyPostsContainer/>
        </div>
    )
}

export default Profile
