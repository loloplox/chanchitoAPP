import {
    Box,
    Button,
    Container,
    Link as LinkMUI,
    TextField,
    Typography
} from "@mui/material"
import { Link, useNavigate } from "react-router"
import { useEffect, useState } from "react"
import { enqueueSnackbar } from "notistack"
import userApi from "../../fetch/userApi.js"
import userStore from "../../store/userStore.js"

function Login() {
    const [error, setError] = useState({
        username: false,
        password: false
    })
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const { setUser, user } = userStore()
    const navigate = useNavigate()

    async function handleClick() {
        setError({ ...error, password: false, username: false })
        setLoading(true)

        if (username === "" || password === "") {
            setError({
                username: true,
                password: true
            })

            return enqueueSnackbar("Todos los campos son obligatorios", {
                variant: "error",
                autoHideDuration: 3000
            })
        }

        const { data, status } = await userApi
            .login({ username, password })
            .catch(({ response }) => {
                const { data } = response

                if (data.detail) {
                    enqueueSnackbar(data.detail, {
                        variant: "error",
                        autoHideDuration: 3000
                    })
                }

                setLoading(false)
                setError({ ...error, password: true, username: true })
            })

        if (status === 200) {
            enqueueSnackbar("Inicio de sesión exitoso", {
                variant: "success",
                autoHideDuration: 3000
            })
            enqueueSnackbar("Seras redirigido al Inicio", {
                variant: "info",
                autoHideDuration: 3000
            })

            setUser({
                username: data["username"],
                token: data["access_token"],
                userId: data["user_id"]
            })

            setTimeout(() => {
                navigate("/")
            }, 3000)
        }

        setLoading(false)
    }

    useEffect(() => {
        if (user.token) {
            navigate("/")
        }
    }, [])

    return (
        <Container
            sx={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                height: "100vh"
            }}
        >
            <Box
                component="form"
                width={{ sm: "100%", md: "50%" }}
                margin="auto"
                padding="25px"
                sx={{ border: "1px solid white", borderRadius: "5px" }}
            >
                <Typography
                    variant="h2"
                    textAlign="center"
                    paddingBottom="20px"
                >
                    Inicio de sesión
                </Typography>

                <TextField
                    fullWidth
                    label="Usuario"
                    margin="normal"
                    variant="standard"
                    helperText="Ingrese su nombre de usuario"
                    error={error.username}
                    value={username}
                    onChange={e => {
                        setUsername(e.target.value)
                    }}
                />
                <TextField
                    fullWidth
                    label="Contraseña"
                    type="password"
                    margin="normal"
                    variant="standard"
                    helperText="Ingrese su contraseña"
                    error={error.password}
                    value={password}
                    onChange={e => {
                        setPassword(e.target.value)
                    }}
                />

                <Typography marginTop="10px">
                    ¿Aun no tienes una cuenta?{" "}
                    <Link to="/authenticate/register">
                        <LinkMUI component="span">Registrarme</LinkMUI>
                    </Link>
                </Typography>

                <Button
                    variant="outlined"
                    sx={{ marginTop: "25px" }}
                    fullWidth
                    loading={loading}
                    disabled={loading}
                    onClick={handleClick}
                    type="submit"
                >
                    Iniciar sesion
                </Button>
            </Box>
        </Container>
    )
}

export default Login
