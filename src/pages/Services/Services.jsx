import { Link } from "react-router-dom";
import './Services.css';
import fredCara from "../../assets/img/fredCara.png";


export const Services = () => {
  return (
    <>
      <div className="services section">
        <div className="container">
          <h2 className="title">SERVICES</h2>
          <p className="text services__text">
            At Neon Tattoo you will find the best professionals in the industry.
          </p>
          <p className="text services-text-names">TATTOO ARTISTS</p>
          <div className="img">
            <Link className="image-link" to="/fred">
              <img src={fredCara} alt="Imagen de Fred" />
              <p className="artist-name text">Fred</p>
            </Link>
            <Link className="image-link" to="/fred">
              <img src={fredCara} alt="Imagen de Juan" />
              <p className="artist-name text">Juan</p>
            </Link>
          </div>
          <p className="services-desc">
            With more than 20 years of experience in the art world, our tattoo
            artists will turn your ideas into a unique piece on your skin.
          </p>
          <p className="text services-text-names">PIERCING</p>
          <div className="img">
            <Link className="image-link" to="/fred">
              <img src={fredCara} alt="Imagen de María" />
            </Link>
          </div>
          <p className="services-desc">
            Our piercing expert performs any piercing or stretching with the
            highest hygiene standards and professional-grade tools.
          </p>
          <p className="text services-text-names">TATTOO REMOVAL</p>
          <div className="img">
            <Link className="image-link" to="/fred">
              <img src={fredCara} alt="Imagen de María" />
            </Link>
          </div>
          <p className="services-desc">
            Using the latest laser removal technology, our specialist will make
            sure no trace of your old tattoo remains.
          </p>
        </div>
      </div>
    </>
  );
};
