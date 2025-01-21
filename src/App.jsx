import { Route, Routes } from "react-router"
import Login from "./routes/authenticate/Login.jsx"
import Register from "./routes/authenticate/Register.jsx"
import { Typography } from "@mui/material"
import Home from "./routes/Home.jsx"
import Private from "./components/Private.jsx"

function App() {
    return (
        <Routes>
            <Route path="authenticate">
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Route>

            <Route
                path="/"
                element={
                    <Private>
                        <Home />
                    </Private>
                }
            />

            <Route path="*" element={<Typography>Error 404</Typography>} />
        </Routes>
    )
}

export default App
