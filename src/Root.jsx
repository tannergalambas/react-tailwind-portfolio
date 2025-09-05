import { Outlet } from "react-router-dom";
import RouteTracker from "./RouteTracker";

export default function Root() {
  return (
    <>
      <RouteTracker />
      <Outlet />
    </>
  );
}

