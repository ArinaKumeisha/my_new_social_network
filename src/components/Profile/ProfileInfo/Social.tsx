import React from 'react';
import {ProfilesType} from '../../../types/types';
import s from "./ProfileInfo.module.css";


type PropsType = {
    profile: ProfilesType
}
export const Social: React.FC<PropsType> = props => {
    const {profile} = props;
    return (
        <div className={s.contacts}>
            <h4>FaceBook:
                {profile.contacts.facebook ?
                    <a href="https://www.youtube.com/">
                        {profile.contacts.facebook} : </a> :
                    <i> no information </i>}</h4>

            <h4>Website:
                {profile.contacts.website ?
                    <a href="https://www.youtube.com/">
                        {profile.contacts.website} </a> :
                    <i> no information </i>}</h4>

            <h4>Vkontakte:
                {profile.contacts.vk ?
                    <a href="https://www.youtube.com/">
                        {profile.contacts.vk} </a> :
                    <i> no information </i>}</h4>

            <h4>Twitter:
                {profile.contacts.twitter ?
                    <a href="https://www.youtube.com/">
                        {profile.contacts.twitter} </a> :
                    <i> no information </i>}</h4>

            <h4>Instagram:
                {profile.contacts.instagram ?
                    <a href="https://www.youtube.com/">
                        {profile.contacts.instagram} </a> :
                    <i> no information </i>}</h4>

            <h4>Youtube:
                {profile.contacts.youtube ? <a href="https://www.youtube.com/">
                    {profile.contacts.youtube}
                </a> : <i> no information </i>}</h4>

            <h4>Github:
                {profile.contacts.github ?
                    <a href="https://www.youtube.com/">
                        {profile.contacts.github}
                    </a> : <i> no information </i>}</h4>

            <h4>MainLink:
                {profile.contacts.mainLink ?
                    <a href="https://www.youtube.com/">
                        {profile.contacts.mainLink} </a> :
                    <i> no information </i>}</h4>

            <h4>FullName:
                {profile.fullName ?
                    <a href="https://www.youtube.com/">
                        {profile.fullName} </a> :
                    <i> no information </i>}</h4>
            {/*<h4>LookingForAJob:
                {profile.lookingForAJob ?
                    <a href="https://google.com/">
                        {profile.lookingForAJob} </a> :
                    <i> no information </i>}</h4>*/}

            <h4>Description for job:
                {profile.lookingForAJobDescription ?
                    <p>{profile.lookingForAJobDescription}</p> :
                    <i>no information</i>}</h4>
        </div>
    );
};

