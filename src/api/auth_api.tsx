import { user_methods } from "../data/auth_user"
import { AuthUser } from "../model/AuthUser"
import { cancellable_promise } from "./utils"

async function get_auth_user(signal?: AbortSignal) {
    const response = await fetch("/cdg/auth/user", {
        method: "GET",
        signal,
    })

    if (!response.ok) {
        throw new Error(await response.text())
    }

    let result: AuthUser = await response.json()
    return result
}

async function get_user_methods(signal?: AbortSignal) {
    return await cancellable_promise(user_methods)
}

async function user_login(signal?: AbortSignal) {
    return await cancellable_promise(null)
}

async function user_logout(signal?: AbortSignal) {
    return await cancellable_promise(null)
}

export { get_auth_user, get_user_methods, user_login, user_logout }
