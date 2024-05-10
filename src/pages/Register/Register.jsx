import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { ButtonC } from "../../components/ButtonC/ButtonC";
import { registerNewUserCall } from "../../services/apiCalls";
import "./Register.css";
import { inputValidator } from "../../utils/validators";
import { useDispatch } from "react-redux";

//------------------------------------------------------------------------------

export const Register = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    firstName: "",
    password: "",
  });

  const dispatch = useDispatch();

  const [isValidContent, setIsvalidContent] = useState({
    email: "",
    password: "",
    firstName: "",
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

  const registerMe = async () => {
    try {
      //desencadenara el register
      const answer = await registerNewUserCall(credentials);
      console.log(answer, "soy answer");

      setMsg(`El usario esta registrado`);

      setTimeout(() => {
        navigate("/login");
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
    <div className="register section">
      <div className="container">
        {msg === "" ? <></> : <div className="title">{msg}</div>}
        {/* <pre>{JSON.stringify(credentials, null, 2)}</pre> */}
        <>
          <CustomInput
            typeProp={"text"}
            nameProp={"firstName"}
            handlerProp={(e) => inputHandler(e)}
            placeholderProp={"Your name"}
            isValidContent={isValidContent.firstName}
            onBlurHandler={(e) => inputValidatorHandler(e)}
            errorText={isValidContent.firstName}
          />
          <CustomInput
            isValidContent={isValidContent.email}
            typeProp={"email"}
            nameProp={"email"}
            handlerProp={(e) => inputHandler(e)}
            placeholderProp={"Your email"}
            onBlurHandler={(e) => inputValidatorHandler(e)}
            errorText={isValidContent.email}
          />
          <CustomInput
            isValidContent={isValidContent.password}
            typeProp={"password"}
            nameProp={"password"}
            handlerProp={(e) => inputHandler(e)}
            placeholderProp={"Your password"}
            onBlurHandler={(e) => inputValidatorHandler(e)}
            errorText={isValidContent.password}
          />

          <ButtonC
            title={"Register!"}
            className={"regularButtonClass"}
            functionEmit={registerMe}
          />
        </>
        <h3>{registerError}</h3>
      </div>
    </div>
  );
};
