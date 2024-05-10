import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomTableUsers from "../../components/CustomTableUsers/CustomTableUsers";
import "./InfoUsers.css";
import { ButtonC } from "../../components/ButtonC/ButtonC";

export const InfoUsers = () => {
  const [buttonClientsClicked, setButtonClientsClicked] = useState(true); // Inicialmente, mostramos la tabla de clientes
  const [buttonArtistsClicked, setButtonArtistsClicked] = useState(false);

  // Esta función maneja el clic en el botón de clientes
  const handleClientsButtonClick = () => {
    setButtonClientsClicked(true);
    setButtonArtistsClicked(false);
    const buttonSelected = "clients";
    sessionStorage.setItem("selected", buttonSelected);
  };

  // Esta función maneja el clic en el botón de artistas
  const handleArtistsButtonClick = () => {
    setButtonClientsClicked(false);
    setButtonArtistsClicked(true);
    const buttonSelected = "artists";
    sessionStorage.setItem("selected", buttonSelected);
  };
  

  return (
    <>
      <div className="info section">
        <div className="container">
        <h1 className="title info__title">User Info</h1>
        <div className="info__btns">
        <ButtonC
          title={"Clients"}
          className={
            buttonClientsClicked
              ? "regularButtonClass info__btn"
              : "info__btn regularButtonClass disabledButtom"
          }
          functionEmit={handleClientsButtonClick}
        />
        <ButtonC
          title={"Artists"}
          className={
            buttonArtistsClicked
              ? "regularButtonClass info__btn"
              : "info__btn regularButtonClass disabledButtom"
          }
          functionEmit={handleArtistsButtonClick}
        />
        </div>

        <div>
          {buttonClientsClicked && <CustomTableUsers />}
          {buttonArtistsClicked && <CustomTableUsers />}
        </div>
        </div>

      </div>
    </>
  );
};
