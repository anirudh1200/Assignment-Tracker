import React, { Component } from 'react';
import Summary from '../submissions/Summary';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Dashboard extends Component{
    render(){
        const { submissions } = this.props;
        console.log(submissions);
        return(
            <div className="dashboard container">
                <div className="project-list section">
                    {submissions.map(submission => {
                        return(
                            <Link to={'/submission/' + submission.id} key={submission.id}>
                                <Summary submission={submission} key={submission.id}/>
                            </Link>
                        )
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        submissions: state.state.submissions
    }
}

export default connect(mapStateToProps)(Dashboard);
