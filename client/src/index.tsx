import React, {useEffect, useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import {ApolloProvider, useMutation} from 'react-apollo'
import {Affix, Layout, Spin} from 'antd'
import {Viewer} from './lib/types'
import {ErrorBanner} from './lib/components/ErrorBanner'
import {LOG_IN} from './graphql/mutations/LogIn'
import {LogInData, LogInVariables} from './graphql/mutations/types'
import reportWebVitals from './reportWebVitals';
import {Home, Host, Equipment, User, NotFound, Equipments, Login, AppHeader} from './sections'
import './styles/index.css'
import {AppHeaderSkeleton} from "./sections/AppHeader/components/AppHeaderSkeleton";

const client = new ApolloClient({uri: '/api'})
const initialViewer: Viewer = {
    didRequest: false,
    id: null,
    avatar: null,
    hasWallet: false,
    token: null
}

const App = () => {
    const [viewer, setViewer] = useState<Viewer>(initialViewer)
    console.log(viewer)
    const [logIn, {error}] = useMutation<LogInData, LogInVariables>(LOG_IN,
        {
            onCompleted: (data => {
                if(data?.logIn) {
                    setViewer(data.logIn)
                }
            })
        })

    const logInRef = useRef(logIn)

    useEffect(() => {
        logInRef.current()
    }, [])

    if(!viewer.didRequest && !error) {
        return (
            <Layout className={'app-skeleton'}>
                <AppHeaderSkeleton/>
                <div className={'app-skeleton__spin-section'}>
                    <Spin size={'large'} tip={'Загрузка Lab Equip'}/>
                </div>
            </Layout>
        )
    }

    const displayErrorBanner = error ?
        <ErrorBanner/> :
        null

    return (
        <Router>
            <Layout id={'app'}>
                {displayErrorBanner}
                <Affix offsetTop={0} className={'app__affix-header'}>
                    <AppHeader viewer={viewer} setViewer={setViewer}/>
                </Affix>
                <Switch>
                    <Route exact path={'/'}><Home/></Route>
                    <Route exact path={'/host'}><Host/></Route>
                    <Route exact path={'/equipment/:id'}><Equipment/></Route>
                    <Route exact path={'/equipments/:location?'}><Equipments/></Route>
                    <Route exact path={'/login'}><Login setViewer={setViewer}/></Route>
                    <Route exact path={'/user/:id'} render={props => <User {...props}/>}/>
                    <Route><NotFound/></Route>
                </Switch>
            </Layout>
        </Router>
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
