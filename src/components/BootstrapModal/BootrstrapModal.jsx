import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CustomInput } from "../CustomInput/CustomInput";
import { updateProfile } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";

function BootstrapModal({ profileData, inputHandler, token}) {
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const handleClose = () => {
    // doble navigate para forzar a recargar el perfil en caso de no querer actualizar los datos,
    navigate("/"); // para que llame de nuevo a la API y los recupere. //todo modificar parche
    setTimeout(() => {
      navigate("/profile");
    });

    console.log("close");
    setShow(false);
  };
  const handleUpdate = async () => {
    try {
      await updateProfile(profileData, token);
      console.log("usuario actualizado");
      setTimeout(() => {
        setShow(false);
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(profileData, "ProfileData dentro del modal");

  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
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
          />
          <CustomInput
            typeProp="text"
            nameProp="lastName"
            placeholderProp=" Your lastname"
            value={profileData.lastName}
            isDisabled=""
            handlerProp={inputHandler}
          />
          <CustomInput
            typeProp="text"
            nameProp="email"
            placeholderProp=" Your email"
            value={profileData.email}
            isDisabled=""
            handlerProp={inputHandler}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
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
