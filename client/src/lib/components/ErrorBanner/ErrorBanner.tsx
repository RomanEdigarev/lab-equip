import * as React from 'react';
import {Alert} from 'antd'
import {FC} from "react";

type Props = {
    message?: string,
    description?: string
}


export const ErrorBanner: FC<Props> = (
    {
        message = 'Ой, что-то пошло не так',
        description = 'Проверьте подключение к сети и попробуйте позже'
    }
) => {
    return (
        <Alert
            banner
            closable={false}
            message={message}
            description={description}
            type={'error'} className={'error'}>
        </Alert>
    );
};

