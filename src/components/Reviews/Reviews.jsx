import { useOutletContext } from "react-router-dom";
import Forms from "../Forms/Forms.jsx";
import s from "./Reviews.module.css";
import StarIcon from "../../assets/images/icons/star.svg?react";

const Reviews = () => {
  const { track } = useOutletContext();

  if (!track?.reviews || track.reviews.length === 0) {
    return <div>No reviews yet.</div>;
  }

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i <= 5; i++) {
      stars.push(
        <StarIcon
          key={i}
          className={i <= Math.floor(rating) ? s.starFilled : s.starEmpty}
        />
      );
    }
    return stars;
  };

  return (
    <div className={s.reviewsAndFormWrap}>
      <div className={s.reviews}>
        {track.reviews.map((review, index) => (
          <div key={index}>
            <div className={s.logoNameWrap}>
              <span>{review.reviewer_name.charAt(0).toUpperCase()}</span>
              <div>
                <p>{review.reviewer_name}</p>
                <p>{renderStars(review.reviewer_rating)}</p>
              </div>
            </div>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
      <div className={s.form}>
        <Forms />
      </div>
    </div>
  );
};

export default Reviews;
