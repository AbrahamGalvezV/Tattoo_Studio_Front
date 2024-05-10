import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CustomInput } from "../CustomInput/CustomInput";
import { updateProfile } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { inputValidator } from "../../utils/validators";
import "./BootstrapModal.css";

//----------------------------------------------------------------

function BootstrapModal({ profileData, inputHandler, token }) {
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  // Valida los datos introducidos
  const [isValidContent, setIsvalidContent] = useState({
    firstName: true,
    lastName: true,
    email: true,
    role: {
      name: true,
    },
  });

  // Se encarga de manejar la validación de los campos de entrada
  const inputValidatorHandler = (e) => {
    const isValid = inputValidator(e.target.value, e.target.name);
    setIsvalidContent((prevState) => ({
      ...prevState,
      [e.target.name]: isValid,
    }));
    console.log(
      "is " + e.target.value + " this a valid " + e.target.name + "?",
      isValid
    );
  };

  // Botón cerrar modal
  const handleClose = () => {
    // Doble navigate para forzar a recargar el perfil en caso de no querer actualizar los datos,
    navigate("/"); // Para que llame de nuevo a la API y los recupere.
    setTimeout(() => {
      navigate("/profile"); // Nos lleva a profile
      window.location.reload(); // Recarga la pagina
    });

    console.log("close");
    setShow(false);
  };

  // Botón de guardar la información actualizada
  const handleUpdate = async () => {
    try {
      await updateProfile(profileData, token);
      if (
        !inputValidator(profileData.firstName, "firstName") ||
        !inputValidator(profileData.email, "email")
      ) {
        console.log("nombre o email no válidos");
        setErrorMessage("No se pueden actualizar los datos");
        return;
      }
      try {
        updateProfile(profileData, token);
      } catch (err) {
        console.log(err);
      }

      setShow(false); // Cierra el modal

      setTimeout(() => {
        window.location.reload(); // Recarga la página
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(profileData, "ProfileData dentro del modal");

  return (
    <>
      <Button className="regularButtonClass" onClick={() => setShow(true)}>
        Edit profile
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit your dates!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CustomInput
            typeProp="text"
            nameProp="firstName"
            placeholderProp=" Your name"
            value={profileData.firstName}
            isDisabled=""
            handlerProp={inputHandler}
            isValidContent={isValidContent.firstName}
            onBlurHandler={(e) => inputValidatorHandler(e)}
          />
          <CustomInput
            typeProp="text"
            nameProp="lastName"
            placeholderProp=" Your lastname"
            value={profileData.lastName}
            isDisabled=""
            handlerProp={inputHandler}
            isValidContent={isValidContent.lastName}
            onBlurHandler={(e) => inputValidatorHandler(e)}
          />
          <CustomInput
            typeProp="text"
            nameProp="email"
            placeholderProp=" Your email"
            value={profileData.email}
            isDisabled=""
            handlerProp={inputHandler}
            isValidContent={isValidContent.email}
            onBlurHandler={(e) => inputValidatorHandler(e)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button  variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BootstrapModal;
