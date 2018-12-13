import React, { Component } from 'react';
import Summary from '../submissions/Summary';
import { connect } from 'react-redux';
import { deleteSubmission } from '../../store/actions/submissionActions';
import sendUpdatePing from '../../socket/socket';

class prevDashboard extends Component{

    handleDelete = e => {
        if(window.confirm("Are you sure you want to delete this?")){
            this.props.deleteSubmission(e.target.id);
        }
        sendUpdatePing(this.props.socket);
    }

    handleEdit = e => {
        this.redirectEdit(e.target.id);
    }

    redirectEdit = id => {
        let path = `/edit/` + id;
        this.props.history.push(path);
    }

    render(){
        const { submissions } = this.props;
        return(
            <div className="dashboard container">
                <div className="project-list section">
                    {submissions.map(submission => {
                        return(
                            <Summary onDelete={this.handleDelete} onEdit={this.handleEdit} submission={submission} key={submission._id}/>
                        )
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const today = new Date(Date.now());
    const prevSubmissions = state.submissions.filter(submission => {
        const date = new Date(submission.date)
        return date <= today
    });
    return{
        submissions: prevSubmissions,
        socket: state.socket
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        deleteSubmission: (id) => dispatch(deleteSubmission(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(prevDashboard);
