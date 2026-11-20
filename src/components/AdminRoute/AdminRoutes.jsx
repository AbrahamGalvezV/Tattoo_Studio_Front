import { amIAdmin } from "../../app/slices/userSlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

//----------------------------------------------------------------

export const AdminRoute = ({ component: Component, ...rest }) => {
  const isAdmin = useSelector(amIAdmin);
  console.log(amIAdmin);

  return isAdmin ? <Component {...rest} /> : <Navigate to="/login" />;
};
