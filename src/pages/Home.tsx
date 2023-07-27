import React from "react"
import { ActionType, AppCtx } from "../contexts/AppCtx"
import { Card } from "primereact/card"

const Home: React.FC = () => {
    const { state: ctx, dispatch, toast } = React.useContext(AppCtx)

    React.useEffect(() => {
        dispatch({ type: ActionType.SET_TITLE, payload: null })
    }, [])

    const header = <img alt="acasa" src="/reporting.webp" />

    return (
        <Card title="Bun venit in portalul Control de Gestiune" header={header}>
            <p className="m-0">In aceasta locatie veti putea accesa rapoarte si algoritmi de calcul care nu se regasesc in sistemul de gestiune NAV.</p>
            <div className="p-card-title" style={{ marginTop: "1rem" }}>
                Persoane de contact:
            </div>
        </Card>
    )
}

export default Home
