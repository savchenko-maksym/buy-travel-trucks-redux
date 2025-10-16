import { Link } from "react-router-dom";
import Container from "../../components/Container/Container.jsx";
import s from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={s.backgroundImg}>
      <Container>
        <section className={s.hero}>
          <h1 className={s.title}>Campers of your dreams</h1>
          <h2 className={s.subtitle}>
            You can find everything you want in our catalog
          </h2>
          <Link to="/catalog" className={s.btn}>
            View Now
          </Link>
        </section>
      </Container>
    </div>
  );
};

export default HomePage;
