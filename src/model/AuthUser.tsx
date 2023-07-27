interface AuthUser {
    user_id: string
    first_name: string
    last_name: string
    email: string
    mod_de?: string
    mod_timp?: Date
}

interface AuthUserMethods {
    user_id: string
    app_code: string
    method_code: string
}

export type { AuthUser, AuthUserMethods }
