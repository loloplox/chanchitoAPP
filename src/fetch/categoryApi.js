import api from "./axios.js"

async function getCategoryByTypeTransaction(typeTransaction, token) {
    const { data, status } = await api(`/categories/${typeTransaction}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (!data.detail) {
        return { data, status }
    }
}

async function getCategories(token) {
    const { data, status } = await api("/categories", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (!data.detail) {
        return { data, status }
    }
}

const categoryApi = {
    getCategoryByTypeTransaction,
    getCategories
}

export default categoryApi
