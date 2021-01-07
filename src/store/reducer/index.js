import { combineReducers } from 'redux';
import user from './userReducer';
import blogs from './blogsReducer';
import notification from './notificationReducer';

const reducer = combineReducers({
  user,
  blogs,
  notification,
});

export default reducer;