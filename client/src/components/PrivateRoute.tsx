import React from "react";
import { Navigate, Route, RouteProps } from "react-router-dom";

interface PrivateRouteProps extends RouteProps {
  component: React.FC<any>;
}

function PrivateRoute({ component: Component, ...theRest }: PrivateRouteProps) {
  const token = localStorage.getItem("token");
  return token ? <Component /> : <Navigate to={"/login"} />;
}

export default PrivateRoute;
