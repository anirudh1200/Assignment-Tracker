import React, { Component } from 'react';
import Summary from '../submissions/Summary';
import { connect } from 'react-redux';

class Dashboard extends Component{

    handleDelete = e => {
        if(window.confirm("Are you sure you want to delete this?")){
            console.log("To be deleted");
            this.props.deletePost(e.target.id);
        }
    }

    handleEdit = e => {
        console.log("To be edited");
        console.log(e.target.id);
    }

    render(){
        const { submissions } = this.props;
        console.log(submissions);
        return(
            <div className="dashboard container">
                <div className="project-list section">
                    {submissions.map(submission => {
                        return(
                            <Summary onDelete={this.handleDelete} onEdit={this.handleEdit} submission={submission} key={submission.id}/>
                        )
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        submissions: state.submissions
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        deletePost: (id) => { dispatch({type: "DELETE_SUBMISSION", id}) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
