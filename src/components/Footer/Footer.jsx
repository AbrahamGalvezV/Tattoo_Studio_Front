import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Footer.css";
import { loginCall } from "../../services/apiCalls";
import { useDispatch } from "react-redux";
import { decodeToken } from "react-jwt";
import { login } from "../../app/slices/userSlice";
import { useNavigate } from "react-router-dom";

//----------------------------------------------------------------

export const Footer = () => {

  const navigate = useNavigate();
  const admin = {
    email: "admin1@admin.com",
    password: "12345678",
  };

  const artist = {
    email: "artist1@artist.com",
    password: "12345678",
  };

  const client = {
    email: "Juston83@gmail.com",
    password: "12345678",
  };

  const dispatch = useDispatch();

  const loginMe = async (role) => {
    const answer = await loginCall(role);
    console.log(answer, 'answer');
    if (answer.data.token) {
      const uDecodificado = decodeToken(answer.data.token);
      console.log(uDecodificado, ' user');

      const passport = {
        token: answer.data.token,
        decodificado: uDecodificado,
      };

      dispatch(login(passport));

      if (uDecodificado.userRole === "admin") {
        setTimeout(() => {
          navigate("/admin");
        }, 1000);
        console.log(passport);
      } else if (uDecodificado.userRole === "artist") {
        setTimeout(() => {
          navigate("/artist");
        }, 1000);
        console.log(passport);
      } else {
        setTimeout(() => {
          navigate("/client");
        }, 1000);
        console.log(passport);
      }
    }
  };

  return (
    <>
      <Navbar data-bs-theme="dark" className="header footer ">
        <Container>
          <Nav>
            <Nav.Link
              onClick={() => loginMe(admin)}
              className={location.pathname === "/home" ? "logo-name" : ""}
            >
              ADMIN
            </Nav.Link>
            <Nav.Link
              onClick={() => loginMe(artist)}
              className={location.pathname === "/services" ? "logo-name" : ""}
            >
              ARTIST
            </Nav.Link>
            <Nav.Link
              onClick={() => loginMe(client)}
              className={location.pathname === "/register" ? "logo-name" : ""}
            >
              USER
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Footer;
