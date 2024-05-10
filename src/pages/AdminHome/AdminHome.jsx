import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { bringProfile } from "../../services/apiCalls";
import "./AdminHome.css";
import { getUserData } from "../../app/slices/userSlice";
import { useSelector } from "react-redux";
import { ButtonC } from "../../components/ButtonC/ButtonC";

export const AdminHome = () => {
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
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const bringUsersInfo = async () => {
    try {
      setTimeout(() => {
        navigate("/info");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const bringAppointmebtsInfo = async () => {
    try {
      setTimeout(() => {
        navigate("/appointments");
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
            title={"Users list"}
            className={"regularButtonClass"}
            functionEmit={bringUsersInfo}
          />

          <ButtonC
            title={"Appointments"}
            className={"regularButtonClass"}
            functionEmit={bringAppointmebtsInfo}
          />
        </div>
      </div>
    </>
  );
};
