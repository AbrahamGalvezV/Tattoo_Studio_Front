import { useEffect, useState } from "react";
import './Profile.css'
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { bringProfile } from "../../services/apiCalls";
import { inputValidator } from "../../utils/validators";
import BootstrapModal from "../../components/BootstrapModal/BootrstrapModal";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, logout } from "../../app/slices/userSlice";

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

  // const myPassport = JSON.parse(sessionStorage.getItem("passport"));

  const myPassport = useSelector(getUserData);
  const token = myPassport.token;

  const [isValidContent, setIsvalidContent] = useState({
    firstName: true,
    lastName: true,
    email: true,
    role: {
      name: true,
    },
  });

  const inputValidatorHandler = (e) => {
    const isValid = inputValidator(e.target.value, e.target.name);
    setIsvalidContent((prevState) => ({
      ...prevState,
      [e.target.name]: isValid,
    }));
    console.log(
      "is " + e.target.value + " this a valid " + e.target.name + "?",
      isValid
    );
  };

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


  return (
    <>
      <div className="profile section">
        <div className="container">
          <h2 className="title">Mi profile</h2>
          <CustomInput
            typeProp="text"
            nameProp="firstName"
            placeholderProp=" Your name"
            value={profileData.firstName}
            isDisabled={!isEditing}
            handlerProp={inputHandler}
            isValidContent={isValidContent.firstName}
          />
          <CustomInput
            typeProp="text"
            nameProp="lastName"
            placeholderProp=" Your lastname"
            value={profileData.lastName}
            isDisabled={!isEditing}
            handlerProp={inputHandler}
            isValidContent={isValidContent.lastName}
            onBlurHandler={(e) => inputValidatorHandler(e)}
          />
          <CustomInput
            typeProp="text"
            nameProp="email"
            placeholderProp=" Your email"
            value={profileData.email}
            isDisabled={!isEditing}
            handlerProp={inputHandler}
            isValidContent={isValidContent.email}
          />
          <CustomInput
            typeProp="text"
            nameProp="role"
            placeholderProp=" Your role"
            value={profileData.role.name}
            isDisabled={true}
            handlerProp={inputHandler}
            isValidContent={isValidContent.role.name}
          />

          <>
            <BootstrapModal
              profileData={profileData}
              inputHandler={inputHandler}
              token={token}
            />
          </>
        </div>
      </div>
    </>
  );
};
