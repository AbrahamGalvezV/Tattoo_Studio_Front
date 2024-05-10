import CustomTableAppointmentsArtist from "../../components/CustomTableAppointments/CustomTableAppointmentsArtist";
import "./AppointmentInfo.css";

//----------------------------------------------------------------

export const AppointmentInfoArtist = () => {
  return (
    <>
      <div className="appointments section">
        <div className="container">
          <h1 className="title">My appointments</h1>
          <div>{<CustomTableAppointmentsArtist />}</div>
        </div>
      </div>
    </>
  );
};
