import React from 'react';
import s from "./ProfileInfo.module.css";


type PropsType = {
    contactTitle: string
    contactValue: string
}
export const Contacts: React.FC<PropsType> = props => {
    return (
        <div className={s.information}>
            <div><b> {props.contactTitle}:
                {props.contactValue ? props.contactValue :
                    <i>no information</i>}</b></div>

        </div>
    )
}