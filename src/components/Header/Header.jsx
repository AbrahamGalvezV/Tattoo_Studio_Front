import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";
import { getUserData, logout } from "../../app/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

//----------------------------------------------------------------

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const myPassport = useSelector(getUserData);
  const token = myPassport.token;
  const userType = myPassport.decodificado.userRole

  const logMeOut = () => {
    const passport = {
      token: "",
      decodificado: "",
    };

    dispatch(logout(passport));
  };

  

  const navigateToAccount = () => {

    if (userType === "admin") {
      setTimeout(() => {
        navigate("/admin");
      }, 1000);
    } else if (userType === "artist") {
      setTimeout(() => {
        navigate("/artist");
      }, 1000);
    } else {
      setTimeout(() => {
        navigate("/client");
      }, 1000);
    }
  };

  return (
    <>
      <Navbar data-bs-theme="dark" className="header">
        <Container>
          <Navbar.Brand href="home" className="logo-name">
            PURO SKATE
          </Navbar.Brand>
          <Nav>
            <Nav.Link
              href="/home"
              className={location.pathname === "/home" ? "logo-name" : ""}
            >
              HOME
            </Nav.Link>
            <Nav.Link
              href="/services"
              className={location.pathname === "/services" ? "logo-name" : ""}
            >
              SERVICES
            </Nav.Link>
            {!token && ( // Renderizar si el usuario no está autenticado
              <>
                <Nav.Link
                  href="/register"
                  className={
                    location.pathname === "/register" ? "logo-name" : ""
                  }
                >
                  REGISTER
                </Nav.Link>
                <Nav.Link
                  href="/login"
                  className={location.pathname === "/login" ? "logo-name" : ""}
                >
                  LOGIN
                </Nav.Link>
              </>
            )}
            {token && ( // Renderizar si el usuario está autenticado
              <>
                <Nav.Link className={location.pathname === "/admin" || location.pathname === "/client" || location.pathname === "/artist" ?  "logo-name" : ""}  onClick={() => navigateToAccount()}>MY ACCOUNT</Nav.Link>
                <Nav.Link onClick={() => logMeOut()}>LOGOUT</Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
