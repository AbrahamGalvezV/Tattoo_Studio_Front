import { useNavigate } from "react-router-dom";
import CustomTableAppointmentsClient from "../../components/CustomTableAppointments/CustomTableAppointmentsClient";
import "./AppointmentInfo.css";
import { ButtonC } from "../../components/ButtonC/ButtonC";



//----------------------------------------------------------------

export const AppointmentInfoClient = () => {
  const navigate = useNavigate();

  const createAppointment = async () => {
    try {
      setTimeout(() => {
        navigate("/create-appointment-user");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="appointments section">
        <div className="container">
          <h1 className="title">My appointments</h1>
            <ButtonC
              title={"Add appointment"}
              className={"regularButtonClass"}
              functionEmit={createAppointment}
            />
          <div>{<CustomTableAppointmentsClient />}</div>
        </div>
      </div>
    </>
  );
};
