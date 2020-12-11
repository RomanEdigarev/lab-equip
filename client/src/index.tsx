import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
import {Layout} from 'antd'
import reportWebVitals from './reportWebVitals';
import {Home, Host, Equipment, User, NotFound, Equipments, Login} from './sections'
import './styles/index.css'

const client = new ApolloClient({uri: '/api'})

const App = () => {
    return (
        <Layout id={'app'}>
            <Router>
                <Switch>
                    <Route exact path={'/'}><Home/></Route>
                    <Route exact path={'/host'}><Host/></Route>
                    <Route exact path={'/equipment/:id'}><Equipment/></Route>
                    <Route exact path={'/equipments/:location?'}><Equipments/></Route>
                    <Route exact path={'/login'}><Login/></Route>
                    <Route exact path={'/user/:id'}><User/></Route>
                    <Route><NotFound/></Route>
                </Switch>
            </Router>
        </Layout>
    )
}

ReactDOM.render(
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
