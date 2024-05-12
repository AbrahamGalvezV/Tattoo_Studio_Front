import './Home.css'
import fredCara from "../../assets/img/fredCara.png";

export const Home = () => {
  
  return (
    <>
    
      <div className="main section">
          <div className="container">
                <h1 className="main-title title">Welcome to Neon Tattoo Shop</h1>
                <p className="main-text text">Your trusted studio where you can find the most prestigious tattoo artists of the moment. On this page you can meet our tattoo artists and see some of their most recent work.</p>   
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

