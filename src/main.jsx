import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import { BrowserRouter } from "react-router"
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import { SnackbarProvider } from "notistack"

const darkTheme = createTheme({
    palette: {
        mode: "dark"
    }
})

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <ThemeProvider theme={darkTheme}>
            <SnackbarProvider
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                maxSnack={3}
            />
            <CssBaseline />
            <App />
        </ThemeProvider>
    </BrowserRouter>
)
