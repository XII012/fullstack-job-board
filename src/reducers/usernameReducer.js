const defaultUsername = '';

function generateUsername() {
    return defaultUsername;
}

export default function usernameReducer(state, action) {
    
    if (state === undefined) {
        return generateUsername();

    }
    if (action.type === 'LOGIN') {
        state = action.username;
        return state;
    }

    if (action.type === 'LOGOUT') {
        return generateUsername();
    }

    return state;
}
