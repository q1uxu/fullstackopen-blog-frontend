import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ErrorBondary from './ErrorBondary';
import store from './store/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
  <ErrorBondary>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ErrorBondary>
  ,
  document.getElementById('root'),
);