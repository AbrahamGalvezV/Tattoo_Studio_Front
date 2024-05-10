import { useEffect, useState } from "react";
import "./AppointProfile.css";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { getAppointmentById } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { getUserData } from "../../app/slices/userSlice";
import { getAppointmentData } from "../../app/slices/appointmentSlice";
import dayjs from "dayjs";
import BootstrapModalAppointment from "../../components/BootstrapModal/BootstrapModalAppointment";
//----------------------------------------------------------------

export const AppointProfile = () => {
  const [appointmentData, setAppointmentData] = useState({
    appointmentDate: "",
    artistId: "",
    artistFirstName: "",
    artistLastName: "",
    artistEmail: "",
    clientId: "",
    clientFirstName: "",
    clientLastName: "",
    clientEmail: "",
    serviceId: "",
    serviceName: "",
    description: "",
    role: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  // Extrae la información de la cita
  const myAppointment = useSelector(getAppointmentData);
  console.log(myAppointment, "cita");
  // Aquí se guarda id de la cita
  const appointmentId = myAppointment.id;

  // Extrae la informaciondel usuario
  const myPassport = useSelector(getUserData);
  const token = myPassport.token;
  const userRole = myPassport.decodificado.userRole;

  const inputHandler = (e) => {
    setAppointmentData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const fetchAppointment = async () => {
      const myAppointmentData = await getAppointmentById(appointmentId, token);
      setAppointmentData(myAppointmentData.data);
      console.log(myAppointmentData.data, "cita by id");
    };
    fetchAppointment();
  }, []);

  return (
    <>
      <div className="app_profile section">
        <div className="container">
          <h2 className="title">Appointment</h2>
        </div>
        <p className="text">Date Info</p>
        <CustomInput
          typeProp="text"
          nameProp="appointmentDate"
          placeholderProp=" Data"
          value={dayjs(appointmentData.appointmentDate).format(
            "DD/MMMM/YYYY hh:mm A"
          )}
          isDisabled={!isEditing}
          handlerProp={inputHandler}
        />
        <p className="text">Artist Info</p>
        <CustomInput
          typeProp="text"
          nameProp="artistId"
          placeholderProp=" Artist First Name"
          value={appointmentData.artist ? appointmentData.artist.id : ""}
          isDisabled={!isEditing}
          handlerProp={inputHandler}
        />
        <CustomInput
          typeProp="text"
          nameProp="artistFirstName"
          placeholderProp=" Artist First Name"
          value={appointmentData.artist ? appointmentData.artist.firstName : ""}
          isDisabled={true}
          handlerProp={inputHandler}
        />
        <CustomInput
          typeProp="text"
          nameProp="artistLastName"
          placeholderProp=" Artist Last Name"
          value={appointmentData.artist ? appointmentData.artist.lastName : ""}
          isDisabled={!isEditing}
          handlerProp={inputHandler}
        />

        <CustomInput
          typeProp="text"
          nameProp="artistEmail"
          placeholderProp="Artist email"
          value={appointmentData.artist ? appointmentData.artist.email : ""}
          isDisabled={!isEditing}
          handlerProp={inputHandler}
        />

        <p className="text">Client Info</p>
        <CustomInput
          typeProp="text"
          nameProp="clientId"
          placeholderProp=" Client ID"
          value={appointmentData.client ? appointmentData.client.id : ""}
          isDisabled={!isEditing}
          handlerProp={inputHandler}
        />
        <CustomInput
          typeProp="text"
          nameProp="clientFirstName"
          placeholderProp=" Client First Name"
          value={appointmentData.client ? appointmentData.client.firstName : ""}
          isDisabled={!isEditing}
          handlerProp={inputHandler}
        />
        <CustomInput
          typeProp="text"
          nameProp="clientLastName"
          placeholderProp="Client Last Name"
          value={appointmentData.client ? appointmentData.client.lastName : ""}
          isDisabled={!isEditing}
          handlerProp={inputHandler}
        />
        <CustomInput
          typeProp="text"
          nameProp="clientEmail"
          placeholderProp="Client email"
          value={appointmentData.client ? appointmentData.client.email : ""}
          isDisabled={!isEditing}
          handlerProp={inputHandler}
        />

        <p className="text">Service Info</p>
        <CustomInput
          typeProp="text"
          nameProp="serviceId"
          placeholderProp=" Service ID"
          value={appointmentData.service ? appointmentData.service.id : ""}
          isDisabled={!isEditing}
          handlerProp={inputHandler}
        />
        <CustomInput
          typeProp="text"
          nameProp="serviceName"
          placeholderProp="Service Name"
          value={
            appointmentData.service ? appointmentData.service.serviceName : ""
          }
          isDisabled={!isEditing}
          handlerProp={inputHandler}
        />

        <CustomInput
          typeProp="text"
          nameProp="description"
          placeholderProp="Description"
          value={
            appointmentData.service ? appointmentData.service.description : ""
          }
          isDisabled={!isEditing}
          handlerProp={inputHandler}
        />
        {/* Si el usuario no es cliente, aparece el boton */}
        {userRole !== "client" && (
          <>
            <BootstrapModalAppointment
              appointmentData={myAppointment}
              token={token}
            />
          </>
        )}
      </div>
    </>
  );
};
