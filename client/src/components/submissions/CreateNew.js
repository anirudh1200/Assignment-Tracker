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
        content: ''
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
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-4 center">Add New Submission</h5>
                    <div className="input-field">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="subject">Subject</label>
                        <input type="text" id="subject" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="date">Date</label>
                        <input type="date" id="date" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="time" placeholder="Not Specified">Time</label>
                        <input type="text" id="time" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="content" maxLength="250">Content</label>
                        <textarea id="content" className="materialize-textarea" onChange={this.handleChange}></textarea>
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
