import './Home.css'
import fredCara from "../../assets/img/fredCara.png";

export const Home = () => {
  
  return (
    <>
    
      <div className="main section">
          <div className="container">
                <h1 className="main-title title">Bienvenido  a Neón Tattoo Shop</h1>
                <p className="main-text text">Tu estudio de confianza donde se encuentran los artistas del tatuaje más prestigiosos del momento. En esta página podrás conocer a nuestros tatuadores y ver algunos de sus trabajos más recientes.</p>   
                <div className="img">
                <a className="image-link" href="./fred.html">
                    <img src={fredCara} alt="Imagen de Fred"/>
                </a>
                <a className="image-link" href="./juan.html">
                    <img src={fredCara} alt="Imagen de Juan"/>
                </a>
                <a className="image-link" href="./maria.html">
                    <img src={fredCara} alt="Imagen de María"/>
                </a>
                <a className="image-link" href="./maria.html">
                    <img src={fredCara} alt="Imagen de María"/>
                </a>
                </div>
          </div>
      </div> 
    </>
  );
};

