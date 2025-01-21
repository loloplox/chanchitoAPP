import {
    Box,
    Button,
    Container,
    Link as LinkMUI,
    TextField,
    Typography
} from "@mui/material"
import { useEffect, useState } from "react"
import { enqueueSnackbar } from "notistack"
import userApi from "../../fetch/userApi.js"
import { Link, useNavigate } from "react-router"
import userStore from "../../store/userStore.js"

function Register() {
    const [error, setError] = useState({
        username: false,
        password: false,
        repeatPassword: false
    })
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { user } = userStore()

    async function handleClick() {
        setError({
            ...error,
            username: false,
            password: false,
            repeatPassword: false
        })

        if (username === "" || password === "" || repeatPassword === "") {
            setError({
                ...error,
                username: true,
                password: true,
                repeatPassword: true
            })
            return enqueueSnackbar("Todos los campos son obligatorios", {
                variant: "error",
                autoHideDuration: 3000
            })
        }

        if (password !== repeatPassword) {
            setError({ ...error, repeatPassword: true })
            return enqueueSnackbar("Las contraseñas no coinciden", {
                variant: "error",
                autoHideDuration: 3000
            })
        }

        setLoading(true)

        const { data, status } = await userApi
            .register({ username, password })
            .catch(({ response }) => {
                const { data } = response
                enqueueSnackbar(data.detail, {
                    variant: "error",
                    autoHideDuration: 3000
                })
            })

        console.log(status)

        if (status === 201) {
            enqueueSnackbar("Creaste un usuario exitosamente", {
                variant: "success",
                autoHideDuration: 3000
            })

            enqueueSnackbar("Seras redirigido al login", {
                variant: "info",
                autoHideDuration: 3000
            })

            setTimeout(() => {
                navigate("/authenticate/login")
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
                    Creación de cuenta
                </Typography>

                <TextField
                    fullWidth
                    label="Usuario"
                    margin="normal"
                    variant="standard"
                    helperText="Ingrese un nombre de usuario"
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
                    helperText="Ingrese una contraseña"
                    error={error.password}
                    value={password}
                    onChange={e => {
                        setPassword(e.target.value)
                    }}
                />
                <TextField
                    fullWidth
                    label="Repita la contraseña"
                    type="password"
                    margin="normal"
                    variant="standard"
                    helperText="Ingrese una contraseña"
                    error={error.repeatPassword}
                    value={repeatPassword}
                    onChange={e => {
                        setRepeatPassword(e.target.value)
                    }}
                />

                <Typography marginTop="10px">
                    ¿Ya tienes una cuenta?{" "}
                    <Link to="/authenticate/login">
                        <LinkMUI component="span">Inciar Sesion</LinkMUI>
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
                    Registrar
                </Button>
            </Box>
        </Container>
    )
}

export default Register
