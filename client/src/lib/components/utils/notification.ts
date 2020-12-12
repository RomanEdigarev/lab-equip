import {notification} from 'antd'

export const displaySuccessNotification = (succesNotificationText: string) => {
    return notification.open({
        message: 'Вход выполнен',
        description: succesNotificationText
    })
}
