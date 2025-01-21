import api from "./axios.js"

async function register(userData) {
    const { data, status } = await api({
        method: "post",
        url: "/user/register",
        data: userData
    })

    if (!data.detail) {
        return { data, status }
    }
}

async function login(userData) {
    const { data, status } = await api({
        method: "post",
        url: "/user/login",
        data: new URLSearchParams(userData),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })

    if (!data.detail) {
        return { data, status }
    }
}

async function validate(token) {
    const { data, status } = await api({
        method: "post",
        url: "/user/validate",
        data: { access_token: token }
    })

    if (!data.detail) {
        return { data, status }
    }
}

const userApi = {
    register,
    login,
    validate
}

export default userApi
