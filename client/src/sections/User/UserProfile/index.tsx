import {UserData} from '../../../lib/types'
import React, {FC} from "react";
import {Avatar, Card, Divider, Typography} from 'antd'

type Props = {
  user: UserData['user']
}

const {Paragraph, Text, Title} = Typography
export const UserProfile : FC<Props>= ({user}) => {
  return (
    <div className={'user-profile'}>
      <Card className={'user-profile__card'}>
        <div className={'user-profile__avatar'}>
          <Avatar size={100} src={user.avatar}/>
        </div>
        <Divider/>
        <div className={'user-profile__details'}>
          <Paragraph>
            Имя: <Text strong>{user.name}</Text>
          </Paragraph>
          <Paragraph>
            Контакты: <Text strong>{user.contact}</Text>
          </Paragraph>
        </div>
      </Card>
    </div>
  )
}
