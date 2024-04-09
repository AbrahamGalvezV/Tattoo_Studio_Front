import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { bringProfile } from "../../services/apiCalls";
import "./UserHome.css";  


export const UserHome = () => {

    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const userName = JSON.parse(sessionStorage.getItem('passport')).decodificado.userName;
        setMsg(`¡Hola, ${userName}!`);
    }, []);
    


    const token = JSON.parse(sessionStorage.getItem('passport')).token



    const bringProfileHandler = async () => {
        try{
            const profileData = await bringProfile(token)
            console.log(profileData);
            setTimeout (() => {
              navigate("/profile")
          }, 3000)

        
        } catch(error) {
            console.log(error);
        }

    }

  


  return (
    <>
      <div className="main section">
          <div className="container">
                {msg === "" ? <></> : <div className="userHome-hola">{msg}</div>}
                <button onClick={bringProfileHandler}>My profile</button>

          </div>
      </div> 
    </>
  );
};

