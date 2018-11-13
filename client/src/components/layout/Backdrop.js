import React from 'react';
import './Backdrop.css';

const Backdrop = props => {
    return(
        <div className="mybackdrop" onClick={props.click}></div>
    )
}

export default Backdrop;
