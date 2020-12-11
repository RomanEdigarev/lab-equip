import {gql} from 'apollo-boost'

export const LOG_IN = gql`
        mutation LogIn($input: LogInInput) {
            logIn(input: $input) {
                id
                avatar
                hasWallet
                token
                didRequest
            }
        }
    `
