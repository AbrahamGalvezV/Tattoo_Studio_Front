import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { ButtonC } from "../../components/ButtonC/ButtonC";
import "./Login.css";
import { decodeToken } from "react-jwt";
import { loginCall } from "../../services/apiCalls";
import { useDispatch } from "react-redux";
import { login } from "../../app/slices/userSlice";
import { inputValidator } from "../../utils/validators";

//------------------------------------------------------------------------------

export const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  // useState lleva la cuenta del formato de los inputs y si es valido
  const [isValidContent, setIsvalidContent] = useState({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState("");
  const [msg, setMsg] = useState("");
  // Login necesita guardar el token en el almacén de redux, así que necesita poder hacer uso
  // del modo escritura. Instanciamos el dispatch

  const inputHandler = (e) => {
    // genero la funciònn que bindea

    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // funcion que valida el contenido de los inputs al quitarles focus y settea el estado de "isValidConstent"
  // para saber si el input debe mostrar un mensaje de error

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

  const loginMe = async () => {
    try {
      //desencadenara el login
      const answer = await loginCall(credentials);
      console.log(answer);

      if (answer.data.token) {
        // decodificamos el token
        const uDecodificado = decodeToken(answer.data.token);
        console.log(uDecodificado);

        const passport = {
          token: answer.data.token,
          decodificado: uDecodificado,
        };

        dispatch(login(passport));

        sessionStorage.setItem("passport", JSON.stringify(passport));

        setMsg(`${uDecodificado.userName}, Bienvenid@ de nuevo`);

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
    } catch (error) {
      console.log(error);
      if (error.code === "ERR_NETWORK") {
        setLoginError("El servidor no responde, acceda en otro momento");
      } else {
        setLoginError(error.response.data.message);
      }
    }
  };

  return (
    <div className="login section">
      <div className="container">
        {msg === "" ? <></> : <div className="title">{msg}</div>}
        {/* <pre>{JSON.stringify(credentials, null, 2)}</pre> */}
        <>
          <CustomInput
            isValidContent={isValidContent.email}
            typeProp={"email"}
            nameProp={"email"}
            handlerProp={(e) => inputHandler(e)}
            placeholderProp={"escribe tu e-mail"}
            onBlurHandler={(e) => inputValidatorHandler(e)}
            errorText={isValidContent.email}
          />
          <CustomInput
            isValidContent={isValidContent.password}
            typeProp={"password"}
            nameProp={"password"}
            handlerProp={(e) => inputHandler(e)}
            placeholderProp={"Escribe el password"}
            onBlurHandler={(e) => inputValidatorHandler(e)}
            errorText={isValidContent.password}
          />

          <ButtonC
            title={"Login!"}
            className={"regularButtonClass"}
            functionEmit={loginMe}
          />
          <h3>{loginError}</h3>
        </>
      </div>
    </div>
  );
};
