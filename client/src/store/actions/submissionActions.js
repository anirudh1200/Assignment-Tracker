import axios from 'axios';

export const addSubmission = (submission) => {
    return (dispatch) => {
        dispatch({type: "ITEMS_LOADING"});
        axios
            .post('http://localhost:5000/api/submissions/', submission)
            .then(res => dispatch({
                type: 'ADD_SUBMISSION', submission
            }))
    }
}

export const deleteSubmission = (id) => {
    return (dispatch) => {
        dispatch({type: "ITEMS_LOADING"});
        axios
            .delete(`http://localhost:5000/api/submissions/${id}`)
            .then(res => dispatch({
                type: "DELETE_SUBMISSION",
                id
            }))
    }
}

export const getItems = () => {
    return (dispatch) => {
        console.log("GETITEMS");
        dispatch({type: "ITEMS_LOADING"});
        axios
            .get('http://localhost:5000/api/submissions/')
            .then(res => dispatch({
                type: "GET_SUBMISSION",
                submission: res.data
            }))
    }
}

export const editSubmission = (submission) => {
    return (dispatch) => {
        dispatch({type: "ITEMS_LOADING"});
        axios
            .put(`http://localhost:5000/api/submissions/${submission._id}`, submission)
            .then(res => dispatch({
                type: 'EDIT_SUBMISSION',
                id: submission._id,
                submission
            }))
    }
}
