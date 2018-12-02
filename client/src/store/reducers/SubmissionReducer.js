import socketIOClient from "socket.io-client";

let savedData = [];

if(localStorage.getItem('data')){
    savedData = JSON.parse(localStorage.getItem('data'));
}

const initState = {
    submissions: savedData,
    loading: false,
    //for local build
    // socket: socketIOClient("http://localhost:5000")
    //for production build
    socket: socketIOClient("https://damp-refuge-65272.herokuapp.com/")
}

const SubmissionReducer = (state = initState, action) => {
    switch(action.type){
        case 'GET_SUBMISSION':
            return{
                ...state,
                submissions: action.submission,
                loading: false
            }
        case 'ADD_SUBMISSION':
            return{
                ...state,
                submissions: [...state.submissions, action.submission],
                loading: false
            }
        case 'DELETE_SUBMISSION':
            let newSubmissions = state.submissions.filter(submission => {
                return action.id !== submission._id
            });
            return {
                ...state,
                submissions: newSubmissions,
                loading: false
            }
        case 'EDIT_SUBMISSION':
            let editedSubmissions = state.submissions.filter(submission => {
                return action.id !== submission._id
            });
            return {
                ...state,
                submissions: [editedSubmissions, action.submission],
                loading: false
            }
        case 'ITEMS_LOADING':
            return{
                ...state,
                loading: true
            }
        default:
            console.log("Error in reducer");
            return state;
    }
}

export default SubmissionReducer;
