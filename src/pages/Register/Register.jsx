import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { ButtonC } from "../../components/ButtonC/ButtonC";
import { decodeToken } from "react-jwt";
import { registerNewUserCall } from "../../services/apiCalls";
import "./Register.css";
import { inputValidator } from "../../utils/validators";

//------------------------------------------------------------------------------

export const Register = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    firstName: "",
    password: "",
  });

  const [msg, setMsg] = useState("");

  const inputHandler = (e) => {
    // console.log(e.target.name) genero la funcion que bindea
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const registerMe = async () => {
    if (
      inputValidator(credentials.firstName, "firstName") &&
      inputValidator(credentials.password, "password")
    ) {
      const answer = await registerNewUserCall(credentials);

      setMsg(answer.data.message);

      if (answer.data.seccess) {
        setTimeout(() => {
          navigate("/services");
        }, 2000);
      }
    } else {
      console.log("credenciales incorrectas, algún campo no está bien introducido")
    }
  };

  return (
    <div className="register-container">
      <div className="container">
        <div className="services section">
          <div className="login-container">
            {msg === "" ? <></> : <div>{msg}</div>}
            {/* <pre>{JSON.stringify(credentials, null, 2)}</pre> */}
            <>
              <CustomInput
                typeProp={"text"}
                nameProp={"firstName"}
                handlerProp={(e) => inputHandler(e)}
                placeholderProp={"escribe tu nombre"}
              />
              <CustomInput
                typeProp={"email"}
                nameProp={"email"}
                handlerProp={(e) => inputHandler(e)}
                placeholderProp={"escribe tu e-mail"}
              />
              <CustomInput
                typeProp={"password"}
                nameProp={"password"}
                handlerProp={(e) => inputHandler(e)}
                placeholderProp={"Escribe el password"}
              />

              <ButtonC
                title={"register!"}
                className={"regularButtonClass"}
                functionEmit={registerMe}
              />
            </>
            : (<div></div>)
          </div>
        </div>
      </div>
    </div>
  );
};
