import React, { Component } from 'react';
import { connect } from 'react-redux';

class Details extends Component{

    handleDelete = e => {
        if(window.confirm("Are you sure you want to delete this?")){
            console.log("To be deleted");
            this.props.deletePost(e.target.id);
            this.redirectHome();
        }
    }

    handleEdit = e => {
        console.log("To be edited");
        console.log(e.target.id);
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

    render(){
        const { submission } = this.props;
        if(submission === undefined){
            return(
                <div className="center"> Page Not Found </div>
            )
        }
        else{
            return(
                <div className="container section project-details">
                        <div className="card z-depth-1">
                            <div className="card-content">
                                <span className="card-title">{submission.title}</span>
                                <h6>{ submission.content }</h6>
                                <div>Subject: { submission.subject }</div>
                                <div>Submission Date: { submission.date }</div>
                                <div>Time: { submission.time }</div>
                            </div>
                            <div className="card-action grey lighten-4 grey-text">
                                <div>Posted by The Net Ninja</div>
                                <div>on 26/05/2018</div>
                            </div>
                        </div>
                        <div className="center">
                            <button className="btn waves-effect waves-light amber z-depth-1 center" onClick={this.handleEdit} style={{display: "block", width: "100%"}} id={ submission.id }><i className="material-icons">edit</i> Edit</button>
                            <button className="btn waves-effect waves-light red darken-2 z-depth-1 center"onClick={this.handleDelete}  style={{display: "block", width: "100%", marginTop: "1%"}} id={ submission.id }><i className="material-icons">delete</i> Delete</button>
                        </div>
                    </div>
            )
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const submission = state.submissions.find(submission => submission.id === id);
    return{
        submission
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        deletePost: (id) => { dispatch({type: "DELETE_SUBMISSION", id}) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);
