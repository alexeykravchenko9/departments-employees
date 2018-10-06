import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './assets/general.scss';

import App from './src/containers/App/index.jsx';

import configureStore from './src/store/configureStore';

const store = configureStore();
window.store = store;

render(<Provider store={store}>
        <BrowserRouter forceRefresh="true">
            <App/>
        </BrowserRouter>
       </Provider>, document.getElementById('root') );