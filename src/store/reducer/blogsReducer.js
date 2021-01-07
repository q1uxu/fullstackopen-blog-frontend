import blogService from '../../services/blogs';
import { notify } from './notificationReducer';

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_BLOGS':
      return action.payload;
    case 'CREATE_BLOG':
      return state.concat(action.payload);
    default: return state;
  }
};

export default blogsReducer;

export const getBlogs = () => dispatch => {
  blogService.getAll().then(blogs => {
    dispatch({
      type: 'GET_BLOGS',
      payload: blogs,
    });
  });
};

export const createBlog = (newBlog) => dispatch => {
  blogService.createBlog(newBlog)
    .then(savedBlog => {
      dispatch({
        type: 'CREATE_BLOG',
        payload: savedBlog,
      });
      dispatch(notify({
        message: `a new blog ${savedBlog.title} by ${savedBlog.author} added!`,
      }));
    })
    .catch(error => {
      console.log(error.response.data);
      dispatch(notify({
        message: error.response.data,
        type: 'error',
      }));
    });
};