import axios from "axios"

const api = new axios.create({
    baseURL: "http://localhost:8000/api/v1",
    headers: {
        "Content-Type": "application/json"
    },
    method: "POST"
})

export default api
