import {notification} from 'antd'

export const displaySuccessNotification = (successNotificationText: string) => {
    return notification.success({
        message: 'Успешно',
        description: successNotificationText
    })
}
