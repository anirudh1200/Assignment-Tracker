import React from 'react';
import { Link } from 'react-router-dom';

const Summary = props => {
    const { submission } = props;
    return(
        <div className="card z-depth-1 submission-summary">
            <div className="row">
                <Link to={ '/submission/' + submission.id } submission={ submission } key={ submission.id }>
                    <div className="col s9">
                        <div className="card-content grey-text text-darken-4">
                            <span className="card-title"> { submission.title } </span>
                            <p>Subject: { submission.subject }</p>
                            <p>Date: { submission.date }</p>
                            <p>Time: { submission.time }</p>
                        </div>
                    </div>
                </Link>
                <div className="col s3">
                    <i className="material-icons center" onClick={ props.onEdit } style={{color: "black", display: "block", marginTop: "50%"}} id={ submission.id }>edit</i>
                    <i className="material-icons center" onClick={ props.onDelete } style={{color: "black", display: "block", marginTop: "20%"}} id={ submission.id }>delete</i>
                </div>
            </div>
        </div>
    )
}

export default Summary;
