import React from 'react';
import { render } from 'react-dom';
import reduxStore from './store/configureStore';
import Root from './components/Root';

let store = reduxStore.configureStore();

const App = () => <Root store={store} history={reduxStore.history}/>

render (<App/>, document.getElementById('root'));
