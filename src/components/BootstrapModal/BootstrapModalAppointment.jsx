import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CustomInput } from "../CustomInput/CustomInput";
import { updateAppointment } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import "./BootstrapModal.css";
import { appointmentInfoData } from "../../app/slices/appointmentSlice";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../app/slices/userSlice";

//----------------------------------------------------------------

function BootstrapModalAppointment({ appointmentData }) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const [dataInfo, setDataInfo] = useState(appointmentData);

  const navigate = useNavigate();

  // Sacamos la informacion de user del almacen
  const myPassport = useSelector(getUserData);
  const token = myPassport.token;

  // El id de la cita
  const appointmentId = appointmentData.id;

  const inputHandler = (e) => {
    setDataInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Botón cerrar modal
  const handleClose = () => {
    // Doble navigate para forzar a recargar el perfil en caso de no querer actualizar los datos,
     // Para que llame de nuevo a la API y los recupere.
    navigate("/");
    setTimeout(() => {
      navigate("/appointment"); //Nos lleva a appointment
      window.location.reload(); // Recarga la pagina
    });
    console.log("close");
    setShow(false);
  };

  // Botón de guardar la información actualizada
  const handleUpdate = async () => {
    try {
      await updateAppointment(appointmentId, dataInfo, token);
      console.log("usuario actualizado");
      dispatch(appointmentInfoData(dataInfo)); // Guarda la información actualizada de la cita en el almacen
      setShow(false); // Cierra el modal

      setTimeout(() => {
        window.location.reload(); // Recarga la página después de un segundo
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(appointmentData, "ProfileData dentro del modal");

  return (
    <>
      <Button className="regularButtonClass" onClick={() => setShow(true)}>
        Edit appointment
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit your dates!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="modal__text">Example: 2024-05-29 18:00:00</p>
          <CustomInput
            typeProp="text"
            nameProp="appointmentDate"
            placeholderProp="Appointment Date"
            value={dataInfo.appointmentDate}
            isDisabled=""
            handlerProp={inputHandler}
          />
          <CustomInput
            typeProp="text"
            nameProp="artistId"
            placeholderProp="Artist ID"
            value={dataInfo.artistId}
            isDisabled=""
            handlerProp={inputHandler}
          />
          <CustomInput
            typeProp="text"
            nameProp="clientId"
            placeholderProp="Client ID"
            value={dataInfo.clientId}
            isDisabled=""
            handlerProp={inputHandler}
          />
          <CustomInput
            typeProp="text"
            nameProp="serviceId"
            placeholderProp="Service ID"
            value={dataInfo.serviceId}
            isDisabled=""
            handlerProp={inputHandler}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button className="buttonClassClose" onClick={handleClose}>
            Close
          </Button>
          <Button className="buttonClass" onClick={handleUpdate}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BootstrapModalAppointment;
