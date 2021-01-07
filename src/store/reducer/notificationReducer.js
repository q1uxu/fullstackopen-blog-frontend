const initialState = { message: '', type: null };
let timer = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFY':
      return action.payload;
    case 'NOTIFY_END':
      return { message: '', type: null };
    default: return state;
  }
};

export const notify = ({ message, type = 'success', duration = 5000 } = {}) => dispatch => {
  clearTimeout(timer);
  dispatch({
    type: 'NOTIFY',
    payload: { message, type },
  });
  timer = setTimeout(() => {
    dispatch({ type: 'NOTIFY_END' });
  }, duration);
};