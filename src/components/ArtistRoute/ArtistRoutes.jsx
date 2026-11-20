import { amIArtist } from "../../app/slices/userSlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

//----------------------------------------------------------------

export const ArtistRoute = ({ component: Component, ...rest }) => {
  const isArtist = useSelector(amIArtist);
  console.log(amIArtist);

  return isArtist ? <Component {...rest} /> : <Navigate to="/login" />;
};
