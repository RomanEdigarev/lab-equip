import * as React from 'react';
import {FC} from "react";
import {Link} from 'react-router-dom'
import {useMutation} from 'react-apollo'
import {Menu, Button, Avatar} from "antd";
import {HomeTwoTone, UserOutlined, UserSwitchOutlined} from "@ant-design/icons/lib";
import {Viewer} from "../../../../lib/types";
import {LogOut} from "../../../../graphql/mutations/types";
import {LOG_OUT} from "../../../../graphql/mutations/LogOut";
import {displaySuccessNotification, displayErrorMessage} from '../../../../lib/components/utils'

const {Item, SubMenu} = Menu
type Props = {
    viewer: Viewer
    setViewer: (viewer: Viewer) => void
}

export const MenuItems: FC<Props> = ({viewer, setViewer}) => {
    const [logOut] = useMutation<LogOut>(LOG_OUT, {
        onCompleted: data => {
            if(data?.logOut) {
                setViewer(data.logOut)
                displaySuccessNotification('Выход выполнен')
            }
        },
        onError: error => {
            displayErrorMessage('Произошла ошибка выхода')
        }
    })

    const handleLogOut = () => {
        logOut()
    }

    const subMenuLogin = viewer.id ?
        (
            <SubMenu title={<Avatar src={viewer.avatar}/>}>
                <Item key={'/user'}>
                    <Link to={`/user/${viewer.id}`}>
                        <UserOutlined/>
                        Профиль
                    </Link>
                </Item>
                <Item key={'/logOut'}>
                    <div onClick={handleLogOut}>
                        <UserSwitchOutlined/>
                        Выход
                    </div>
                </Item>
            </SubMenu>
        ) : (
            <Item>
                <Link to={'/login'}>
                    <Button type={'primary'}>Войти</Button>
                </Link>
            </Item>
        )

    return (
        <Menu mode={'horizontal'} selectable={true} className={'menu'}>
            <Item key={'/host'}>
                <Link to={'/host'}>
                    <HomeTwoTone/>
                    Домой
                </Link>
            </Item>
            {subMenuLogin}
        </Menu>
    );
};
