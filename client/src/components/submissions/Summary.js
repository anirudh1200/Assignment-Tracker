import React from 'react';
import { Link } from 'react-router-dom';

const formatDate = (inputDate) => {
    const y = inputDate.slice(0,4);
    const m = inputDate.slice(5,7);
    const d = inputDate.slice(8,10);
    return d+'-'+m+'-'+y;
}

const Summary = props => {
    const { submission } = props;
    const submissionDate = formatDate(submission.date);
    let todayWarning = null;
    const date = new Date(submission.date);
    const todayDate = new Date(props.date);
    if(date.getDate() === todayDate.getDate() && date.getMonth() === todayDate.getMonth() && date.getFullYear() === todayDate.getFullYear()){
        todayWarning = {borderLeft: "6px solid red"};
    } else if(date.getDate() === todayDate.getDate()+1 && date.getMonth() === todayDate.getMonth() && date.getFullYear() === todayDate.getFullYear()){
        todayWarning = {borderLeft: "6px solid yellow"};
    }
    return(
        <div className="card z-depth-2 submission-summary">
            <div className="row" style={todayWarning}>
                <Link to={ '/submission/' + submission._id } submission={ submission } key={ submission._id }>
                    <div className="col s9">
                        <div className="card-content grey-text text-darken-4">
                            <span className="card-title"> { submission.title } </span>
                            <p>Subject: { submission.subject }</p>
                            <p>Date: { submissionDate }</p>
                            <p>Time: { submission.time }</p>
                        </div>
                    </div>
                </Link>
                <div className="col s3">
                    <i className="material-icons center" onClick={ props.onEdit } style={{color: "black", display: "block", marginTop: "50%"}} id={ submission._id }>edit</i>
                    <i className="material-icons center" onClick={ props.onDelete } style={{color: "black", display: "block", marginTop: "30%"}} id={ submission._id }>delete</i>
                </div>
            </div>
        </div>
    )
}

export default Summary;
