import {gql} from 'apollo-boost'

export const LOG_IN = gql`
        mutation LogIn {
            logIn {
                id
                avatar
                hasWallet
                token
                didRequest
            }
        }
    `
