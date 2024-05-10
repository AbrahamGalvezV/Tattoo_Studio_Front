import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { ButtonC } from "../../components/ButtonC/ButtonC";
import { decodeToken } from "react-jwt";
import {
  registerNewAppointment,
  registerNewUserCall,
} from "../../services/apiCalls";
import "./AppointmentRegistre.css";
import { inputValidator } from "../../utils/validators";
import { getUserData, login } from "../../app/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

//------------------------------------------------------------------------------

export const AppointmentRegistre = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    appointmentDate: "",
    clientId: "",
    serviceId: "",
    artistId: "",
  });

  const dispatch = useDispatch();

  const myPassport = useSelector(getUserData);
  const token = myPassport.token;

  const [isValidContent, setIsvalidContent] = useState({
    appointmentDate: "",
    clientId: "",
    serviceId: "",
    artistId: "",
  });

  const [registerError, setRegisterError] = useState("");
  const [msg, setMsg] = useState("");

  const inputHandler = (e) => {
    // console.log(e.target.name) genero la funcion que bindea

    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const inputValidatorHandler = (e) => {
    const errorMessage = inputValidator(e.target.value, e.target.name);
    setIsvalidContent((prevState) => ({
      ...prevState,
      [e.target.name]: errorMessage,
    }));
    console.log(
      "is " + e.target.value + " this a valid " + e.target.name + "?"
    );
  };

  const registerAppointment = async () => {
    try {
      //desencadenara el register
      const answer = await registerNewAppointment(credentials, token);
      console.log(answer, "soy answer");

      setMsg(`appointment has been created`);

      setTimeout(() => {
        navigate("/appointments");
      }, 3000);
    } catch (error) {
      console.log(error);
      if (error.code === "ERR_NETWORK") {
        setRegisterError("El servidor no responde, acceda en otro momento");
      } else {
        setRegisterError(error.response.data.message);
      }
    }
  };

  return (
    <div className="app-register section">
      <div className="container">
        {msg === "" ? <></> : <div className="title">{msg}</div>}
        {/* <pre>{JSON.stringify(credentials, null, 2)}</pre> */}
        <>
        <p className="app-register__text">Example: 2024-05-29 18:00:00</p>
          <CustomInput
            typeProp={"text"}
            nameProp={"appointmentDate"}
            handlerProp={(e) => inputHandler(e)}
            placeholderProp={"Appointment Date"}
            isValidContent={isValidContent.appointmentDate}
            onBlurHandler={(e) => inputValidatorHandler(e)}
            errorText={isValidContent.appointmentDate}
          />
          <CustomInput
            isValidContent={isValidContent.clientId}
            typeProp={"text"}
            nameProp={"clientId"}
            handlerProp={(e) => inputHandler(e)}
            placeholderProp={"Client Id"}
            onBlurHandler={(e) => inputValidatorHandler(e)}
            errorText={isValidContent.clientId}
          />
          <CustomInput
            isValidContent={isValidContent.serviceId}
            typeProp={"text"}
            nameProp={"serviceId"}
            handlerProp={(e) => inputHandler(e)}
            placeholderProp={"Service Id"}
            onBlurHandler={(e) => inputValidatorHandler(e)}
            errorText={isValidContent.serviceId}
          />
          <CustomInput
            isValidContent={isValidContent.artistId}
            typeProp={"text"}
            nameProp={"artistId"}
            handlerProp={(e) => inputHandler(e)}
            placeholderProp={"Artist Id"}
            onBlurHandler={(e) => inputValidatorHandler(e)}
            errorText={isValidContent.artistId}
          />

          <ButtonC
            title={"Register!"}
            className={"regularButtonClass"}
            functionEmit={registerAppointment}
          />
        </>
        <h3>{registerError}</h3>
      </div>
    </div>
  );
};
