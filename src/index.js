import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import {TableReduser} from './redusers/TableReduser'

const redux = require('redux');

const reducers = redux.combineReducers({ TableReduser });

const store = redux.createStore(reducers);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

