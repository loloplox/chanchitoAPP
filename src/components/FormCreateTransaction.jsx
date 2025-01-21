import { Autocomplete, Box, TextField } from "@mui/material"
import getCategoryIcon from "../util/getCategoryIcon.jsx"

function FormCreateTransaction({
    typeTransaction,
    categories,
    setCategory,
    category,
    setAmount,
    amount
}) {
    function searchCategoryId(categoryName, reason) {
        if (reason === "selectOption") {
            const category = categories.find(
                category => category.name === categoryName
            )
            setCategory(category.id)
        }
    }

    return (
        <>
            <TextField
                fullWidth
                label="Cantidad"
                margin="normal"
                variant="standard"
                type="number"
                autoComplete="off"
                required
                value={amount}
                onChange={e => {
                    setAmount(e.target.value)
                }}
                helperText={`Ingrese la cantidad a ${typeTransaction === 1 ? "gastar" : "ahorrar"}`}
            />
            <Autocomplete
                value={categories.find(cat => cat.id === category)?.name || ""}
                renderInput={params => (
                    <TextField
                        fullWidth
                        label="Categoria"
                        margin="normal"
                        variant="standard"
                        helperText="Seleccione una categoria"
                        required
                        {...params}
                    />
                )}
                options={categories.map(cat => cat.name)}
                onInputChange={(event, value, reason) => {
                    searchCategoryId(value, reason)
                }}
                getOptionLabel={option => option}
                renderOption={(props, option) => {
                    const { key, ...optionProps } = props
                    return (
                        <Box
                            key={key}
                            component="li"
                            sx={{ display: "flex", gap: "20px" }}
                            {...optionProps}
                            data-value={
                                categories.find(cat => cat.name === option)?.id
                            }
                        >
                            {getCategoryIcon(option)} {option}
                        </Box>
                    )
                }}
            />
        </>
    )
}

export default FormCreateTransaction
