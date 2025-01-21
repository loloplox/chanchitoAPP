import {
    Avatar,
    ButtonGroup,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemText
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import { grey } from "@mui/material/colors"
import { useEffect, useState } from "react"
import transactionApi from "../fetch/transactionApi.js"
import userStore from "../store/userStore.js"
import { enqueueSnackbar } from "notistack"

function TransactionItem({
    transaction,
    categories,
    setOpenModal,
    setTransactionSelected,
    getTransactions
}) {
    const { user } = userStore()
    const [dateFormatted, setDateFormatted] = useState("")
    const [category, setCategory] = useState({})

    function getCategory() {
        const categoryFound = categories.find(
            category => category.id === transaction.category_id
        )

        setCategory(categoryFound)
    }

    function handleClickEdit() {
        setTransactionSelected(transaction)
        setOpenModal(true)
    }

    async function handleClickDelete() {
        const { data, status } = await transactionApi.deleteTransaction(
            transaction.id,
            user.token
        )

        if (status !== 200) {
            enqueueSnackbar("Error al eliminar la transacción", {
                variant: "error",
                autoHideDuration: 3000
            })
            return
        } else {
            enqueueSnackbar("Transacción eliminada", {
                variant: "success",
                autoHideDuration: 3000
            })
            getTransactions()
        }
    }

    useEffect(() => {
        const date = new Date(transaction["create_date"])
        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        const hours = date.getHours()
        const minutes = date.getMinutes()
        const seconds =
            date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()

        setDateFormatted(
            `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`
        )
    }, [transaction])

    useEffect(() => {
        getCategory()
    }, [categories])

    return (
        <ListItem
            key={transaction.id}
            secondaryAction={
                <ButtonGroup>
                    <IconButton onClick={handleClickEdit}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={handleClickDelete}>
                        <DeleteIcon />
                    </IconButton>
                </ButtonGroup>
            }
        >
            <ListItemAvatar>
                <Avatar sx={{ color: "white", bgcolor: grey["900"] }}>
                    {transaction["type_transaction"] === 1 && <RemoveIcon />}
                    {transaction["type_transaction"] === 2 && <AddIcon />}
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={category?.name}
                secondary={`S/. ${transaction.amount} - ${dateFormatted}`}
            />
        </ListItem>
    )
}

export default TransactionItem
