import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { ButtonC } from "../../components/ButtonC/ButtonC";
import "./Login.css";
import { decodeToken } from "react-jwt";
import { loginCall } from "../../services/apiCalls";


export const Login = () => {
    const navigate = useNavigate()

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const [msg, setMsg] = useState("");

    const inputHandler = (e) => {
        // console.log(e.target.name) genero la funcion que bindea
        setCredentials ((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
            })
        )
    }

    const loginMe = async () => {
        //desencadenara el login
        const answer = await loginCall(credentials);
        
        if(answer.data.token){
            // decodificamos el token
            const uDecodificado = decodeToken(answer.data.token);
            console.log(uDecodificado);

            const passport = {
                token: answer.data.token,
                decodificado: uDecodificado
            }

            sessionStorage.setItem("passport", JSON.stringify(passport));

            setMsg(`${uDecodificado.userName}, Bienvenid@ de nuevo`)

            setTimeout (() => {
                navigate("/user")
            }, 3000)
            console.log(passport)
        }
    };

    return (
        
        <div className="login-container">
            <div className="container">
                <div className="services section">
                    <div className="login-container">
                        {msg === "" ? <></> : <div>{msg}</div>}
                        {/* <pre>{JSON.stringify(credentials, null, 2)}</pre> */}
                          <>
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
                              title={"Login!"}
                              className={"regularButtonClass"}
                              functionEmit={loginMe}
                            />
                          </>
                             : (
                        <div></div>)                        
                    </div>
                </div>
            </div>
        </div>
)}