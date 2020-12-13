import * as React from 'react';
import {FC, useEffect, useRef} from 'react';
import googleLogo from './assets/google_logo.jpg'
import {Card, Layout, Typography, Spin} from "antd";
import {useApolloClient} from '@apollo/react-hooks'
import {Viewer} from "../../lib/types";
import {AUTH_URL} from "../../graphql/query";
import {AuthUrl} from "../../graphql/query/AuthUrl/types";
import {useMutation} from "react-apollo";
import {LogInData, LogInVariables} from "../../graphql/mutations/types";
import {LOG_IN} from "../../graphql/mutations/LogIn";
import {ErrorBanner} from "../../lib/components/ErrorBanner";
import {displayErrorMessage, displaySuccessNotification} from "../../lib/components/utils";
import { Redirect } from 'react-router-dom';


const {Content} = Layout
const {Title, Text} = Typography

type Props = {
    setViewer: (viewer: Viewer) => void
}

export const Login: FC<Props> = ({setViewer}) => {
    const client = useApolloClient()
    const [logIn, {data, loading, error}] = useMutation<LogInData, LogInVariables>(LOG_IN, {
        onCompleted: (data) => {
            if (data?.logIn) {
                setViewer(data.logIn)
                displaySuccessNotification('Добро пожаловать в Lab Equip')
            }
        }
    })
    const logInRef = useRef(logIn)

    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get('code')
        if (code) {
            logInRef.current({
                variables: {input: {code}}
            })
        }
    }, [])

    const handleAuth = async () => {
        try {
            const {data} = await client.query<AuthUrl>({
                query: AUTH_URL
            })
            window.location.href = data.auth
        } catch (e) {
            displayErrorMessage('Ошибка попробуйте позже')
        }
    }

    if (loading) {
        return (
            <Content className={'log-in'}>
                <Spin size={'large'} tip={'Logging you in'}>
                </Spin>
            </Content>

        )
    }

    if (error) {
        return (
            <Content className={'log-in'}>
                <ErrorBanner/>
            </Content>
        )
    }

    if (data?.logIn) {
        const viewer = data.logIn.id
        return (
            <Redirect to={`/user/${viewer}`}/>
        )
    }


    return (
        <Content className={'log-in'}>
            <Card className={'log-in-card'}>
                <div className={'log-in-card__intro'}>
                    <Title level={3} className={'log-in-card__intro-title'}>
                        <span role={'img'} aria-label={'wave'}>
                           👋
                        </span>
                    </Title>
                    <Title level={3} className={'log-in-card__intro-title'}>
                        Вход в Lab Equip
                    </Title>
                    <Text>Войдите с помощью аккаунта Google</Text>
                </div>
                <button className={'log-in-card__google-button'} onClick={() => handleAuth()}>
                    <img className={'log-in-card__google-button-logo'} src={googleLogo} alt="Google logo"/>
                    <span className={'log-in-card__google-button-text'}>
                        Вход с Google
                    </span>
                </button>
                <Text type={'secondary'}>
                    Выполнив вход вы будете перенаправлены на
                    страницу вашего аккаунта Google для разрешения доступа к вашему аккаунту Google.
                </Text>
            </Card>
        </Content>

    );
};


