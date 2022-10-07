import React from 'react';
import './Header.scss'
import menuIcon from '../../Assets/menu.svg'
import replyIcon from '../../Assets/reply.svg'
import profile from '../../Assets/myPhoto.jpg'
import dropdownIcon from '../../Assets/dropdown.svg'
import {NavLink, useLocation} from "react-router-dom";

const Header = () => {
    const location = useLocation();
    const isView = location.pathname === '/';

    return (
        <div className={"header"}>
            <div className={"controls"}>
                <img src={menuIcon} alt={"icon"} className={"iconButton"}/>
                <img src={replyIcon} alt={"icon"} className={"iconButton"}/>
                <NavLink className={isView ? `route-link bordered` : "route-link"} to={'/'}>Просмотр</NavLink>
                <NavLink className={!isView ? `route-link bordered` : "route-link"} to={'/controlling'}>Управление</NavLink>
            </div>
            <div className={"profile"}>
                <img src={profile} alt={"my profile"} className={"profileImage"}/>
                <span className={"profileName"}>Кирилл Мельников</span>
                <img src={dropdownIcon} alt={"dropdown"} className={"iconButton"}/>
            </div>
        </div>
    );
};

export default Header;