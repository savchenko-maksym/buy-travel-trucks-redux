import { useSelector } from "react-redux";
import TrackItem from "../TrackItem/TrackItem.jsx";
import s from "./TrackList.module.css";

const TrackList = ({ tracks }) => {
  const loading = useSelector((state) => state.tracks.isLoading);
  const error = useSelector((state) => state.tracks.error);
  return (
    <div>
      <ul className={s.trackList}>
        {tracks.map((track) => (
          <li key={track.id}>
            <TrackItem data={track} />
          </li>
        ))}
      </ul>
      {loading && <p>loading...</p>}
      {error && <p>Server is error</p>}
    </div>
  );
};

export default TrackList;
