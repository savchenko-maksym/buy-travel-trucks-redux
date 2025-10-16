import Container from "../../components/Container/Container.jsx";
import { useFavorites } from "../../components/FavoritesContext/FavoritesContext.jsx";
import TrackList from "../../components/TrackList/TrackList.jsx";
import s from "./FavoritesPage.module.css";

const FavoritesPage = () => {
  const { favorites } = useFavorites();

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
