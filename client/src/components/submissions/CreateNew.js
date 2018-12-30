import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addSubmission } from '../../store/actions/submissionActions';
import sendUpdatePing from '../../socket/socket';

class CreateNew extends Component{

    state = {
        title: '',
        subject: '',
        date: '',
        time: 'Not Specified',
        content: '',
        author: ''
    }

    handleChange = e => {
        this.setState({
            [e.target.id] : e.target.value
        });
    }

    redirectHome = () => {
        let path = `/`;
        this.props.history.push(path);
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.addSubmission(this.state);
        sendUpdatePing(this.props.socket);
        this.redirectHome();
    }

    render(){
        return(
            <div className="container">
                <form onSubmit={this.handleSubmit} style={{backgroundColor: "rgba(0,0,0,0)"}}>
                    <h5 className="grey-text text-darken-4 center">Add New Submission</h5>
                    <div className="input-field">
                        <input type="text" id="title" onChange={this.handleChange} />
                        <span className="helper-text">Title</span>
                    </div>
                    <div className="input-field">
                        <input type="text" id="subject" onChange={this.handleChange} />
                        <span className="helper-text">Subject</span>
                    </div>
                    <div className="input-field">
                        <input type="date" id="date" onChange={this.handleChange} />
                        <span className="helper-text">Date</span>
                    </div>
                    <div className="input-field">
                        <input type="text" id="time" defaultValue="-" onChange={this.handleChange} />
                        <span className="helper-text">Title</span>
                    </div>
                    <div className="input-field">
                        <textarea id="content" className="materialize-textarea" onChange={this.handleChange}></textarea>
                        <span className="helper-text">Content</span>
                    </div>
                    <div className="input-field">
                        <input type="text" id="author" defaultValue="Anonymous" onChange={this.handleChange} />
                        <span className="helper-text">Author</span>
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-1">Add New Submission</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
            addSubmission: (submission) => dispatch(addSubmission(submission))
    }
}

const mapStateToProps = (state) => {
    return{
        socket: state.socket
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNew);
