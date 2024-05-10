import { combineReducers } from "redux";
import userSlice from "../app/slices/userSlice";
import persistReducer from "redux-persist/es/persistReducer";
import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import storage from "redux-persist/lib/storage";
import appointmentSlice from "./slices/appointmentSlice";

//----------------------------------------------------------------

// Defino los pasillos que tendrá mi almacén (importante crear los archivos correspondientes)
const reducers = combineReducers({
  user: userSlice,
  appointment: appointmentSlice
});

// Opciones del persistor
const presistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(presistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
});
