import {Viewer} from "../../lib/types";

export type LogInData = {
    logIn: Viewer
}

type LogInInput = {
    code: string
}

export type LogInVariables = {
    input?: LogInInput | null
}

export type LogOut = {
    logOut: Viewer
}
