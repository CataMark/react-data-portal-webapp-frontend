import { Toast } from "primereact/toast"
import React, { useEffect } from "react"
import { get_theme_cookie, set_theme_cookie } from "../api/general_api"
import { AuthUser, AuthUserMethods } from "../model/AuthUser"

enum Theme {
    LIGHT = "/themes/mdc-light-indigo/theme.css",
    DARK = "/themes/mdc-dark-indigo/theme.css",
}

interface State {
    theme: Theme
    user: AuthUser | null
    methods: AuthUserMethods[]
    title: string | null
}

enum ActionType {
    TOGGLE_THEME,
    SET_USER_DATA,
    SET_TITLE,
}

type ActionPayload = {
    [ActionType.TOGGLE_THEME]: null
    [ActionType.SET_USER_DATA]: { user?: AuthUser; methods?: AuthUserMethods[] }
    [ActionType.SET_TITLE]: string | null
}

interface Action<T extends ActionType> {
    type: T
    payload: ActionPayload[T]
}

interface CtxType {
    state: State
    dispatch: React.Dispatch<Action<ActionType>>
    toast: React.MutableRefObject<Toast | null>
}

const AppCtx = React.createContext({} as CtxType)

const reducer = <T extends ActionType>(state: State, action: Action<T>) => {
    let l_state = { ...state }
    switch (action.type) {
        case ActionType.TOGGLE_THEME: {
            l_state.theme = l_state.theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
            set_theme_cookie(l_state.theme)
            break
        }
        case ActionType.SET_USER_DATA: {
            const { user, methods } = (action as Action<ActionType.SET_USER_DATA>).payload
            if (user) {
                l_state.user = user
                l_state.methods = methods || []
            } else {
                l_state.user = null
                l_state.methods = []
            }
            break
        }
        case ActionType.SET_TITLE: {
            const title = (action as Action<ActionType.SET_TITLE>).payload
            l_state.title = title || "Portal CdG"
            break
        }
        default:
            throw new DOMException(`categorie nedefinita: ${action.type}`, "Context aplicatie")
    }
    return l_state
}

const AppCtxProvider: React.FC<React.PropsWithChildren> = (props) => {
    const initial_state: State = {
        theme: get_theme_cookie(),
        user: null,
        methods: [],
        title: "Portal CdG",
    }
    const [state, dispatch] = React.useReducer(reducer, initial_state)
    const toast: React.MutableRefObject<Toast | null> = React.useRef(null)
    return <AppCtx.Provider value={{ state, dispatch, toast }}>{props.children}</AppCtx.Provider>
}

export default AppCtxProvider
export { Theme, AppCtx, ActionType }
