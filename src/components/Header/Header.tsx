import React from 'react';
import { NavLink } from 'react-router-dom';
import s from "./Header.module.css"

type HeaderPropsType = {
    isAuth: boolean
    login: string | null
    logOut: () => void

}
 const Header  = (props: HeaderPropsType) => {
    return (
        <header className={s.header}>
        <img src ='https://i1.7fon.org/thumb/z134398.jpg' alt ='label'/>
            <div className={s.loginBlock}>
                { props.isAuth
                    ? <div>{props.login} - <button onClick={props.logOut}>Log out</button></div>
                    : <NavLink to={"./login"}>Login</NavLink> }
            </div>
    </header>
    )}
export default Header;
