import { Box, Typography } from "@mui/material"

function TransactionCard({ title, content, icon }) {
    return (
        <Box
            width="25%"
            height="100%"
            sx={{
                border: "1px solid white",
                borderRadius: "5px"
            }}
            padding="15px"
        >
            <Box
                height="50%"
                width="100%"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Typography variant="h6">{title}</Typography>
            </Box>
            <Box
                height="50%"
                width="100%"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px"
                }}
            >
                <Typography fontSize="20px">{content}</Typography>
                {icon}
            </Box>
        </Box>
    )
}

export default TransactionCard
