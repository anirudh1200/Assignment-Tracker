import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editSubmission } from '../../store/actions/submissionActions';
import sendUpdatePing from '../../socket/socket';

class Edit extends Component{

    handleChange = e => {
        switch(e.target.id){
            case 'title':
                this.props.submission.title = e.target.value;
                console.log(this.props.submission);
                break;
            case 'subject':
                this.props.submission.subject = e.target.value;
                console.log(this.props.submission);
                break;
            case 'date':
                this.props.submission.date = e.target.value;
                console.log(this.props.submission);
                break;
            case 'time':
                this.props.submission.time = e.target.value;
                console.log(this.props.submission);
                break;
            case 'content':
                this.props.submission.content = e.target.value;
                console.log(this.props.submission);
                break;
            default: break;
        }
    }

    handleEditSubmit = e => {
        e.preventDefault();
        console.log("Edit being processed");
        this.props.editSubmission(this.props.submission);
        sendUpdatePing(this.props.socket);
        this.redirectHome();
    }

    redirectHome = () => {
        let path = '/';
        this.props.history.push(path);
    }

    render(){
        const { submission } = this.props;
        console.log(this.props);
        if(submission === undefined){
            return(
                <div className="center"> Page Not Found </div>
            )
        }
        else{
            return(
                <div className="container">
                    <form onSubmit={this.handleEditSubmit}  style={{backgroundColor: "rgba(0,0,0,0)"}}>
                        <h5 className="grey-text text-darken-4 center">Edit</h5>
                        <div className="input-field">
                            <input type="text" id="title" placeholder="Test" defaultValue={submission.title} onChange={this.handleChange} />
                            <span className="helper-text">Title</span>
                        </div>
                        <div className="input-field">
                            <input type="text" id="subject" defaultValue={submission.subject} onChange={this.handleChange} />
                            <span className="helper-text">Subject</span>
                        </div>
                        <div className="input-field">
                            <input type="date" id="date" defaultValue={submission.date} onChange={this.handleChange} />
                            <span className="helper-text">Date</span>
                        </div>
                        <div className="input-field">
                            <input type="text" id="time" defaultValue={submission.time} onChange={this.handleChange} />
                            <span className="helper-text">Time</span>
                        </div>
                        <div className="input-field">
                            <textarea id="content" defaultValue={submission.content} className="materialize-textarea" onChange={this.handleChange}></textarea>
                            <span className="helper-text">Content</span>
                        </div>
                        <div className="input-field">
                            <button className="btn pink lighten-1 z-depth-1">Edit Submission</button>
                        </div>
                    </form>
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
        editSubmission: (submission) => dispatch(editSubmission(submission))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
