import React, { Component } from 'react';
import { connect } from 'react-redux';
import sendUpdatePing from '../../socket/socket';
import { deleteSubmission } from '../../store/actions/submissionActions';

class Details extends Component{

    handleDelete = e => {
        if(window.confirm("Are you sure you want to delete this?")){
            console.log("To be deleted");
            this.props.deleteSubmission(e.target.id);
            sendUpdatePing(this.props.socket);
            this.redirectHome();
        }
    }

    handleEdit = e => {
        this.redirectEdit(e.target.id);
    }

    redirectHome = () => {
        let path = `/`;
        this.props.history.push(path);
    }

    redirectEdit = id => {
        let path = `/edit/` + id;
        this.props.history.push(path);
    }

    formatDate = (inputDate) => {
        const y = inputDate.slice(0,4);
        const m = inputDate.slice(5,7);
        const d = inputDate.slice(8,10);
        return d+'/'+m+'/'+y;
    }

    render(){
        const { submission } = this.props;
        if(submission === undefined){
            return(
                <div className="center"> Page Not Found </div>
            )
        }
        else{
            const dateCreated = this.formatDate(submission.dateCreated);
            const submissionDate = this.formatDate(submission.date);
            return(
                <div className="container section project-details">
                        <div className="card z-depth-1">
                            <div className="card-content">
                                <span className="card-title">{submission.title}</span>
                                <h6>{ submission.content }</h6>
                                <div>Subject: { submission.subject }</div>
                                <div>Submission Date: { submissionDate }</div>
                                <div>Time: { submission.time }</div>
                            </div>
                            <div className="card-action grey lighten-4 grey-text">
                                <div>Posted by { submission.author }</div>
                                <div>on { dateCreated }</div>
                            </div>
                        </div>
                        <div className="center">
                            <button className="btn waves-effect waves-light amber z-depth-1 center" onClick={this.handleEdit} style={{display: "block", width: "100%"}} id={ submission._id }><i className="material-icons">edit</i> Edit</button>
                            <button className="btn waves-effect waves-light red darken-2 z-depth-1 center"onClick={this.handleDelete}  style={{display: "block", width: "100%", marginTop: "1%"}} id={ submission._id }><i className="material-icons">delete</i> Delete</button>
                        </div>
                    </div>
            )
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const submission = state.submissions.find(submission => submission._id === id);
    return{
        submission,
        socket: state.socket
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        deletePost: (id) => dispatch(deleteSubmission(id)),
        deleteSubmission: (id) => dispatch(deleteSubmission(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);
