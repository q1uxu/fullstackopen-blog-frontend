import loginService from '../../services/login';
import blogService from '../../services/blogs';
import { notify } from './notificationReducer';

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    default: return state;
  }
};

export default userReducer;

export const login = (credentials) => dispatch => {
  loginService.login(credentials)
    .then(user => {
      dispatch({
        type: 'SET_USER',
        payload: user,
      });
      localStorage.setItem('user', JSON.stringify(user));
      blogService.setToken(user.token);
    })
    .catch(error => {
      console.log(error.response.data);
      dispatch(notify({
        message: error.response.data,
        type: 'error',
      }));
    });
};

export const logout = () => {
  localStorage.removeItem('user');
  blogService.setToken(null);
  return {
    type: 'SET_USER',
    payload: null,
  };
};

export const getLocalUser = () => dispatch => {
  const userString = localStorage.getItem('user');
  if (userString) {
    const user = JSON.parse(userString);
    dispatch({
      type: 'SET_USER',
      payload: user,
    });
    blogService.setToken(user.token);
    dispatch(notify({
      message: `welcome back, ${user.name}`,
      duration: 5000,
    }));
  }
};