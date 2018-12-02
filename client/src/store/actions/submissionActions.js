import axios from 'axios';

export const addSubmission = (submission) => {
    return (dispatch) => {
        dispatch({type: "ITEMS_LOADING"});
        axios
            .post('/api/submissions/', submission)
            .then(res => dispatch({
                type: 'ADD_SUBMISSION', submission
            }))
    }
}

export const deleteSubmission = (id) => {
    return (dispatch) => {
        dispatch({type: "ITEMS_LOADING"});
        axios
            .delete(`/api/submissions/${id}`)
            .then(res => dispatch({
                type: "DELETE_SUBMISSION",
                id
            }))
    }
}

export const getItems = () => {
    return (dispatch) => {
        dispatch({type: "ITEMS_LOADING"});
        axios
            .get('/api/submissions/')
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
            .put(`/api/submissions/${submission._id}`, submission)
            .then(res => dispatch({
                type: 'EDIT_SUBMISSION',
                id: submission._id,
                submission
            }))
    }
}
