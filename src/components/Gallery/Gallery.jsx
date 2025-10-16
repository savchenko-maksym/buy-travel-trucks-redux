import { useState } from "react";
import s from "./Gallery.module.css";

const Gallery = ({ gallery }) => {
  const [selectedImg, setSelectedImg] = useState(null);
  return (
    <div>
      <div className={s.gallery}>
        {gallery.map((img, index) => (
          <img
            key={index}
            src={img.thumb}
            alt={`gallery-${index}`}
            onClick={() => setSelectedImg(img.original)}
          />
        ))}
      </div>
      {selectedImg && (
        <div className={s.modal} onClick={() => setSelectedImg(null)}>
          <img src={selectedImg} alt="enlarged" />
        </div>
      )}
    </div>
  );
};
export default Gallery;
