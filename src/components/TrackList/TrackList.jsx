import TrackItem from "../TrackItem/TrackItem.jsx";
import s from "./TrackList.module.css";

const TrackList = ({ tracks }) => {
  return (
    <div>
      <ul className={s.trackList}>
        {tracks.map((track) => (
          <li key={track.id}>
            <TrackItem data={track} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrackList;
