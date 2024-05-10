import CustomTableAppointmentsClient from "../../components/CustomTableAppointments/CustomTableAppointmentsClient";
import "./AppointmentInfo.css";


//----------------------------------------------------------------

export const AppointmentInfoClient = () => {
  return (
    <>
      <div className="appointments section">
        <div className="container">
          <h1 className="title">My appointments</h1>
          <div>{<CustomTableAppointmentsClient />}</div>
        </div>
      </div>
    </>
  );
};
