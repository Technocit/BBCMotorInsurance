import React from 'react';
import { render } from 'react-dom';

import { App } from './App';

// setup fake backend
import { configureFakeBackend } from './_helpers';
configureFakeBackend();
// let cors = require('cors')
// App.use(cors())
render(
    <App />,
    document.getElementById('app')
    
);