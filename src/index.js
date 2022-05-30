import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import { legacy_createStore as createStore } from 'redux'
import { combineReducers } from 'redux';
import { ReactReduxContext } from 'react-redux';
import { rootReducer } from './redux/rootReducer';
const finalReducer = combineReducers({
  rootReducer: rootReducer,
})
const initialState = {
  rootReducer: {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
  },
};
const store = createStore(finalReducer, initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();