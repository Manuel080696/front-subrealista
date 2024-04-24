import AirOutlinedIcon from "@mui/icons-material/AirOutlined";
import ElevatorOutlinedIcon from "@mui/icons-material/ElevatorOutlined";
import BedroomParentOutlinedIcon from "@mui/icons-material/BedroomParentOutlined";
import KitchenOutlinedIcon from "@mui/icons-material/KitchenOutlined";
import TerrainOutlinedIcon from "@mui/icons-material/TerrainOutlined";
import BeachAccessOutlinedIcon from "@mui/icons-material/BeachAccessOutlined";
import SurroundSoundOutlinedIcon from "@mui/icons-material/SurroundSoundOutlined";
import BreakfastDiningOutlinedIcon from "@mui/icons-material/BreakfastDiningOutlined";
import LocalLaundryServiceOutlinedIcon from "@mui/icons-material/LocalLaundryServiceOutlined";
import WifiOutlinedIcon from "@mui/icons-material/WifiOutlined";
import AcUnitOutlinedIcon from "@mui/icons-material/AcUnitOutlined";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";

export function Services({ services }) {
  return (
    services && (
      <ul className="flex flex-col gap-5">
        {services.fully_equipped ? (
          <li className="flex flex-row gap-2">
            <BedroomParentOutlinedIcon />
            <p>Totalmente equipado</p>
          </li>
        ) : null}
        {services.ac ? (
          <li className="flex flex-row gap-2">
            <AcUnitOutlinedIcon />
            <p>Aire acondicionado</p>
          </li>
        ) : null}
        {services.elevator ? (
          <li className="flex flex-row gap-2">
            <ElevatorOutlinedIcon />
            <p>Ascensor</p>
          </li>
        ) : null}
        {services.first_kit_aid ? (
          <li className="flex flex-row gap-2">
            <MedicalServicesOutlinedIcon />
            <p>Kit de primeros auxilios</p>
          </li>
        ) : null}
        {services.freezer ? (
          <li className="flex flex-row gap-2">
            <KitchenOutlinedIcon />
            <p>Congelador</p>
          </li>
        ) : null}
        {services.hairdryer ? (
          <li className="flex flex-row gap-2">
            <AirOutlinedIcon />
            <p>Secador de pelo</p>
          </li>
        ) : null}
        {services.near_beach ? (
          <li className="flex flex-row gap-2">
            <BeachAccessOutlinedIcon />
            <p>Cerca de la playa</p>
          </li>
        ) : null}
        {services.near_mountain ? (
          <li className="flex flex-row gap-2">
            <TerrainOutlinedIcon />
            <p>Cerca de la montaña</p>
          </li>
        ) : null}
        {services.refrigerator ? (
          <li className="flex flex-row gap-2">
            <KitchenOutlinedIcon />
            <p>Nevera</p>
          </li>
        ) : null}
        {services.smoke_detector ? (
          <li className="flex flex-row gap-2">
            <SurroundSoundOutlinedIcon />
            <p>Detector de humos</p>
          </li>
        ) : null}
        {services.toaster ? (
          <li className="flex flex-row gap-2">
            <BreakfastDiningOutlinedIcon />
            <p>Tostadora</p>
          </li>
        ) : null}
        {services.washing_machine ? (
          <li className="flex flex-row gap-2">
            <LocalLaundryServiceOutlinedIcon />
            <p>Lavadora</p>
          </li>
        ) : null}
        {services.wifi ? (
          <li className="flex flex-row gap-2">
            <WifiOutlinedIcon />
            <p>Wi-fi</p>
          </li>
        ) : null}
      </ul>
    )
  );
}
