import { Box, Container, IconButton, Tooltip, Typography } from "@mui/material"
import userStore from "../store/userStore.js"
import MainChart from "../components/MainChart.jsx"
import LogoutIcon from "@mui/icons-material/Logout"
import { enqueueSnackbar } from "notistack"
import CardsTransactions from "../components/CardsTransactions.jsx"
import { useEffect, useState } from "react"
import transactionApi from "../fetch/transactionApi.js"
import ListTransactions from "../components/ListTransactions.jsx"
import ModalCreateTransaction from "../components/ModalCreateTransaction.jsx"
import ActionButtonFloat from "../components/ActionButtonFloat.jsx"

function Home() {
    const { user, logout } = userStore()
    const [transactions, setTransactions] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [typeTransaction, setTypeTransaction] = useState(0)

    function handleClickLogout() {
        enqueueSnackbar("Cerrando sesión", {
            variant: "info",
            autoHideDuration: 3000
        })
        enqueueSnackbar("Sera redirigido al inicio de sesión", {
            variant: "info",
            autoHideDuration: 3000
        })

        setTimeout(() => {
            logout()
        }, 3000)
    }

    async function getTransactions() {
        const { data, status } = await transactionApi.getTransactions(
            user.userId,
            user.token
        )

        if (status !== 200) {
            enqueueSnackbar("Error al obtener las transacciones", {
                variant: "error",
                autoHideDuration: 3000
            })
            return
        }

        setTransactions(data)
    }

    function orderTransactions() {
        const orderedTransactions = transactions.sort((a, b) => {
            return new Date(b.create_date) - new Date(a.create_date)
        })

        setTransactions(orderedTransactions)
    }

    useEffect(() => {
        getTransactions()
    }, [])

    useEffect(() => {
        orderTransactions()
    }, [transactions])

    return (
        <Box>
            <Container sx={{ position: "relative" }}>
                <Box
                    marginY="20px"
                    sx={{ display: "flex", justifyContent: "space-between" }}
                >
                    <Typography variant="h3">
                        Bienvenido, {user.username}
                    </Typography>
                    <Tooltip title="Cerrar sesión">
                        <IconButton
                            color="error"
                            size="large"
                            onClick={handleClickLogout}
                        >
                            <LogoutIcon />
                        </IconButton>
                    </Tooltip>
                </Box>

                <MainChart dataset={transactions} />
                <CardsTransactions transactions={transactions} />
                <ListTransactions
                    transactions={transactions}
                    getTransactions={getTransactions}
                />
                <ModalCreateTransaction
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    getTransactions={getTransactions}
                    typeTransaction={typeTransaction}
                />
            </Container>
            <ActionButtonFloat
                setOpenModal={setOpenModal}
                setTypeTransaction={setTypeTransaction}
            />
        </Box>
    )
}

export default Home
