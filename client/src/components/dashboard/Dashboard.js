import React, { Component } from 'react';
import Summary from '../submissions/Summary';
import { connect } from 'react-redux';
import { getItems, deleteSubmission } from '../../store/actions/submissionActions';
import sendUpdatePing from '../../socket/socket';

class Dashboard extends Component{

    handleDelete = e => {
        if(window.confirm("Are you sure you want to delete this?")){
            console.log("To be deleted");
            this.props.deleteSubmission(e.target.id);
        }
        sendUpdatePing(this.props.socket);
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
        if(!navigator.onLine) {
            console.log(navigator);
            this.props = JSON.parse(localStorage.getItem('data'));
        }
        setTimeout(this.props.getItems, 500);
        this.props.socket.on('processUpdate', () => {
            setTimeout(this.props.getItems, 1000);
        });
    }

    componentWillUpdate(nextProps, nextState){
        if(nextProps.submissions[0]){
            localStorage.setItem('data', JSON.stringify(nextProps.submissions));
        }
    }

    render(){
        const { submissions } = this.props;
        return(
            <div className="dashboard container">
                <div className="project-list section">
                    {submissions.map(submission => {
                        return(
                            <Summary onDelete={this.handleDelete} onEdit={this.handleEdit} submission={submission} key={submission._id} date={new Date(Date.now())} />
                        )
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state.submissions);
    const today = new Date(Date.now());
    const upcomingSubmissions = state.submissions.filter(submission => {
        const date = new Date(submission.date)
        return date >= today
    });
    return{
        submissions: upcomingSubmissions,
        socket: state.socket
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        getItems: () => dispatch(getItems()),
        deleteSubmission: (id) => dispatch(deleteSubmission(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
