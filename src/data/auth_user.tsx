import { AuthUser, AuthUserMethods } from "../model/AuthUser"

const user: AuthUser = {
    user_id: "catalin",
    first_name: "Catalin",
    last_name: "Any",
    email: "catalin@example.com",
    mod_de: "catalin",
    mod_timp: new Date("2023-02-01 13:45:23"),
}

const user_methods: AuthUserMethods[] = [
    {
        user_id: "catalin",
        app_code: "portal",
        method_code: "user_get_single",
    },
    {
        user_id: "catalin",
        app_code: "portal",
        method_code: "user_persists_single",
    },
    {
        user_id: "catalin",
        app_code: "portal",
        method_code: "user_get_list",
    },
]

export { user, user_methods }
