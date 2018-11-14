const initState = {
    submissions: [
        { id: 1, title: 'Assignment1', subject: 'ABCD', date:'20-20-20', time: 'Not Specified', content:'blahblahblah' },
        { id: 2, title: 'Project', subject: 'BCDE', date:'20-20-20', time: 'Not Specified', content:'blahblahblah' }
    ]
}

const SubmissionReducer = (state = initState, action) => {
    switch(action.type){
        case 'ADD_SUBMISSION':
            console.log("Submission Added");
            return{
                submissions: [...state.submissions, action.submission]
            }
        default:
            console.log("Error");
            return state;
    }
}

export default SubmissionReducer;
