import React from 'react';
import { render } from 'react-dom';
import MainApp from './MainApp'
import * as serviceWorker from './serviceWorker';


const rootElement  = document.getElementById('root');


render(<MainApp />, rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
