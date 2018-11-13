import React from 'react';
import { connect } from 'react-redux';

const Details = ({submission}) => {
    return(
        <div className="container section project-details">
                <div className="card z-depth-1">
                    <div className="card-content">
                        <span className="card-title">{submission.title}</span>
                        <p>Content</p>
                        <div>Subject: {submission.subject}</div>
                        <div>Submission Date: Date</div>
                        <div>Time: Time</div>
                    </div>
                    <div className="card-action grey lighten-4 grey-text">
                        <div>Posted by The Net Ninja</div>
                    </div>
                </div>
            </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const submission = state.state.submissions[id];
    return{
        submission
    }
}

export default connect(mapStateToProps)(Details);
