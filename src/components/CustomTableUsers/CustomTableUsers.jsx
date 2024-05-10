import Table from "react-bootstrap/Table";
import "./CustomTableUsers.css";
import { useEffect, useState } from "react";
import {
  deleteUserById,
  bringAllClientsCall,
  bringAllArtistsCall,
} from "../../services/apiCalls";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CustomInput } from "../CustomInput/CustomInput";
import { useSelector } from "react-redux";
import { getUserData } from "../../app/slices/userSlice";

export function CustomTableUsers() {
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState({});

  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filter, setFilter] = useState("");

  const [allUsers, setAllUsers] = useState([]);

  const myPassport = useSelector(getUserData);
  const token = myPassport.token;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userSelected = sessionStorage.getItem("selected");
        let perPage = 10;

        if (userSelected === "clients") {
          const res = await bringAllClientsCall(token, currentPage, perPage);
          console.log(res, "soyyyy");

          const allUsersPerPage = res.data.total_pages * perPage;
          const allRes = await bringAllClientsCall(
            token,
            currentPage,
            allUsersPerPage
          );

          console.log(allRes, "tooooodos");

          setUsers(res.data.users);
          setAllUsers(allRes.data.users);

          setTotalPages(res.data.total_pages);
          console.log(res.data.total_pages);
        }

        if (userSelected === "artists") {
          const res = await bringAllArtistsCall(token, currentPage, perPage);

          const allUsersPerPage = res.data.total_pages * perPage;
          const allRes = await bringAllArtistsCall(
            token,
            currentPage,
            allUsersPerPage
          );
          setUsers(res.data.users);
          setAllUsers(allRes.data.users);

          setTotalPages(res.data.total_pages);
          console.log(res.data.total_pages);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, [currentPage]);

  // handler del buscador de personajes
  const filterHandler = (e) => {
    setFilter(e.target.value);
  };

  // useEffect que hará el filtrado de personajes
  useEffect(() => {
    // debouncing (esperar a dejar de teclear para lanzar la petición)
    const lowercaseFilter = filter.toLowerCase();

    if (filter !== "") {
      // preparamos un setTimeout que se ejecutará al cabo de un segundo con una llamada a la API (en este caso filtrado en front del array)
      const filterTimer = setTimeout(() => {
        // filtramos el array de personajes
        const foundUsers = allUsers.filter((user) => {
          return (
            user.id.toString().includes(lowercaseFilter) ||
            user.firstName.toLowerCase().includes(lowercaseFilter) || // Busca por nombre (case-insensitive)
            user.lastName.toLowerCase().includes(lowercaseFilter) || // Busca por apellido (case-insensitive)
            user.email.toLowerCase().includes(lowercaseFilter) //
          );
          // return user.name.toLowerCase().includes(lowercaseFilter);
        });
        if (foundUsers.length > 0) {
          setFilteredUsers(foundUsers);
        } else {
          setFilteredUsers([]);
          // si al menos un personaje cumple el filtro, lo seteamos, else lo vaciamos
        }
      }, 1000);

      // preparamos el botón que cancelará el setTimeout preparado anteriormente cuando se desmonte el componente actual (Characters)
      // O SE DISPARE DE NUEVO EL USE EFFECT, de manera que creamos un bucle crear temporizador -> preparar cancelación -> cancelar + crear temporizador
      return () => clearTimeout(filterTimer);
    } else {
      console.log("el filtro está vacío");
      setFilteredUsers([]);
      [];
    }
  }, [filter]);

  const deleteUser = async (id) => {
    await deleteUserById(id, token);
    // Después de eliminar el usuario, actualizamos la lista de usuarios y cerramos el modal
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  const handleCloseBtn = (id) => {
    setShowDeleteModal({ ...showDeleteModal, [id]: false }); // Cerrar el modal para el usuario específico
    window.location.reload();
  };

  const handleDeleteButtonClick = (id) => {
    setShowDeleteModal({ ...showDeleteModal, [id]: true }); // Mostrar el modal para el usuario actual
  };

  return (
    <>
      <p className="table__text">Search by id, first name, lastname o email</p>
      <CustomInput
        className="table__filter" // input del buscador
        typeProp="text"
        nameProp="filter"
        handlerProp={filterHandler}
        placeholderProp={"Search...  "}
      />
      <div className="table__wrapper">
        {" "}
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0
              ? filteredUsers.map((user) => {
                  return (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>

                      <td>
                        <div>
                          <>
                            <div>
                              <>
                                <Button
                                  variant="primary"
                                  onClick={() =>
                                    handleDeleteButtonClick(user.id)
                                  }
                                  className="buttonClass"
                                >
                                  Delete user
                                </Button>

                                <Modal
                                  show={showDeleteModal[user.id] || false}
                                  onHide={() => handleCloseBtn(user.id)}
                                >
                                  <Modal.Header closeButton>
                                    <Modal.Title>Delete user</Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body>
                                    Are you sure you want to delete this user
                                  </Modal.Body>
                                  <Modal.Footer>
                                    <Button
                                      variant="secondary"
                                      onClick={() => handleCloseBtn(user.id)}
                                    >
                                      Close
                                    </Button>
                                    <Button
                                      variant="primary"
                                      onClick={() => {
                                        deleteUser(user.id);
                                        handleCloseBtn(user.id);
                                        window.location.reload(); // Cerrar el modal después de eliminar el usuario
                                      }}
                                    >
                                      Delete user
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
              : users.map((user) => {
                  return (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>

                      <td>
                        <div>
                          <>
                            <div>
                              <>
                                <Button
                                  variant="primary"
                                  onClick={() =>
                                    handleDeleteButtonClick(user.id)
                                  }
                                  className="buttonClass"
                                >
                                  Delete user
                                </Button>

                                <Modal
                                  show={showDeleteModal[user.id] || false}
                                  onHide={() => handleCloseBtn(user.id)}
                                >
                                  <Modal.Header closeButton>
                                    <Modal.Title>Delete user</Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body>
                                    <p className="modal__text">Are you sure you want to delete this user</p>
                                  </Modal.Body>
                                  <Modal.Footer>
                                    <Button
                                      variant="secondary"
                                      onClick={() => handleCloseBtn(user.id)}
                                    >
                                      Close
                                    </Button>
                                    <Button
                                      variant="primary"
                                      onClick={() => {
                                        deleteUser(user.id);
                                        handleCloseBtn(user.id); // Cerrar el modal después de eliminar el usuario
                                      }}
                                    >
                                      Delete user
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

export default CustomTableUsers;
