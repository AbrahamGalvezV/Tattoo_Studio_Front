import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { bringProfile } from "../../services/apiCalls";
import "./ClientHome.css";
import { getUserData } from "../../app/slices/userSlice";
import { useSelector } from "react-redux";
import { ButtonC } from "../../components/ButtonC/ButtonC";

export const ClientHome = () => {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const myPassport = useSelector(getUserData);
  const token = myPassport.token

  useEffect(() => {
    const userName = myPassport.decodificado
      .userName;
    setMsg(`¡Hola, ${userName}!`);
  }, []);

  const bringProfileHandler = async () => {
    try {
      const profileData = await bringProfile(token);
      console.log(profileData);
      setTimeout(() => {
        navigate("/profile");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const bringAppointmentsInfo = async () => {
    try {
      setTimeout(() => {
        navigate("/appointments-info-client");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="home section">
        <div className="container">
          {msg === "" ? <></> : <h2 className="home__name title">{msg}</h2>}
          {/* <div className="home__text text">{myPassport.vecesLogeado} veces logeado</div> */}
          <ButtonC
            title={"My profile"}
            className={"regularButtonClass"}
            functionEmit={bringProfileHandler}
          />
            <ButtonC
            title={"Appointments"}
            className={"regularButtonClass"}
            functionEmit={bringAppointmentsInfo}
          />
        </div>
      </div>
    </>
  );
};