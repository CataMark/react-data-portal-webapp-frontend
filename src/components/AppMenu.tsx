import React from "react"
import { MenuItem } from "primereact/menuitem"
import { PanelMenu } from "primereact/panelmenu"
import { useNavigate } from "react-router-dom"

const AppMenu: React.FC = () => {
    const navigate = useNavigate()
    const [expanded, set_expanded] = React.useState<string[]>([])

    const toggle_expanded = (name: string) => {
        if (name === undefined) return
        let result = [...expanded]
        if (result.includes(name)) {
            result = result.filter((v) => v != name)
        } else {
            result.push(name)
        }
        set_expanded(result)
    }
    const items: MenuItem[] = [
        {
            label: "Acasa",
            icon: "pi pi-fw pi-home",
            command: () => navigate("/"),
        },
        {
            id: "auth_group",
            label: "Autorizari",
            expanded: expanded.includes("auth_group"),
            command: () => toggle_expanded("auth_group"),
            items: [
                {
                    label: "Tranzactii",
                    icon: "pi pi-list",
                    command: (e) => {
                        navigate("/transactions")
                    },
                },
                {
                    label: "Grupuri utilizatori",
                    icon: "pi pi-pencil",
                },
                {
                    label: "Clear mesaje",
                    icon: "pi pi-trash",
                },
            ],
        },
        {
            id: "test",
            label: "Testare",
            expanded: expanded.includes("test"),
            command: () => toggle_expanded("test"),
            items: [
                {
                    label: "Utilizator",
                    icon: "pi pi-user",
                },
            ],
        },
    ]
    return <PanelMenu id="app-menu" model={items} multiple={true} className="w-full md:w-15rem" />
}

export default AppMenu
