import Table from "react-bootstrap/Table";
import "./CustomTableAppointments.css";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  deleteAppointmentById,
  bringAllAppointments,
} from "../../services/apiCalls";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CustomInput } from "../CustomInput/CustomInput";
import { ButtonC } from "../ButtonC/ButtonC";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  appointmentInfoData,
} from "../../app/slices/appointmentSlice";
import { getUserData } from "../../app/slices/userSlice";

//----------------------------------------------------------------

export function CustomTableAppointments() {
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [appointments, setAppointments] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState({});

  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [filter, setFilter] = useState("");

  const dispatch = useDispatch();

  const myPassport = useSelector(getUserData);
  const token = myPassport.token;


  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        let perPage = 10;
        const res = await   bringAllAppointments(token,currentPage, perPage);
        console.log(res);
        setAppointments(res.data.dates);
        setTotalPages(res.data.total_pages);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAppointments();
  }, [currentPage, token]);

  // handler del buscador
  const filterHandler = (e) => {
    setFilter(e.target.value);
  };

  // useEffect que hará el filtrado de usuarios
  useEffect(() => {
    // debouncing (esperar a dejar de teclear para lanzar la petición)
    const lowercaseFilter = filter.toLowerCase();

    if (filter !== "") {
      const filterTimer = setTimeout(() => {
        const foundAppointments = appointments.filter((appointment) => {
          return appointment.id.toString().includes(lowercaseFilter);
        });

        if (foundAppointments.length > 0) {
          setFilteredAppointments(foundAppointments);
        } else {
          setFilteredAppointments([]);
        }
      }, 1000);

      return () => clearTimeout(filterTimer);
    } else {
      setFilteredAppointments([]);
    }
  }, [filter]);

  const deleteAppointment = async (id) => {
    await deleteAppointmentById(id, token);
    // Después de eliminar el usuario, actualizamos la lista de usuarios y cerramos el modal
    const updatedAppointments = appointments.filter(
      (appointment) => appointment.id !== id
    );
    setAppointments(updatedAppointments);
  };

  const handleCloseBtn = (id) => {
    setShowDeleteModal({ ...showDeleteModal, [id]: false }); // Cerrar el modal para el usuario específico
    window.location.reload();
  };

  const handleDeleteButtonClick = (id) => {
    setShowDeleteModal({ ...showDeleteModal, [id]: true }); // Mostrar el modal para el usuario actual
  };

  const navigate = useNavigate();

  const appointmentsInfo = async (appointment) => {
    try {
      console.log(appointment);
      const appointmentPassport = {
        id: appointment.id,
        appointmentDate: appointment.appointmentDate,
        clientId: appointment.clientId,
        serviceId: appointment.serviceId,
        artistId: appointment.artistId,
      };
      dispatch(appointmentInfoData(appointmentPassport)); // Actualiza el estado del slice de Redux con la información de la cita seleccionada
      navigate("/appointment");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <p className="table__text">Search appointment by id</p>
      <CustomInput
        className="table__filter" // input del buscador
        typeProp="text"
        nameProp="filter"
        handlerProp={filterHandler}
        placeholderProp={"Search...  "}
      />
      <div className="table__wrapper">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Id</th>
              <th>Appointment</th>
              <th>Clients Id</th>
              <th>Artist Id</th>
              <th>Service Id</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length > 0
              ? filteredAppointments.map((appointment) => {
                return (
                  <tr key={appointment.id}>
                    <td>{appointment.id}</td>
                    <td>
                      {dayjs(appointment.appointmentDate).format(
                        "dddd DD-MMMM-YYYY hh:mm A"
                      )}
                    </td>
                    <td>C{appointment.clientId}</td>
                    <td>A{appointment.artistId}</td>
                    <td>S{appointment.serviceId}</td>

                    <td>
                      <div>
                        <>
                          <div>
                            <ButtonC
                              title={"Info"}
                              className={"buttonClass"}
                              functionEmit={() =>
                                appointmentsInfo(appointment)
                              }
                            />
                            <>
                              <Button
                                variant="primary"
                                onClick={() =>
                                  handleDeleteButtonClick(appointment.id)
                                }
                                className="buttonClass"
                              >
                                Delete
                              </Button>

                              <Modal
                                show={
                                  showDeleteModal[appointment.id] || false
                                }
                                onHide={() => handleCloseBtn(appointment.id)}
                              >
                                <Modal.Header closeButton>
                                  <Modal.Title>
                                    Delete Appointment
                                  </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                  Are you sure you want to delete this
                                  Appointment
                                </Modal.Body>
                                <Modal.Footer>
                                  <Button
                                    variant="secondary"
                                    onClick={() =>
                                      handleCloseBtn(appointment.id)
                                    }
                                  >
                                    Close
                                  </Button>
                                  <Button
                                    variant="primary"
                                    onClick={() => {
                                      deleteAppointment(appointment.id);
                                      handleCloseBtn(appointment.id);
                                      window.location.reload(); // Cerrar el modal después de eliminar el usuario
                                    }}
                                  >
                                    Delete appointment
                                  </Button>
                                </Modal.Footer>
                              </Modal>
                            </>

                          </div>
                        </>
                      </div>
                    </td>
                  </tr>
                );
              })
              : appointments.map((appointment) => {
                  return (
                    <tr key={appointment.id}>
                      <td>{appointment.id}</td>
                      <td>
                        {dayjs(appointment.appointmentDate).format(
                          "dddd DD-MMMM-YYYY hh:mm A"
                        )}
                      </td>
                      <td>C{appointment.clientId}</td>
                      <td>A{appointment.artistId}</td>
                      <td>S{appointment.serviceId}</td>
                      <td>
                        <div>
                          <>
                            <div>
                              <ButtonC
                                title={"Info"}
                                className={"buttonClass"}
                                functionEmit={() =>
                                  appointmentsInfo(appointment)
                                }
                              />
                              <>
                                <Button
                                  variant="primary"
                                  onClick={() =>
                                    handleDeleteButtonClick(appointment.id)
                                  }
                                  className="buttonClass"
                                >
                                  Delete
                                </Button>

                                <Modal
                                  show={
                                    showDeleteModal[appointment.id] || false
                                  }
                                  onHide={() => handleCloseBtn(appointment.id)}
                                >
                                  <Modal.Header closeButton>
                                    <Modal.Title>
                                      Delete Appointment
                                    </Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body>
                                    Are you sure you want to delete this
                                    Appointment
                                  </Modal.Body>
                                  <Modal.Footer>
                                    <Button
                                      variant="secondary"
                                      onClick={() =>
                                        handleCloseBtn(appointment.id)
                                      }
                                    >
                                      Close
                                    </Button>
                                    <Button
                                      variant="primary"
                                      onClick={() => {
                                        deleteAppointment(appointment.id);
                                        handleCloseBtn(appointment.id);
                                        window.location.reload(); // Cerrar el modal después de eliminar el usuario
                                      }}
                                    >
                                      Delete appointment
                                    </Button>
                                  </Modal.Footer>
                                </Modal>
                              </>

                            </div>
                          </>
                        </div>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </Table>
      </div>
      <div className="table__btns">
        <button
          className={`buttonClass ${currentPage === 1 ? "disabledButton" : ""}`}
          disabled={currentPage === 1 ? "disabled" : ""}
          onClick={() => {
            console.log(currentPage);
            if (currentPage > 1) {
              setCurrentPage(currentPage - 1);
            }
          }}
        >
          {"<--"}
        </button>
        <button
          className={`buttonClass ${
            currentPage === totalPages ? "disabledButton" : ""
          }`}
          disabled={currentPage === totalPages ? "disabled" : ""}
          onClick={() => {
            console.log(currentPage);
            if (currentPage < totalPages) {
              setCurrentPage(currentPage + 1);
            }
          }}
        >
          {"-->"}
        </button>
      </div>
    </>
  );
}

export default CustomTableAppointments;
