import { AppMethod } from "../model/AppMethod"

const json = JSON.stringify([
    { id: "31535a1b-91ce-454d-b685-b0660063e729", app_code: "portal", method_code: "user_single_get", descr: "Get data for one app user by user id", mod_de: "catalin", mod_timp: "2023-01-29T20:31:42.580287" },
    { id: "9deac578-c17a-481d-95c9-54b0f5b487b7", app_code: "portal", method_code: "user_single_persist", descr: "Add/ update data for one app user", mod_de: "catalin", mod_timp: "2023-01-29T20:31:42.580287" },
    { id: "8682453e-94d4-45ce-89c1-9fa835e80fa8", app_code: "portal", method_code: "user_single_delete", descr: "Delete data for one app user", mod_de: "catalin", mod_timp: "2023-01-29T20:31:42.580287" },
    { id: "9734d105-6280-470e-914f-6189563af4ec", app_code: "portal", method_code: "user_all_list", descr: "Get data for all app users", mod_de: "catalin", mod_timp: "2023-01-29T20:31:42.580287" },
])

const app_methods: AppMethod[] = JSON.parse(json)

export { app_methods }
