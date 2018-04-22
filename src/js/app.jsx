import React from 'react';
import { render } from 'react-dom';
import {
    Switch,
    Route,
    Link,
    BrowserRouter as Router
} from 'react-router-dom';

import SearchBox from './components/SearchBox';
import MainPage from './pages/MainPage';
import AlbumPage from './pages/AlbumPage';
import ImagePage from './pages/ImagePage';


require('../sass/main.scss');

render((
    <Router>
        <div className="renderedApp">
            <header className="appHeader">
                <Link className="appHeader__link" to="/">
                    <div className="appHeader__logo">
                        Polan<span className="db"><span>d</span><span>b</span></span>all
                    </div>
                </Link>
                <Switch>
                    <Route path="/search/:query" component={SearchBox}/>
                    <Route path="/" component={SearchBox}/>
                </Switch>
            </header>
            <div className="appContent">
                <Switch>
                    <Route path="/album/:id" component={AlbumPage}/>
                    <Route path="/image/:id" component={ImagePage}/>
                    <Route path="/search/:query" component={MainPage}/>
                    <Route path="/" component={MainPage}/>
                </Switch>
            </div>
        </div>
    </Router>
), document.getElementById('app'));
