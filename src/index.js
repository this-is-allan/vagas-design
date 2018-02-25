import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Header from './components/Header';

ReactDOM.render(
    <BrowserRouter>
        <Container>
            <Header />
            <Switch>
                <Route path='/' component={App} />
            </Switch>
        </Container>
    </BrowserRouter>,
    document.getElementById('root')
);
