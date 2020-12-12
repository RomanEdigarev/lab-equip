import {message} from 'antd'

export const displayErrorMessage = (errorMessage: string) => {
    return message.error(errorMessage)
}
