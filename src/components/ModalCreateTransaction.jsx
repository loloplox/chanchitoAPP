import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material"
import { useEffect, useState } from "react"
import categoryApi from "../fetch/categoryApi.js"
import { enqueueSnackbar } from "notistack"
import userStore from "../store/userStore.js"
import FormCreateTransaction from "./FormCreateTransaction.jsx"
import transactionApi from "../fetch/transactionApi.js"

function ModalCreateTransaction({
    openModal,
    setOpenModal,
    getTransactions,
    typeTransaction,
    amountValue = 0,
    categoryValue = undefined,
    transactionId = undefined,
    typeModal = "create"
}) {
    const [categories, setCategories] = useState([])
    const { user } = userStore()
    const [amount, setAmount] = useState(amountValue)
    const [category, setCategory] = useState(categoryValue)

    function handleClose() {
        setOpenModal(false)
        setCategory(undefined)
        setAmount(0)
    }

    async function getCategories() {
        const { data, status } = await categoryApi.getCategoryByTypeTransaction(
            typeTransaction,
            user.token
        )

        if (status !== 200) {
            enqueueSnackbar("Error al obtener las categorias", {
                variant: "error",
                autoHideDuration: 3000
            })
            return
        }

        setCategories(data)
    }

    async function handleSubmit(e) {
        e.preventDefault()

        if (amount > 0 && category) {
            if (typeModal === "edit") {
                const { data, status } = await transactionApi.updateTransaction(
                    {
                        amount,
                        categoryId: category,
                        typeTransaction
                    },
                    transactionId,
                    user.token
                )

                if (status === 200) {
                    enqueueSnackbar("Transaccion creada", {
                        variant: "success",
                        autoHideDuration: 3000
                    })
                    setOpenModal(false)
                    getTransactions()
                    setAmount(0)
                    setCategory(undefined)
                }
            } else {
                const { data, status } = await transactionApi.createTransaction(
                    {
                        amount,
                        categoryId: category,
                        typeTransaction
                    },
                    user.token,
                    user.userId
                )

                if (status === 201) {
                    enqueueSnackbar("Transaccion creada", {
                        variant: "success",
                        autoHideDuration: 3000
                    })
                    setOpenModal(false)
                    getTransactions()
                    setAmount(0)
                    setCategory(undefined)
                }
            }
        } else {
            enqueueSnackbar("Todos los campos son obligatorios", {
                variant: "error",
                autoHideDuration: 3000
            })
        }
    }

    useEffect(() => {
        if (openModal) {
            getCategories()
        }
    }, [typeTransaction])

    useEffect(() => {
        setAmount(amountValue)
        setCategory(categoryValue)
    }, [amountValue, categoryValue, categories, openModal])

    return (
        <Dialog
            open={openModal}
            onClose={handleClose}
            PaperProps={{
                component: "form",
                onSubmit: handleSubmit
            }}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>
                {typeTransaction === 1 ? "Gastar" : "Ahorrar"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Este formulario sirve para crear una transaccion de tipo{" "}
                    {typeTransaction === 1 ? "gasto" : "ahorro"}
                </DialogContentText>
                <FormCreateTransaction
                    typeTransaction={typeTransaction}
                    categories={categories}
                    setCategory={setCategory}
                    category={category}
                    setAmount={setAmount}
                    amount={amount}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">
                    {typeModal === "create" ? "Enviar" : "Editar"}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ModalCreateTransaction
