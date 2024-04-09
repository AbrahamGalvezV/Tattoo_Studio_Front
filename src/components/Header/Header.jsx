import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Header.css";

//----------------------------------------------------------------

function Header() {
  return (
    <>
      <Navbar data-bs-theme="dark" className='header'>
        <Container>
          <Navbar.Brand href="home" className='logo-name'>NEON TATTOO</Navbar.Brand>
          <Nav >
            <Nav.Link href="/home" className={location.pathname === "/home" ? "logo-name" : ""}>HOME</Nav.Link>
            <Nav.Link href="/services" className={location.pathname === "/services" ? "logo-name" : ""}>SERVICES</Nav.Link>
            <Nav.Link href="/register" className={location.pathname === "/register" ? "logo-name" : ""}>REGISTER</Nav.Link>
            <Nav.Link href="/login" className={location.pathname === "/login" ? "logo-name" : ""}>LOGIN</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;