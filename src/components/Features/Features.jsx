import { useOutletContext } from "react-router-dom";
import s from "./Features.module.css";
import Forms from "../Forms/Forms.jsx";
import OptionsOneTrack from "../OptionsOneTrack/OptionsOneTrack.jsx";

const Features = () => {
  const { selectedTrack } = useOutletContext();

  return (
    <div className={s.featuresAndFormWrap}>
      <div className={s.wrapDetails}>
        <OptionsOneTrack />
        <div>
          <p className={s.details}>Vehicle Details</p>
          <ul className={s.list}>
            <li className={s.item}>
              <span>Form</span>
              <span>{selectedTrack.form}</span>
            </li>
            <li className={s.item}>
              <span>Length</span>
              <span>{selectedTrack.length}</span>
            </li>
            <li className={s.item}>
              <span>Width</span>
              <span>{selectedTrack.width}</span>
            </li>
            <li className={s.item}>
              <span>Height</span>
              <span>{selectedTrack.height}</span>
            </li>
            <li className={s.item}>
              <span>Tank</span>
              <span> {selectedTrack.tank}</span>
            </li>
            <li className={s.item}>
              <span>Consumption</span>
              <span>{selectedTrack.consumption}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className={s.form}>
        <Forms />
      </div>
    </div>
  );
};

export default Features;
