import { createSlice } from "@reduxjs/toolkit";

//-----------------------------------------------------

// Guarda la informaciòn del usuario
export const userSlice = createSlice({                  
    name: "user",
    initialState: {
        token: "",
        decodificado:{
            userRole: "",
            userId : "",
            userName: "",
        },
    },

    // Se guarda la información del usuario al hacer  login 
    reducers: {
        login: (state,action) => {
            return {                                    
                ...state,
                ...action.payload,
            }
        } ,

        // Con esta función volvemos al estado inicial de clearSlice (borramos la info del user)
        logout: (state,action) => {
            return {
                token: "",
                decodificado:{
                    userId : "",
                    userName: "",
                },
            }                                           
        },

    }
})

// exportamos las acciones a las que accederemos a través del useDispatch para escribir en el almacén
export const { login, logout} = userSlice.actions

// definimos y exportamos los métodos que nos permitirán venir al almacén a leer información
export const getUserData = (state) => state.user

// método que nos dice el role si el usuario logeado 
export const amIAdmin = (state) => state.user.decodificado.userRole === "admin"
export const amIArtist = (state) => state.user.decodificado.userRole === "artist"
export const amIAuth = (state) => state.user.decodificado.userRole
export default userSlice.reducer