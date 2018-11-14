import uuid from 'uuid';

const initState = {
    submissions: [
        { id: uuid(), title: 'Assignment1', subject: 'ABCD', date:'20-20-20', time: 'Not Specified', content:'blahblahblah' },
        { id: uuid(), title: 'Project', subject: 'BCDE', date:'20-20-20', time: 'Not Specified', content:'blahblahblah' }
    ]
}

const SubmissionReducer = (state = initState, action) => {
    switch(action.type){
        case 'ADD_SUBMISSION':
            console.log("Submission Added");
            return{
                submissions: [...state.submissions, action.submission]
            }
        case 'DELETE_SUBMISSION':
            console.log("Deleted");
            let newSubmissions = state.submissions.filter(submission => {
                return action.id !== submission.id
            });
            return {
                submissions: newSubmissions
            }
        default:
            console.log("Error");
            return state;
    }
}

export default SubmissionReducer;
