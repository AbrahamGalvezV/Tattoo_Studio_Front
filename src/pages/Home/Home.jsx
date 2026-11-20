import { Link } from "react-router-dom";
import './Home.css'
import fredCara from "../../assets/img/fredCara.png";

export const Home = () => {
  
  return (
    <>
    
      <div className="main section">
          <div className="container">
                <h1 className="main-title title">Welcome to Neon Tattoo Studio</h1>
                <p className="main-text text">Your trusted studio, home to some of the most renowned tattoo artists of the moment. Meet our team and take a look at their latest work.</p>

                <div className="img">
                <Link className="image-link" to="/fred">
                    <img src={fredCara} alt="Imagen de Fred"/>
                </Link>
                <Link className="image-link" to="/fred">
                    <img src={fredCara} alt="Imagen de Juan"/>
                </Link>
                </div>
          </div>
      </div> 
    </>
  );
};

