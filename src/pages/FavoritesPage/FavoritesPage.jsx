import { useSelector } from "react-redux";
import Container from "../../components/Container/Container.jsx";
import TrackList from "../../components/TrackList/TrackList.jsx";
import s from "./FavoritesPage.module.css";

const FavoritesPage = () => {
  const favorites = useSelector((state) => state.tracks.favorites);
  return (
    <div>
      <Container>
        <div className={s.list}>
          {favorites.length ? (
            <TrackList tracks={favorites} />
          ) : (
            <p>No favorites tracks</p>
          )}
        </div>
      </Container>
    </div>
  );
};
export default FavoritesPage;
