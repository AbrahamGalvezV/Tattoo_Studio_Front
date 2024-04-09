import { useEffect, useState } from "react";
import "../UserHome/UserHome.css";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { bringProfile } from "../../services/apiCalls";
import BootstrapModal from "../../components/BootstrapModal/BootrstrapModal";

//----------------------------------------------------------------

export const Profile = () => {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const myPassport = JSON.parse(sessionStorage.getItem("passport"));
  const token = myPassport.token;

  const inputHandler = (e) => {
    setProfileData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const myProfileData = await bringProfile(token);
      setProfileData(myProfileData);
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    console.log(profileData, "bringProfile");
  }, [profileData]);

  const updateProfileHandler = () => {
    if (
      !inputValidator(profileData.firstName, "firstName") ||
      !inputValidator(profileData.email, "email")
    ) {
      console.log("nombre o email no válidos");
      setErrorMessage("No se pueden actualizar los datos");
      return;
    }
    try {
      updateProfile(profileData, token);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="main section">
        <div className="container">
          <h2 className="userHome-hola">Mi profile</h2>
          <CustomInput
            typeProp="text"
            nameProp="firstName"
            placeholderProp=" Your name"
            value={profileData.firstName}
            isDisabled={!isEditing}
            handlerProp={inputHandler}
          />
          <CustomInput
            typeProp="text"
            nameProp="lastName"
            placeholderProp=" Your lastname"
            value={profileData.lastName}
            isDisabled={!isEditing}
            handlerProp={inputHandler}
          />
          <CustomInput
            typeProp="text"
            nameProp="email"
            placeholderProp=" Your email"
            value={profileData.email}
            isDisabled={!isEditing}
            handlerProp={inputHandler}
          />
          <CustomInput
            typeProp="text"
            nameProp="role"
            placeholderProp=" Your role"
            value={profileData.role.name}
            isDisabled={true}
            handlerProp={inputHandler}
          />

          {isEditing ? (
            <div className="button-container">
              <button onClick={() => updateProfileHandler(true)}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          ) : (
            <>
              
              <BootstrapModal
                profileData={profileData}
                inputHandler={inputHandler}
                token={token}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};
