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
            console.log("Fetching submissions");
            return{
                ...state,
                submissions: action.submission,
                loading: false
            }
        case 'ADD_SUBMISSION':
            console.log("Submission Added");
            return{
                ...state,
                submissions: [...state.submissions, action.submission],
                loading: false
            }
        case 'DELETE_SUBMISSION':
            console.log("Deleted");
            let newSubmissions = state.submissions.filter(submission => {
                return action.id !== submission._id
            });
            return {
                ...state,
                submissions: newSubmissions,
                loading: false
            }
        case 'EDIT_SUBMISSION':
            console.log("Edited");
            let editedSubmissions = state.submissions.filter(submission => {
                return action.id !== submission._id
            });
            return {
                ...state,
                submissions: [editedSubmissions, action.submission],
                loading: false
            }
        case 'ITEMS_LOADING':
            console.log("Loading");
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
