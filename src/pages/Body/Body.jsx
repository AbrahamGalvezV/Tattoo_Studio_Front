import { Navigate, Route, Routes } from "react-router-dom";
import "./Body.css";
import { Login } from "../Login/Login";
import { Home } from "../Home/Home";
import { Services } from "../Services/Services";
import { Fred } from "../Artist/Fred";
import { Register } from "../Register/Register";
import { Profile } from "../Profile/Profile";
import { InfoUsers } from "../InfoUsers/InfoUsers";
import { AdminHome } from "../AdminHome/AdminHome";
import { AdminRoute } from "../../components/AdminRoute/AdminRoutes";
import { ArtistHome } from "../ArtistHome/ArtistHome";
import { ClientHome } from "../ClientHome/ClientHome";
import { ArtistRoute } from "../../components/ArtistRoute/ArtistRoutes";
import { AuthRoute } from "../../components/AuthRoute/AuthRoute";
import {AppointmentInfo} from "../AppointmentInfo/AppointmentInfo";
import { AppointmentInfoArtist } from "../AppointmentInfo/AppointmentInfoArtist";
import { AppointProfile } from "../AppointProfile/AppointProfile";
import { AppointmentInfoClient } from "../AppointmentInfo/AppointmentInfoClient";
import { AppointmentRegistre } from "../AppointmentRegistre/AppointmentRegistre";
import { AppointmentRegistreClient } from "../AppointmentRegistre/AppointmentRegistreClient";

export const Body = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/services" element={<Services />} />
        <Route path="/fred" element={<Fred />} />

        {/* Admin routes */}
        <Route path="/admin" element={<AdminRoute component={AdminHome} />} />
        <Route path="/create-appointment" element={<AdminRoute component={AppointmentRegistre} />} />

        <Route path="/info" element={<AdminRoute component={InfoUsers} />} />
        <Route path="/appointments" element={<AdminRoute component={AppointmentInfo} />} />

        {/* Artist routes */}
        <Route
          path="/artist"
          element={<ArtistRoute component={ArtistHome} />}
        />
        <Route path="/appointments-info-artist" element={<ArtistRoute component={AppointmentInfoArtist} />} />

        {/* Auth routes */}
        <Route path="/profile" element={<AuthRoute component={Profile} />} />
        <Route path="/client" element={<AuthRoute component={ClientHome} />} />
        <Route path="/appointment" element={<AuthRoute component={AppointProfile} />} />
        <Route path="/appointments-info-client" element={<AuthRoute component={AppointmentInfoClient} />} />
        <Route path="/create-appointment-user" element={<AuthRoute component={AppointmentRegistreClient} />} />
        

      </Routes>
    </>
  );
};
