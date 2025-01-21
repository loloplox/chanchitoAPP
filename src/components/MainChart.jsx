import { BarChart } from "@mui/x-charts"
import { Box } from "@mui/material"
import { useEffect, useState } from "react"

const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
]

function MainChart({ dataset }) {
    const [series, setSeries] = useState([
        {
            label: "Ahorros",
            data: Array(12).fill(0),
            highlightScope: {
                highlight: "series",
                fade: "global"
            },
            stack: "transaction",
            color: "#4caf50"
        },
        {
            label: "Gastos",
            data: Array(12).fill(0),
            highlightScope: {
                highlight: "series",
                fade: "global"
            },
            stack: "transaction",
            color: "#f44336"
        }
    ])

    useEffect(() => {
        const updatedSeries = [
            {
                label: "Ahorros",
                data: Array(12).fill(0),
                highlightScope: {
                    highlight: "series",
                    fade: "global"
                },
                stack: "transaction",
                color: "#4caf50"
            },
            {
                label: "Gastos",
                data: Array(12).fill(0),
                highlightScope: {
                    highlight: "series",
                    fade: "global"
                },
                stack: "transaction",
                color: "#f44336"
            }
        ]

        dataset.forEach(transaction => {
            const year = new Date(transaction["create_date"]).getFullYear()

            if (year === new Date().getFullYear()) {
                const month = new Date(transaction["create_date"]).getMonth()
                let amount = transaction.amount

                if (transaction["type_transaction"] === 1) {
                    updatedSeries[1].data[month] += amount
                } else {
                    updatedSeries[0].data[month] += amount
                }
            }
        })

        setSeries(updatedSeries)
    }, [dataset])

    return (
        <Box sx={{ border: "1px solid white", borderRadius: "5px" }}>
            <BarChart
                borderRadius={5}
                height={400}
                series={series}
                xAxis={[{ scaleType: "band", data: months }]}
            />
        </Box>
    )
}

export default MainChart
