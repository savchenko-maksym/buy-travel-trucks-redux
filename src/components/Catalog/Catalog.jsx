import { useEffect, useState } from "react";
import { fetchTracks } from "../../redux/trucks/operations.js";
import TrackList from "../TrackList/TrackList.jsx";
import Container from "../Container/Container.jsx";
import s from "./Catalog.module.css";
import SearchMenu from "../SearchMenu/SearchMenu.jsx";
import { useDispatch, useSelector } from "react-redux";

const Catalog = () => {
  // const [tracks, setTracks] = useState([]);
  // const [visibleTracks, setVisibleTracks] = useState([]);
  // const [filters, setFilters] = useState({});
  const [itemsToShow, setItemsToShow] = useState(5);

  const tracks = useSelector((state) => state.tracks.tracks);
  console.log(tracks);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTracks());
  }, [dispatch]);

  const increment = 5;

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const data = await fetchTracks(filters);
  //       setTracks(data);
  //       setVisibleTracks(data.slice(0, itemsToShow));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getData();
  // }, [filters, itemsToShow]);

  // const handleSearch = (newFilters) => {
  //   setFilters(newFilters);
  //   setItemsToShow(increment);
  // };

  const handleLoadMore = () => {
    const newItemsToShow = itemsToShow + increment;
    setItemsToShow(newItemsToShow);
  };

  return (
    <div>
      <Container>
        <div className={s.mainWrap}>
          <div className={s.menuWrap}>
            {/* <SearchMenu onSearch={handleSearch} /> */}
          </div>
          <div className={s.trackList}>
            <TrackList tracks={tracks} />
            {/* {visibleTracks.length < tracks.length && (
              <div className={s.loadMoreWrap}>
                <button className={s.loadMore} onClick={handleLoadMore}>
                  Load More
                </button>
              </div>
            )} */}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Catalog;
