import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSocketIoMiddleware from 'redux-socket.io';
import openSocket from 'socket.io-client';

const socket = openSocket(`http://${SERVER_HOSTNAME}:${SERVER_PORT}`);

const socketIoMiddleware = createSocketIoMiddleware(socket, "server/");


import reducer from '../reducers/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default (initialState) => {
    return createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk, socketIoMiddleware)));
}