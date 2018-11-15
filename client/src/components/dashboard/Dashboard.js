import React, { Component } from 'react';
import Summary from '../submissions/Summary';
import { connect } from 'react-redux';
import axios from 'axios';

class Dashboard extends Component{

    handleDelete = e => {
        if(window.confirm("Are you sure you want to delete this?")){
            console.log("To be deleted");
            this.props.deletePost(e.target._id);
        }
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
        this.props.getItems();
    }

    render(){
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
        submissions: state.submissions
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        getItems: () => {
            dispatch({type: "ITEMS_LOADING"});
            axios
                .get('http://localhost:5000/api/submissions/')
                .then(res => dispatch({
                    type: "GET_SUBMISSION",
                    submission: res.data
                }))
        },
        deletePost: (id) => { dispatch({type: "DELETE_SUBMISSION", id}) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
