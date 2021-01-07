import { combineReducers } from 'redux';
import user from './userReducer';
import blogs from './blogsReducer';

const reducer = combineReducers({
  user,
  blogs,
});

export default reducer;