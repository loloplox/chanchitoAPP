import {
    SpeedDial,
    SpeedDialAction,
    SpeedDialIcon,
    styled
} from "@mui/material"
import SavingsIcon from "@mui/icons-material/Savings"
import PaymentsIcon from "@mui/icons-material/Payments"

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
    position: "fixed",
    "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
        bottom: theme.spacing(4),
        right: theme.spacing(4)
    },
    "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
        top: theme.spacing(4),
        left: theme.spacing(2)
    }
}))

const actions = [
    {
        icon: <SavingsIcon />,
        name: "Ahorros",
        onClick: setTypeTransaction => setTypeTransaction(2)
    },
    {
        icon: <PaymentsIcon />,
        name: "Gastos",
        onClick: setTypeTransaction => setTypeTransaction(1)
    }
]

function ActionButtonFloat({ setOpenModal, setTypeTransaction }) {
    return (
        <StyledSpeedDial
            ariaLabel="SpeedDial playground example"
            icon={<SpeedDialIcon />}
            direction="up"
        >
            {actions.map(action => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={() => {
                        setOpenModal(true)
                        action.onClick(setTypeTransaction)
                    }}
                />
            ))}
        </StyledSpeedDial>
    )
}

export default ActionButtonFloat
