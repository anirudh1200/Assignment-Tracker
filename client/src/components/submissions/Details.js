import React from 'react';
import { connect } from 'react-redux';

const Details = ({submission}) => {
    return(
        <div className="container section project-details">
                <div className="card z-depth-1">
                    <div className="card-content">
                        <span className="card-title">{submission.title}</span>
                        <h6>{ submission.content }</h6>
                        <div>Subject: { submission.subject }</div>
                        <div>Submission Date: { submission.date }</div>
                        <div>Time: { submission.time }</div>
                    </div>
                    <div className="card-action grey lighten-4 grey-text">
                        <div>Posted by The Net Ninja</div>
                        <div>on 26/05/2018</div>
                    </div>
                </div>
            </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const submission = state.submissions[id];
    return{
        submission
    }
}

export default connect(mapStateToProps)(Details);
