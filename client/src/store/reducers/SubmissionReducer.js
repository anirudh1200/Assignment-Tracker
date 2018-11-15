const initState = {
    submissions: [ ],
    loading: false
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
                submissions: [...state.submissions, action.submission]
            }
        case 'DELETE_SUBMISSION':
            console.log("Deleted");
            let newSubmissions = state.submissions.filter(submission => {
                return action.id !== submission._id
            });
            return {
                ...state,
                submissions: newSubmissions
            }
        case 'EDIT_SUBMISSION':
            console.log("Edited");
            let editedSubmissions = state.submissions.filter(submission => {
                return action.id !== submission.id
            });
            return {
                ...state,
                submissions: editedSubmissions
            }
        case 'ITEMS_LOADING':
            console.log("Loading");
            return{
                ...state,
                loading: true
            }
        default:
            console.log("Error");
            return state;
    }
}

export default SubmissionReducer;
