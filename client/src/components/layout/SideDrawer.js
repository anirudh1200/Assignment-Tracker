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
            <h4 className="center" style={{margin: "15%", color: "rgb(100,100,100)", fontFamily: "Montserrat"}}>
                YeDivision
            </h4>
            <ul>
                <li onClick={props.closeit}><NavLink to="/">View Upcoming</NavLink></li>
                <li onClick={props.closeit}><NavLink to="/previous">View Previous</NavLink></li>
                <li onClick={props.closeit}><NavLink to="/create">Add New Submission</NavLink></li>
            </ul>
        </nav>
    )
}

export default SideDrawer;
