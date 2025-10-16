import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTrackById } from "../../redux/trucks/operations.js";
import s from "./OptionsOneTrack.module.css";
import TransmissionIcon from "../../assets/images/icons/automatic.svg?react";
import EngineIcon from "../../assets/images/icons/petrol.svg?react";
import AcIcon from "../../assets/images/icons/ac.svg?react";
import BathroomIcon from "../../assets/images/icons/bathroom.svg?react";
import KitchenIcon from "../../assets/images/icons/kitchen.svg?react";
import TvIcon from "../../assets/images/icons/tv.svg?react";
import RadioIcon from "../../assets/images/icons/radio.svg?react";
import RefrigeratorIcon from "../../assets/images/icons/refrigeration.svg?react";
import MicrowaveIcon from "../../assets/images/icons/microwave.svg?react";
import GasIcon from "../../assets/images/icons/gas.svg?react";
import WaterIcon from "../../assets/images/icons/water.svg?react";

const OptionsOneTrack = () => {
  const { id } = useParams();
  const [track, setTrack] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const track = await fetchTrackById(id);
        setTrack(track);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [id]);

  const FEATURES_MAP = {
    transmission: { icon: <TransmissionIcon />, label: (val) => val },
    engine: { icon: <EngineIcon />, label: (val) => val },
    AC: { icon: <AcIcon />, label: () => "AC" },
    bathroom: { icon: <BathroomIcon />, label: () => "Bathroom" },
    kitchen: { icon: <KitchenIcon />, label: () => "Kitchen" },
    TV: { icon: <TvIcon />, label: () => "TV" },
    radio: { icon: <RadioIcon />, label: () => "Radio" },
    refrigerator: { icon: <RefrigeratorIcon />, label: () => "Refrigerator" },
    microwave: { icon: <MicrowaveIcon />, label: () => "Microwave" },
    gas: { icon: <GasIcon />, label: () => "Gas" },
    water: { icon: <WaterIcon />, label: () => "Water" },
  };

  if (!track) {
    return <p>Loading...</p>; // або просто null
  }

  return (
    <div className={s.features}>
      {Object.entries(FEATURES_MAP).map(([key, { icon, label }]) => {
        const value = track[key]; // беремо значення з пропів data
        if (!value) return null; // якщо false → не рендеримо

        return (
          <div key={key} className={s.featureItem}>
            {icon}
            <span>{typeof label === "function" ? label(value) : label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default OptionsOneTrack;
