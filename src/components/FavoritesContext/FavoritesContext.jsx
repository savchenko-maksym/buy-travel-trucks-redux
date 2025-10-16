import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext();
export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (error) {
      console.log(error);
    }
  }, [favorites]);

  const toggleFavorite = (track) => {
    setFavorites((prev) => {
      const exist = prev.find((item) => item.id === track.id);
      if (exist) {
        return prev.filter((item) => item.id !== track.id);
      } else {
        return [...prev, track];
      }
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
