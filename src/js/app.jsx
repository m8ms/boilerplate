import React from 'react';
import { render } from 'react-dom';
import {
    Switch,
    Route,
    BrowserRouter as Router
} from 'react-router-dom';

import MainPage from './pages/MainPage';
import ImagePage from './pages/ImagePage';


require('../sass/main.scss');

render((
    <Router>
        <div className="appContent">
            <Switch>
                <Route path="/image/:id" component={ImagePage}/>
                <Route path="/search/:query" component={MainPage}/>
                <Route path="/" component={MainPage}/>
            </Switch>
        </div>
    </Router>
), document.getElementById('app'));
