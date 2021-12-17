const defaultJob = {
    jobTitle:'',
    companyName:'',
    location:'',
    description:'',
    employerEmail:'',
    companyWebsite:'',
}

export default function jobReducer(
    state, action
) {
    if (state === undefined) {
        return defaultJob;
    }
    if (action.type === 'UPDATE') {
        state.jobTitle = action.jobTitle;
        state.companyName = action.companyName;
        state.location = action.location;
        state.description = action.description;
        state.employerEmail = action.employerEmail;
        state.companyWebsite = action.companyWebsite;
        return {...state};
    }
    if (action.type === 'RESET') {
        return defaultJob;
    }
    return state;
}