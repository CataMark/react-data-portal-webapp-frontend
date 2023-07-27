import React, { useEffect } from "react"
import { trackPromise } from "react-promise-tracker"
import { get_app_methods } from "../api/users_api"
import { ActionType, AppCtx } from "../contexts/AppCtx"
import { AppMethod } from "../model/AppMethod"
import { Toolbar } from "primereact/toolbar"
import { Panel } from "primereact/panel"
import { Button } from "primereact/button"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"

function AppMethods() {
    const { state: ctx, dispatch, toast } = React.useContext(AppCtx)
    const [data, set_data] = React.useState<AppMethod[]>([])
    const abort_controller = new AbortController()

    const data_memo = React.useMemo(() => data, [data])

    const get_data = () => {
        trackPromise(get_app_methods(abort_controller.signal))
            .then((data) => set_data(data))
            .catch((ex) => {
                if (ex instanceof DOMException) toast.current?.show({ severity: "error", summary: ex.name, detail: ex.message, sticky: true })
            })
    }

    useEffect(() => {
        dispatch({ type: ActionType.SET_TITLE, payload: "Tranzactii aplicatie" })
        get_data()
    }, [])

    useEffect(() => {
        return () => {
            abort_controller.abort()
        }
    }, [data])

    const header = () => {
        const start_content = (
            <>
                <Button label="Actualizare" icon="pi pi-refresh" className="mr-2" onClick={() => get_data()} />
                <Button label="XLSX" icon="pi pi-download" className="p-button-success" />
            </>
        )
        return <Toolbar left={start_content} right={<></>} />
    }

    return (
        <Panel headerTemplate={header()}>
            <DataTable value={data_memo} dataKey="id" responsiveLayout="scroll" stripedRows>
                <Column field="app_code" header="Aplicatie" />
                <Column field="method_code" header="Metoda" />
                <Column field="mod_de" header="Mod. de" />
                <Column
                    field="mod_timp"
                    header="Mod. la"
                    dataType="date"
                    body={(data, options) => {
                        return new Date(data.mod_timp).toLocaleString("ro-RO")
                    }}
                />
            </DataTable>
        </Panel>
    )
}

export default AppMethods
