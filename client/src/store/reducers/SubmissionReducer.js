const initState = {
    submissions: [
        { id: 1, title: 'Assignment1', subject: 'ABCD' },
        { id: 2, title: 'Project', subject: 'BCDE' }
    ]
}

const SubmissionReducer = (state = initState, action) => {
    return{
        state
    }
}

export default SubmissionReducer;
