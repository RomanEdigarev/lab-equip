import * as React from 'react';
import googleLogo from './assets/google_logo.jpg'
import {Card, Layout, Typography} from "antd";

const {Content} = Layout
const {Title, Text} = Typography

export const Login = () => {
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
                <button className={'log-in-card__google-button'}>
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


