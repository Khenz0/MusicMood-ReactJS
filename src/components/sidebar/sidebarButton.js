import React from 'react'
import "./sidebarButton.css";
import { Link, useLocation } from 'react-router-dom';
import { IconContext } from 'react-icons';

export default function SidebarButton(props) {
    const location = useLocation();

    const isActive = location.pathname === props.to;

    const btnClass = isActive ? 'btn-body active' : 'btn-body';

    const handleSignOut = () => {
      if (props.title === "Sign Out") {
        const confirmSignOut = window.confirm("Are you sure you want to sign out?");
        if (confirmSignOut) {
          props.onClick();
        }
      }
    };
  
    if (props.title === "Sign Out") {
      return (
        <div className={btnClass} onClick={handleSignOut}>
          <IconContext.Provider value={{ size: "24px", className: "btn-icon" }}>
            {props.icon}
            <p className='btn-title'>{props.title}</p>
          </IconContext.Provider>
        </div>
      );
    }

  return <Link to={props.to}>
    <div className={btnClass}>
        <IconContext.Provider value={{size: "24px", className: "btn-icon"}}>
            {props.icon}
            <p className='btn-title'>{props.title}</p>
        </IconContext.Provider>
    </div>
  </Link>
}
