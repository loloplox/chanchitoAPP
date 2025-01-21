import { Box, List, TextField, Typography } from "@mui/material"
import TransactionItem from "./TransactionItem.jsx"
import { useEffect, useState } from "react"
import categoryApi from "../fetch/categoryApi.js"
import { enqueueSnackbar } from "notistack"
import userStore from "../store/userStore.js"
import ModalCreateTransaction from "./ModalCreateTransaction.jsx"

function ListTransactions({ transactions, getTransactions }) {
    const [categories, setCategories] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const { user } = userStore()
    const [transactionSelected, setTransactionSelected] = useState({})
    const [searchTerm, setSearchTerm] = useState("")

    async function getCategories() {
        const { data, status } = await categoryApi.getCategories(user.token)

        if (status !== 200) {
            enqueueSnackbar("Error al obtener las categorias", {
                variant: "error",
                autoHideDuration: 3000
            })
            return
        }

        setCategories(data)
    }

    useEffect(() => {
        getCategories()
        console.log(transactions)
    }, [transactions])

    const filteredTransactions = transactions.filter(transaction => {
        const categoryName =
            categories
                .find(cat => cat.id === transaction.category_id)
                ?.name.toLowerCase() || ""
        const amountString = transaction.amount.toString()
        const searchTermLower = searchTerm.toLowerCase()

        return (
            categoryName.includes(searchTermLower) ||
            amountString.includes(searchTermLower)
        )
    })

    return (
        <Box
            width="100%"
            sx={{
                border: "1px solid white",
                borderRadius: "5px",
                marginY: "20px",
                position: "relative"
            }}
        >
            {transactions.length === 0 ? (
                <Box
                    padding="20px"
                    sx={{ display: "flex", justifyContent: "center" }}
                >
                    <Typography textAlign="center">
                        No hay transacciones
                    </Typography>
                </Box>
            ) : (
                <>
                    <Box
                        padding="15px"
                        sx={{
                            position: "sticky",
                            top: 0,
                            zIndex: "999",
                            bgcolor: "#12121200",
                            backdropFilter: "blur(10px)",
                            borderTopRightRadius: "5px",
                            borderTopLeftRadius: "5px"
                        }}
                    >
                        <TextField
                            fullWidth
                            label="Buscar"
                            autoComplete="off"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            helperText="Puedes buscar por categoria o monto"
                        />
                    </Box>
                    <Box>
                        <List>
                            {filteredTransactions.map(transaction => (
                                <TransactionItem
                                    key={transaction.id}
                                    transaction={transaction}
                                    categories={categories}
                                    setTransactionSelected={
                                        setTransactionSelected
                                    }
                                    getTransactions={getTransactions}
                                    setOpenModal={setOpenModal}
                                />
                            ))}
                        </List>
                    </Box>
                    <ModalCreateTransaction
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                        getTransactions={getTransactions}
                        typeTransaction={transactionSelected.type_transaction}
                        amountValue={transactionSelected.amount}
                        categoryValue={transactionSelected.category_id}
                        transactionId={transactionSelected.id}
                        typeModal="edit"
                    />
                </>
            )}
        </Box>
    )
}

export default ListTransactions
