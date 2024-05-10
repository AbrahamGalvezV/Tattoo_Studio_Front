import { useNavigate } from "react-router-dom";
import { ButtonC } from "../../components/ButtonC/ButtonC";
import CustomTableAppointments from "../../components/CustomTableAppointments/CustomTableAppointments";
import "./AppointmentInfo.css";

export function AppointmentInfo() {
  const navigate = useNavigate();

  const createAppointment = async () => {
    try {
      setTimeout(() => {
        navigate("/create-appointment");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="appointments section">
        <div className="container">
          <h1 className="title">Appointments</h1>
          <ButtonC
            title={"Add appointment"}
            className={"regularButtonClass"}
            functionEmit={createAppointment}
          />
          <div>{<CustomTableAppointments />}</div>
        </div>
      </div>
    </>
  );
}
