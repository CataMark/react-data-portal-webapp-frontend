async function cancellable_promise<T>(value: T, signal?: AbortSignal) {
    if (signal?.aborted) {
        return Promise.reject(new Error("call aborted"))
    }

    let promise = new Promise<T>((resolve, reject) => {
        let timeout: NodeJS.Timeout

        const abort_handler = () => {
            clearTimeout(timeout)
            reject(new DOMException("call aborted", "Abort Controller"))
        }

        timeout = setTimeout(() => {
            resolve(value)
            signal?.removeEventListener("abort", abort_handler)
        }, 3000)

        signal?.addEventListener("abort", abort_handler)
    })
    return await promise
}

function get_cookie(name: string): string | undefined {
    let value = `; ${document.cookie}`
    let parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(";").shift()
}

function set_cookie(name: string, value: string, path: string, max_age: number) {
    document.cookie = `${name}=${value}; path=${path}; max-age=${max_age};`
}

export { cancellable_promise, get_cookie, set_cookie }
