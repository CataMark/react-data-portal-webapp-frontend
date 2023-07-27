import React, { useEffect } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import { ActionType, AppCtx, Theme } from "./contexts/AppCtx"
import { Button } from "primereact/button"
import { Toast } from "primereact/toast"
import { Menu } from "primereact/menu"
import { ProgressBar } from "primereact/progressbar"
import { Card } from "primereact/card"
import { BlockUI } from "primereact/blockui"
import { trackPromise, usePromiseTracker } from "react-promise-tracker"
import AppMenu from "./components/AppMenu"
import { get_auth_user, get_user_methods } from "./api/auth_api"
import Login from "./pages/Login"
import AppMethods from "./pages/AppMethods"
import E404 from "./pages/E404"
import Home from "./pages/Home"

function App() {
    const { state: ctx, dispatch, toast } = React.useContext(AppCtx)
    const navigate = useNavigate()
    const { promiseInProgress } = usePromiseTracker()
    const [init, set_init] = React.useState(true)
    const [nav_show, set_nav_show] = React.useState(false)
    const user_menu: React.MutableRefObject<Menu | null> = React.useRef(null)

    const nav_toggle = () => {
        set_nav_show(!nav_show)
    }

    const user = React.useMemo(() => ctx.user, [ctx.user])

    useEffect(() => {
        let controller = new AbortController()
        let signal = controller.signal

        trackPromise(Promise.all([get_auth_user(signal), get_user_methods(signal)]))
            .then((v) => {
                if (init) set_init(false)
                return v
            })
            .then((v) => {
                dispatch({ type: ActionType.SET_USER_DATA, payload: { user: v[0], methods: v[1] } })
                return v[0]
            })
            .catch((ex) => {
                navigate("/login")
            })
            .finally(() => {
                set_init(false)
            })

        return () => {
            controller.abort()
        }
    }, [user])

    const header = () => {
        const user_menu_items = [
            {
                label: "Iesire aplicatie",
                icon: "pi pi-sign-out",
            },
        ]
        return (
            <>
                <div className="flex gap-3 header-top" style={{ height: "3rem" }}>
                    <div id="nav-toggler-container" className="flex flex-none align-items-center" style={{ width: "3rem" }}>
                        {user && <Button id="nav-toggler" className="p-button-text" icon="pi pi-bars" onClick={nav_toggle} />}
                    </div>
                    <div id="page-title-container" className="flex-grow-1 flex align-items-center">
                        <h1 id="page-title" style={{ margin: 0, padding: 0 }}>
                            {ctx.title}
                        </h1>
                    </div>
                    <div id="app-toolbar-container" className="flex flex-none align-items-center">
                        <Button id="theme-toggler" className="p-button-text" icon={`pi pi-${ctx.theme === Theme.LIGHT ? "moon" : "sun"}`} onClick={() => dispatch({ type: ActionType.TOGGLE_THEME, payload: null })} />
                        {user && (
                            <>
                                <Button id="user-menu" className="p-button-text" icon="pi pi-user" onClick={(e) => user_menu.current?.show(e)} />
                                <Menu popup model={user_menu_items} ref={user_menu} />
                            </>
                        )}
                    </div>
                </div>
                <div className="header-bottom" style={{ height: "0.5rem" }}>
                    {promiseInProgress && <ProgressBar mode="indeterminate" style={{ height: "100%" }} />}
                </div>
            </>
        )
    }

    const nav_section = () => {
        if (user) {
            return (
                <nav id="app-navigation" className={nav_show ? "flex flex-none" : "hidden"}>
                    <AppMenu />
                </nav>
            )
        } else {
            return <></>
        }
    }

    const body_section = () => {
        if (init)
            return (
                <div className="flex flex-grow-1 justify-content-center">
                    <Card title="Initializare...">
                        <p style={{ margin: 0 }}>Va rog sa aveti rabdare cat timp aplicatia se initializeaza</p>
                    </Card>
                </div>
            )
        return (
            <BlockUI blocked={promiseInProgress}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="transactions" element={<AppMethods />} />
                    <Route path="login" element={<Login />} />
                    <Route path="*" element={<E404 />} />
                </Routes>
            </BlockUI>
        )
    }

    return (
        <>
            <title>{ctx.title}</title>
            <link rel="stylesheet" href={ctx.theme} />
            <div className={`p-component layout-wrapper layout-wrapper-${ctx.theme === Theme.LIGHT ? "light" : "dark"}`}>
                <Toast ref={toast} />
                <header style={{ position: "fixed", zIndex: 1100, width: "100%", padding: "0 1rem", overflow: "hidden" }}>{header()}</header>
                <section className="flex gap-3 app-body-wrapper" style={{ width: "100%", padding: "4rem 1rem 0 1rem" }}>
                    {nav_section()}
                    <main id="app-content" className="flex flex-grow-1">
                        {body_section()}
                    </main>
                </section>
            </div>
        </>
    )
}

export default App
