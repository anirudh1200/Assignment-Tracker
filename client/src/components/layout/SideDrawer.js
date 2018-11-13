import React from 'react';
import { NavLink } from 'react-router-dom';
import './SideDrawer.css';

const SideDrawer = props => {
    let drawerClasses = 'side-drawer';
    if(props.show){
        drawerClasses = 'side-drawer open';
    }
    return(
        <nav className={drawerClasses}>
            <ul>
                <li onClick={props.closeit}><NavLink to="/">Test 1</NavLink></li>
                <li onClick={props.closeit}><NavLink to="/">Test 1</NavLink></li>
                <li onClick={props.closeit}><NavLink to="/">Test 1</NavLink></li>
                <li onClick={props.closeit}><NavLink to="/">Test 1</NavLink></li>
            </ul>
        </nav>
    )
}

export default SideDrawer;
