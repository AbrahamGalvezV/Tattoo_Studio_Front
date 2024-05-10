import { createSlice } from "@reduxjs/toolkit";

export const appointmentSlice = createSlice({
  // Almacena la información de citas
  name: "appointment",
  initialState: {
    id: "",
    appointmentDate: "",
    clientId: "",
    serviceId: "",
    artistId: "",
  },

  reducers: {
    // Guarda la información de la cita
    appointmentInfoData: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

// exportamos las acciones a las que accederemos a través del useDispatch para escribir en el almacén
export const { appointmentInfoData } = appointmentSlice.actions;

// definimos y exportamos los métodos que nos permitirán venir al almacén a leer información
export const getAppointmentData = (state) => state.appointment;
export default appointmentSlice.reducer;
