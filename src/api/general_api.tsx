import { Theme } from "../contexts/AppCtx"
import { get_cookie, set_cookie } from "./utils"

function get_theme_cookie(): Theme {
    let cookie = get_cookie("theme") === Theme.DARK ? Theme.DARK : Theme.LIGHT
    return cookie
}

function set_theme_cookie(theme: Theme) {
    set_cookie("theme", theme, "/", 365 * 24 * 60 * 60)
}

export { get_theme_cookie, set_theme_cookie }
