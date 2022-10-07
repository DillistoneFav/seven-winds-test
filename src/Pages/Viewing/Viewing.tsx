import React from 'react';
import './Viewing.scss'
import dropdownIcon from "../../Assets/dropdown.svg";
import projectItemIcon from "../../Assets/projectIcon.svg"
import ItemsTree from "./components/ItemsTree";

const Viewing = () => {
    return (
        <div className={"projectsContainer"}>
            <div className={"projectsHeader"}>
                <div className={"projectInfo"}>
                    <div className={"projectName"}>
                        <span>Название проекта</span>
                        <span>Аббревиатура</span>
                    </div>
                    <div>
                        <img src={dropdownIcon} alt={"dropdown"} className={"iconButton"}/>
                    </div>
                </div>
                <div className={"projectItemTitle"}>
                    Строительно-монтажные работы
                </div>
            </div>
            <div className={"projectsContent"}>
                <div className={"projectsList"}>
                    <div className={"projectItem"}>
                        <img src={projectItemIcon} alt={"icon"}/>
                        <span>Project Abbr</span>
                    </div>
                    <div className={"projectItem"}>
                        <img src={projectItemIcon} alt={"icon"}/>
                        <span>Project Abbr</span>
                    </div>
                    <div className={"projectItem"}>
                        <img src={projectItemIcon} alt={"icon"}/>
                        <span>Project Abbr</span>
                    </div>
                    <div className={"projectItem"}>
                        <img src={projectItemIcon} alt={"icon"}/>
                        <span>Project Abbr</span>
                    </div>
                    <div className={"projectItem"}>
                        <img src={projectItemIcon} alt={"icon"}/>
                        <span>Project Abbr</span>
                    </div>
                </div>
                <ItemsTree/>
            </div>
        </div>
    );
};

export default Viewing;