import ReactDOM from "react-dom/client"
import "./index.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import "primeflex/primeflex.css"
import App from "./App"
import AppCtxProvider from "./contexts/AppCtx"
import { BrowserRouter } from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
    //<React.StrictMode>
    <AppCtxProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </AppCtxProvider>
    //</React.StrictMode>
)
