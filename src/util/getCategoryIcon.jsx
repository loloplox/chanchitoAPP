import StoreIcon from "@mui/icons-material/Store"
import RestaurantIcon from "@mui/icons-material/Restaurant"
import LocalCafeIcon from "@mui/icons-material/LocalCafe"
import HomeIcon from "@mui/icons-material/Home"
import WaterDropIcon from "@mui/icons-material/WaterDrop"
import PhonelinkRingIcon from "@mui/icons-material/PhonelinkRing"
import HandymanIcon from "@mui/icons-material/Handyman"
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation"
import CommuteIcon from "@mui/icons-material/Commute"
import LocalParkingIcon from "@mui/icons-material/LocalParking"
import LocalHospitalIcon from "@mui/icons-material/LocalHospital"
import MedicationIcon from "@mui/icons-material/Medication"
import HealingIcon from "@mui/icons-material/Healing"
import EmergencyIcon from "@mui/icons-material/Emergency"
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter"
import TheatersIcon from "@mui/icons-material/Theaters"
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset"
import SubscriptionsIcon from "@mui/icons-material/Subscriptions"
import TravelExploreIcon from "@mui/icons-material/TravelExplore"
import PlayLessonIcon from "@mui/icons-material/PlayLesson"
import BookIcon from "@mui/icons-material/Book"
import SchoolIcon from "@mui/icons-material/School"
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly"
import CheckroomIcon from "@mui/icons-material/Checkroom"
import AccountBalanceIcon from "@mui/icons-material/AccountBalance"
import BalanceIcon from "@mui/icons-material/Balance"
import CreditCardIcon from "@mui/icons-material/CreditCard"
import PetsIcon from "@mui/icons-material/Pets"
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard"
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism"
import PriorityHighIcon from "@mui/icons-material/PriorityHigh"
import TireRepairIcon from "@mui/icons-material/TireRepair"
import CarCrashIcon from "@mui/icons-material/CarCrash"
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService"

function getCategoryIcon(category) {
    switch (category) {
        case "Supermercado":
            return <StoreIcon />
        case "Restaurantes":
            return <RestaurantIcon />
        case "Cafeterías y snacks":
            return <LocalCafeIcon />
        case "Alquiler":
            return <HomeIcon />
        case "Hipoteca":
            return <HomeIcon />
        case "Servicios básicos":
            return <WaterDropIcon />
        case "Internet y telefonía":
            return <PhonelinkRingIcon />
        case "Reparaciones y mantenimiento":
            return <HandymanIcon />
        case "Combustible":
            return <LocalGasStationIcon />
        case "Transporte público":
            return <CommuteIcon />
        case "Peajes y estacionamiento":
            return <LocalParkingIcon />
        case "Seguro médico":
            return <LocalHospitalIcon />
        case "Medicamentos":
            return <MedicationIcon />
        case "Consultas médicas":
            return <HealingIcon />
        case "Tratamientos especializados":
            return <EmergencyIcon />
        case "Deportes y gimnasio":
            return <FitnessCenterIcon />
        case "Cine, teatro y conciertos":
            return <TheatersIcon />
        case "Videojuegos":
            return <VideogameAssetIcon />
        case "Suscripciones digitales":
            return <SubscriptionsIcon />
        case "Suscripciones varias":
            return <SubscriptionsIcon />
        case "Viajes y escapadas":
            return <TravelExploreIcon />
        case "Cursos y formación":
            return <PlayLessonIcon />
        case "Material educativo":
            return <BookIcon />
        case "Colegiaturas":
            return <SchoolIcon />
        case "Cuidado de hijos":
            return <ChildFriendlyIcon />
        case "Ropa":
            return <CheckroomIcon />
        case "Calzado":
            return <CheckroomIcon />
        case "Accesorios":
            return <CheckroomIcon />
        case "Deudas y préstamos":
            return <AccountBalanceIcon />
        case "Impuestos":
            return <BalanceIcon />
        case "Comisiones bancarias":
            return <CreditCardIcon />
        case "Mascotas":
            return <PetsIcon />
        case "Regalos y celebraciones":
            return <CardGiftcardIcon />
        case "Donaciones":
            return <VolunteerActivismIcon />
        case "Imprevistos":
            return <PriorityHighIcon />
        case "Mantenimiento del vehículo":
            return <TireRepairIcon />
        case "Seguros de vehículo":
            return <CarCrashIcon />
        case "Herramientas y utensilios":
            return <HomeRepairServiceIcon />
    }
}

export default getCategoryIcon
