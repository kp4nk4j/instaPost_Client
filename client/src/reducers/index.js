import { combineReducers } from 'redux';
import userReducer from './userReducer';
import postsReducer from './postReducer';

const rootReducer = combineReducers({
    user: userReducer,
    posts: postsReducer,
});

export default rootReducer;
