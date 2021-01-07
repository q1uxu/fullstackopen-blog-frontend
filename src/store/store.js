import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools }  from 'redux-devtools-extension';
import reducer from './reducer';

const enhancer = composeWithDevTools(applyMiddleware(thunk));
const store = createStore(reducer, enhancer);

export default store;