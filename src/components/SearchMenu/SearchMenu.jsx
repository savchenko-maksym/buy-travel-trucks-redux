import { Form, Field, Formik } from "formik";
import AcIcon from "../../assets/images/icons/ac.svg?react";
import BathroomIcon from "../../assets/images/icons/bathroom.svg?react";
import KitchenIcon from "../../assets/images/icons/kitchen.svg?react";
import TvIcon from "../../assets/images/icons/tv.svg?react";
import RadioIcon from "../../assets/images/icons/radio.svg?react";
import RefrigeratorIcon from "../../assets/images/icons/refrigeration.svg?react";
import MicrowaveIcon from "../../assets/images/icons/microwave.svg?react";
import GasIcon from "../../assets/images/icons/gas.svg?react";
import WaterIcon from "../../assets/images/icons/water.svg?react";
import Van from "../../assets/images/icons/van.svg?react";
import FullInt from "../../assets/images/icons/fullInt.svg?react";
import Alcove from "../../assets/images/icons/alcove.svg?react";
import { useState } from "react";
import s from "./SearchMenu.module.css";
import clsx from "clsx";
import { fetchAllLocations } from "../../redux/trucks/operations.js";

const EQUIPMENT_MAP = {
  AC: { icon: <AcIcon />, label: "AC" },
  bathroom: { icon: <BathroomIcon />, label: "Bathroom" },
  kitchen: { icon: <KitchenIcon />, label: "Kitchen" },
  TV: { icon: <TvIcon />, label: "TV" },
  radio: { icon: <RadioIcon />, label: "Radio" },
  refrigerator: { icon: <RefrigeratorIcon />, label: "Refrigerator" },
  microwave: { icon: <MicrowaveIcon />, label: "Microwave" },
  gas: { icon: <GasIcon />, label: "Gas" },
  water: { icon: <WaterIcon />, label: "Water" },
};

const VEHICLE_TYPES = {
  fullyIntegrated: { icon: <FullInt />, label: "Fully Integrated" },
  alcove: { icon: <Alcove />, label: "Alcove" },
  panelTruck: { icon: <Van />, label: "Van" },
};

const SearchMenu = ({ onSearch }) => {
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [selectedVehicleType, setSelectedVehicleType] = useState(null);
  const [savedLocation, setSavedLocation] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [allLocations, setAllLocations] = useState([]);
  const [loadingLocations, setloadingLocations] = useState(false);
  const [query, setQuery] = useState("");

  const handleLocationChange = async (e, setFieldValue) => {
    const value = e.target.value;
    setQuery(value);
    setFieldValue("location", value);

    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    if (allLocations.length === 0) {
      try {
        setloadingLocations(true);
        const locations = await fetchAllLocations();
        setAllLocations(locations);
      } catch (error) {
        console.error(error);
      } finally {
        setloadingLocations(false);
      }
    }

    const filtered = allLocations.filter((loc) =>
      loc.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(filtered);
  };

  const handleSuggestionClick = (loc, setFieldValue) => {
    setFieldValue("location", loc);
    setSavedLocation(loc);
    setSuggestions([]);
  };

  const toggleEquipment = (equip) => {
    setSelectedEquipment((prev) =>
      prev.includes(equip) ? prev.filter((e) => e !== equip) : [...prev, equip]
    );
  };

  const selectVehicleType = (type) => {
    setSelectedVehicleType((prev) => (prev === type ? null : type));
  };

  const initialValues = {
    location: "",
  };

  const handleSubmit = (values, options) => {
    const searchPayload = {
      location: values.location,
      equipment: selectedEquipment,
      form: selectedVehicleType,
    };

    onSearch(searchPayload);

    if (values.location.trim()) {
      setSavedLocation(values.location.trim());
    } else {
      setSavedLocation(null);
    }

    options.resetForm();
  };

  const handleRemoveLocation = () => {
    setSavedLocation(null);
    const searchPayload = {
      location: "",
      equipment: selectedEquipment,
      form: selectedVehicleType,
    };
    onSearch(searchPayload);
  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ setFieldValue }) => (
          <Form>
            <div className={s.locationWrap}>
              <label htmlFor="location" className={s.location}>
                Location
              </label>
              <div className={s.autocompleteWrap}>
                <Field name="location">
                  {({ field, form }) => (
                    <div className={s.inputWtapper}>
                      <input
                        id="location"
                        {...field}
                        placeholder="City"
                        className={s.locationInput}
                        autoComplete="off"
                        onChange={(e) =>
                          handleLocationChange(e, form.setFieldValue)
                        }
                      />
                      {loadingLocations && (
                        <span className={s.loader}>Loading...</span>
                      )}
                    </div>
                  )}
                </Field>

                {suggestions.length > 0 && (
                  <ul className={s.suggestionsList}>
                    {suggestions.map((loc) => (
                      <li
                        key={loc}
                        onClick={() =>
                          handleSuggestionClick(loc, setFieldValue)
                        }
                      >
                        {loc}
                      </li>
                    ))}
                  </ul>
                )}

                {!loadingLocations &&
                  query.length >= 2 &&
                  suggestions.length === 0 &&
                  !savedLocation && (
                    <p className={s.noResults}>No cities found</p>
                  )}
              </div>

              {savedLocation && (
                <div className={s.selectedLocation}>
                  <span className={s.badge}>
                    {savedLocation.charAt(0).toUpperCase() +
                      savedLocation.slice(1)}
                  </span>
                  <button
                    className={s.removeBtn}
                    type="button"
                    onClick={handleRemoveLocation}
                  >
                    x
                  </button>
                </div>
              )}
            </div>
            <p className={s.filters}>Filters</p>
            <div className={s.form}>
              <p className={s.typesNames}>Vehicle equipment</p>
              <div className={s.equipmentsWrap}>
                {Object.entries(EQUIPMENT_MAP).map(([key, { icon, label }]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggleEquipment(key)}
                    className={clsx(s.equipments, {
                      [s.selected]: selectedEquipment.includes(key),
                    })}
                  >
                    {icon}
                    <span>{label}</span>
                  </button>
                ))}
              </div>
              <p className={s.typesNames}>Vehicle type</p>
              <div className={s.vehiclesWrap}>
                {Object.entries(VEHICLE_TYPES).map(([key, { icon, label }]) => (
                  <button
                    type="button"
                    key={key}
                    onClick={() => selectVehicleType(key)}
                    className={clsx(s.vehicles, {
                      [s.selected]: selectedVehicleType === key,
                    })}
                  >
                    {icon}
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className={s.btnSearch}>
              Search
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default SearchMenu;
