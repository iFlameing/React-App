import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import { createStore,applyMiddleware,compose, combineReducers }  from 'redux'
import burgerbuilderreducer from './store/reducer/burgerbuilder'
import orderreducer from './store/reducer/order'
import authreducer from  './store/reducer/auth'
import thunk from 'redux-thunk'
import {BrowserRouter} from 'react-router-dom'


const rootreducer=combineReducers({
    burgerbuilder:burgerbuilderreducer,
    order:orderreducer,
    auth:authreducer
})

const composeEnhancers =process.env.NODE_ENV === 'development'? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :null || compose;
const store=createStore(rootreducer,composeEnhancers(applyMiddleware(thunk)))

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);


ReactDOM.render(
app
, document.getElementById('root'));
registerServiceWorker();
