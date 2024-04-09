import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../Login/Login";
import { Home } from "../Home/Home";
import { Services } from "../Services/Services";
import { Fred } from "../Artist/Fred";
import { Register } from "../Register/Register";
import { UserHome } from "../UserHome/UserHome";
import { Profile } from "../Profile/Profile";




export const Body = () => {

  return (
    <>
      <Routes>
        <Route path="*" element={<Navigate to="/" />}/>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/services" element={<Services />} />
        <Route path="/fred" element={<Fred />} />
        <Route path="/user" element={<UserHome />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};
