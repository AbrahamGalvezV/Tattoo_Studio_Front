import './Home.css'
import fredCara from "../../assets/img/fredCara.png";

export const Home = () => {
  
  return (
    <>
    
      <div className="main section">
          <div className="container">
                <h1 className="main-title title">CLUB PURO SKATE</h1>
                <p className="main-text text">Discover the sports you can learn in a pure club safely and with the best teachers</p>   
                <div className="img">
                <a className="image-link" href="/fred">
                    <img src={fredCara} alt="Imagen de Fred"/>
                </a>
                <a className="image-link" href="/fred">
                    <img src={fredCara} alt="Imagen de Juan"/>
                </a>
                </div>
          </div>
      </div> 
    </>
  );
};

