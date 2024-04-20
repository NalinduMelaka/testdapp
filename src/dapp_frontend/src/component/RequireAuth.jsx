import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from '../context/use-auth-client'


const RequreAuth = () => {
  const { isAuthenticated, authClient } = useAuth();
  console.log("from the requre page", isAuthenticated, authClient);
  const location = useLocation();
  console.log("from the requer", isAuthenticated, authClient);


  return (
    <>
      {
        isAuthenticated ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />//this send them to the main page landing
      }
    </>
  );

}

export default RequreAuth;