import { AppMethod } from "../model/AppMethod"

async function get_app_methods(signal?: AbortSignal) {
    const response = await fetch("/cdg/app_methods", {
        method: "GET",
        signal,
    })

    if (!response.ok) {
        throw new Error(await response.text())
    }

    let result: AppMethod[] = await response.json()
    return result
}

export { get_app_methods }
