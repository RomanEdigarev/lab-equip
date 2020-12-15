export type Viewer = {
    id: string | null,
    token: string | null,
    avatar: string | null,
    hasWallet: boolean | null,
    didRequest: boolean
}

type User = {
    id: string
    name: string
    avatar: string
    contact: string
}

export type UserData = {
    user: User
}

export type UserVariables = {
    id: string
}
