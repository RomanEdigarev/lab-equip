import * as React from 'react';
import {FC} from 'react';
import {RouteComponentProps} from 'react-router-dom'
import {useQuery} from 'react-apollo'
import {Col, Layout, Row} from 'antd'
import {USER} from '../../graphql/query'
import {UserData, UserVariables} from '../../lib/types'

import {ErrorBanner, PageSkeleton} from "../../lib/components";
import {UserProfile} from "./UserProfile";

type MatchParams = {
  id: string
}

const {Content} = Layout
export const User: FC<RouteComponentProps<MatchParams>> = ({match,}) => {
  const {data, error, loading} = useQuery<UserData, UserVariables>(USER, {
    variables: {
      id: match.params.id
    }
  })

  if (loading) {
    return (
      <Content className={'user'}>
        <PageSkeleton/>
      </Content>
    )
  }

  if (error) {
    return (
      <Content className={'user'}>
        <ErrorBanner description={'Невозможно получить информацию о пользователе. Повторите попытку позже'}/>
        <PageSkeleton/>
      </Content>
    )
  }

  const user = data?.user

  const userProfileElement = user ?
    <UserProfile user={user}/> :
    null

  return (
    <Content className={'user'}>
      <Row gutter={12} justify={'space-between'}>
        <Col xs={24}>
          {userProfileElement}
        </Col>
      </Row>
    </Content>
  );
};


