import axios from "axios"

const api = new axios.create({
    baseURL: "https://chanchitoapi.onrender.com/api/v1",
    headers: {
        "Content-Type": "application/json"
    },
    method: "POST"
})

export default api
