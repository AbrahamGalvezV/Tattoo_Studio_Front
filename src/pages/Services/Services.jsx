import './Services.css';
import fredCara from "../../assets/img/fredCara.png";


export const Services = () => {
  return (
    <>
      <div className="services section">
        <div className="container">
          <h2 className="title">SERVICES</h2>
          <p className="text services__text">
            At neon tattoo you have the best professionals in the sector.
          </p>
          <p className="text services-text-names">TATTOERS</p>
          <div className="img">
            <a className="image-link" href="/fred">
              <img src={fredCara} alt="Imagen de Fred" />
              <p className="artist-name text">Fred</p>
            </a>
            <a className="image-link" href="./juan.html">
              <img src={fredCara} alt="Imagen de Juan" />
              <p className="artist-name text">Juan</p>
            </a>
            <p className="services-desc">
              Our tattoo artists with more than 20 years of experience in the
              art sector will be able to translate your ideas onto your skin.
            </p>
          </div>
          <p className="text services-text-names">PIRSERS</p>
          <div className="img">
            <a className="image-link" href="./maria.html">
              <img src={fredCara} alt="Imagen de María" />
            </a>
            <p className="services-desc">
              Our piercing expert will be able to perform any piercing or
              dilation in the most hygienic way possible, always with the best
              tools.
            </p>
          </div>
          <p className="text services-text-names"> DELETE TATTOO</p>
          <div className="img">
            <a className="image-link" href="./maria.html">
              <img src={fredCara} alt="Imagen de María" />
            </a>
            <p className="services-desc">
              We have the latest tattoo removal technology today, our expert
              will ensure that no trace of your old tattoo remains.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
