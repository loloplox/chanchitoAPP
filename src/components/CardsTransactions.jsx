import { Box } from "@mui/material"
import SavingsIcon from "@mui/icons-material/Savings"
import ReceiptIcon from "@mui/icons-material/Receipt"
import TransactionCard from "./TransactionCard.jsx"
import PaymentsIcon from "@mui/icons-material/Payments"
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet"
import { useEffect, useState } from "react"

function CardsTransactions({ transactions }) {
    const [savings, setSavings] = useState(0.0)
    const [bills, setBills] = useState(0.0)
    const [transactionsThisMonth, setTransactionsThisMonth] = useState(0)
    const [totalBalanceBrute, setTotalBalanceBrute] = useState(0)

    function calculateSavings() {
        let savings = 0

        transactions.forEach(transaction => {
            if (transaction["type_transaction"] === 2) {
                savings += transaction.amount
            }
        })

        setSavings(savings)
    }

    function calculateBills() {
        let bills = 0

        transactions.forEach(transaction => {
            if (transaction["type_transaction"] === 1) {
                bills += transaction.amount
            }
        })

        setBills(bills)
    }

    function calculateTotalBalanceBrute() {
        let totalBalance = 0

        transactions.forEach(transaction => {
            totalBalance += transaction.amount
        })

        setTotalBalanceBrute(totalBalance)
    }

    function calculateTransactionsThisMonth() {
        const currentMonth = new Date().getMonth()
        let transactionsThisMonth = 0

        transactions.forEach(transaction => {
            const month = new Date(transaction["create_date"]).getMonth()

            if (month === currentMonth) {
                transactionsThisMonth++
            }
        })

        setTransactionsThisMonth(transactionsThisMonth)
    }

    useEffect(() => {
        calculateSavings()
        calculateBills()
        calculateTotalBalanceBrute()
        calculateTransactionsThisMonth()
    }, [transactions])

    return (
        <Box
            marginY="25px"
            width="100%"
            height="150px"
            sx={{ display: "flex", gap: "20px" }}
        >
            <TransactionCard
                title="Ahorros este mes"
                content={"S/. " + savings.toFixed(2)}
                icon={<SavingsIcon fontSize="large" />}
            />

            <TransactionCard
                title="Gastos este mes"
                content={"S/. " + bills.toFixed(2)}
                icon={<PaymentsIcon fontSize="large" />}
            />

            <TransactionCard
                title="Transacciones este mes"
                content={transactionsThisMonth}
                icon={<ReceiptIcon fontSize="large" />}
            />

            <TransactionCard
                title="Ingresos brutos"
                content={"S/. " + totalBalanceBrute.toFixed(2)}
                icon={<AccountBalanceWalletIcon fontSize="large" />}
            />
        </Box>
    )
}

export default CardsTransactions
