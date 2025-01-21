import api from "./axios.js"

async function getTransactions(userId, token) {
    const { data, status } = await api(`/transactions/${userId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (!data.detail) {
        return { data, status }
    }
}

async function createTransaction(body, token, user_id) {
    const { data, status } = await api(`/transactions/${user_id}`, {
        method: "POST",
        data: JSON.stringify({
            amount: body.amount,
            category_id: body.categoryId,
            type_transaction: body.typeTransaction
        }),
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })

    if (!data.detail) {
        return { data, status }
    }
}

function updateTransaction(body, transaction_id, token) {
    return api(`/transactions/${transaction_id}`, {
        method: "PUT",
        data: JSON.stringify({
            amount: body.amount,
            category_id: body.categoryId,
            type_transaction: body.typeTransaction
        }),
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
}

async function deleteTransaction(transaction_id, token) {
    const { data, status } = await api(`/transactions/${transaction_id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (data) {
        return { data, status }
    }
}

const transactionApi = {
    getTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction
}

export default transactionApi
