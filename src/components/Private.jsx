import { useEffect } from "react"
import userStore from "../store/userStore.js"
import { useNavigate } from "react-router"
import userApi from "../fetch/userApi.js"
import { enqueueSnackbar } from "notistack"

function Private({ children }) {
    const { user, logout } = userStore()
    const navigate = useNavigate()

    async function validateToken() {
        const { data, status } = await userApi
            .validate(user.token)
            .catch(({ response }) => {
                const { data } = response

                if (data.detail) {
                    enqueueSnackbar(data.detail, {
                        variant: "error",
                        autoHideDuration: 3000
                    })
                    enqueueSnackbar("Sera redirigido al login", {
                        variant: "info",
                        autoHideDuration: 3000
                    })

                    logout()

                    setTimeout(() => {
                        navigate("/authenticate/login")
                    }, 3000)
                }
            })

        if (!data) {
            enqueueSnackbar("El token no es valido", {
                variant: "error",
                autoHideDuration: 3000
            })
            enqueueSnackbar("Sera redirigido al login", {
                variant: "info",
                autoHideDuration: 3000
            })

            logout()

            setTimeout(() => {
                navigate("/authenticate/login")
            }, 3000)
        }
    }

    useEffect(() => {
        if (!user.token) {
            navigate("/authenticate/login")
        } else {
            validateToken()
        }
    }, [user])

    return children
}

export default Private
