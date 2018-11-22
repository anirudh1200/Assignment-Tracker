import React, { Component } from 'react';
import Summary from '../submissions/Summary';
import { connect } from 'react-redux';
import socketIOClient from "socket.io-client";
import { getItems, deleteSubmission } from '../../store/actions/submissionActions';
import sendUpdatePing from '../../socket/socket';

class Dashboard extends Component{

    constructor() {
        super();
        this.state = {
            endpoint: "http://localhost:5000"
        };
    }

    handleDelete = e => {
        if(window.confirm("Are you sure you want to delete this?")){
            console.log("To be deleted");
            this.props.deleteSubmission(e.target.id);
        }
        sendUpdatePing();
    }

    handleEdit = e => {
        console.log("To be edited");
        console.log(e.target.id);
        this.redirectEdit(e.target.id);
    }

    redirectEdit = id => {
        let path = `/edit/` + id;
        this.props.history.push(path);
    }

    componentDidMount(){
        setTimeout(this.props.getItems,500);
    }

    render(){
        const socket = socketIOClient(this.state.endpoint);
        socket.on('processUpdate', () => {
            setTimeout(this.props.getItems ,1000);
        });
        const { submissions } = this.props;
        console.log(submissions);
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
    return{
        submissions: state.submissions,
        error: state.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        getItems: () => dispatch(getItems()),
        deleteSubmission: (id) => dispatch(deleteSubmission(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
