import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = props => {
    return(
        <nav>
            <div className="nav-wrapper grey darken-4">
                <i className="material-icons left" style={{marginLeft: "3%"}} onClick={props.click}>menu</i>
                <Link to="/" className="brand-logo center">Logo</Link>
            </div>
      </nav>
    )
}

export default Navbar;
