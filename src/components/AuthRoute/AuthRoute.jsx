import { amIAuth } from "../../app/slices/userSlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import React from "react";

//----------------------------------------------------------------

export const AuthRoute = ({ component: Component, ...rest }) => {
  const isAuth = useSelector(amIAuth);
  console.log(amIAuth);

  return isAuth ? <Component {...rest} /> : <Navigate to="/login" />;
};
