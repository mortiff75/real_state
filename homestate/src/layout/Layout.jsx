import Navbar from "../components/navbar/Navbar";
import { Navigate, Outlet } from "react-router-dom";
import "./layout.scss";
import { useContext } from "react";
import { authContext } from "../../context/auth";

const Layout = () => {
  return (
    <section className="layout">
      <Navbar />

      <div className="content">
        <Outlet />
      </div>
    </section>
  );
};

const RequiredAuthLayout = () => {
  const { currentUser } = useContext(authContext);

  if (!currentUser) return <Navigate to={"/"} />;

  return (
    <section className="layout">
      <Navbar />

      <div className="content">
        <Outlet />
      </div>
    </section>
  );
};

export { Layout, RequiredAuthLayout };
