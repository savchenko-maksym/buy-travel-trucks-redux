import { NavLink, Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchTrackById } from "../../redux/trucks/operations.js";
import s from "./TrackPage.module.css";
import StarIcon from "../../assets/images/icons/star.svg?react";
import LocationIcon from "../../assets/images/icons/location.svg?react";
import Gallery from "../../components/Gallery/Gallery.jsx";
import Container from "../../components/Container/Container.jsx";
import clsx from "clsx";

const TrackPage = () => {
  const { id } = useParams();
  const [track, setTrack] = useState(null);
  const setActiveClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
  };

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

  if (!track) {
    return <p>Loading...</p>;
  }

  const { name, price, rating, location, description, gallery, reviews } =
    track;

  return (
    <div>
      <Container>
        <div>
          <div className={s.header}>
            <h2 className={s.titleName}>{name}</h2>
            <div className={s.ratingAndLocation}>
              <p className={s.rating}>
                <StarIcon />
                {rating}({reviews?.length || 0} Reviews)
              </p>
              <a
                className={s.location}
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  location
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LocationIcon />
                {location}
              </a>
            </div>
            <span className={s.price}>€{price}.00</span>
          </div>

          <Gallery gallery={gallery} />

          <p className={s.description}>
            {description.length > 1700
              ? description.slice(0, 1700) + "..."
              : description}
          </p>
        </div>
        <nav className={s.featuresAndReviews}>
          <NavLink to="features" className={setActiveClass}>
            Features
          </NavLink>
          <NavLink to="reviews" className={setActiveClass}>
            Reviews
          </NavLink>
        </nav>
        <div>
          <Outlet context={{ track }} />
        </div>
      </Container>
    </div>
  );
};

export default TrackPage;
