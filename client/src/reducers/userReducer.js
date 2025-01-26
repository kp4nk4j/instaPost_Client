const initialState = {
    user: null,
    isLoading: false,
    error: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_LOGIN':
            return { ...state, user: action.payload, isLoading: false };
        case 'USER_LOGOUT':
            return { ...state, user: null };
        case 'USER_LOADING':
            return { ...state, isLoading: true };
        case 'USER_ERROR':
            return { ...state, error: action.payload, isLoading: false };
        default:
            return state;
    }
};

export default userReducer;
