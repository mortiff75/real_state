import { useContext, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { authContext } from "../../../context/auth";
const Navbar = () => {
  const [open, setOpen] = useState(false);

  const { currentUser } = useContext(authContext);

  console.log(currentUser);

  return (
    <nav className="navbar">
      <div className="left">
        <a href={"/"} className="logo">
          <img src="/logo.png" alt="Logo" />
          <span>MortezaState</span>
        </a>
        {/* Menus Nav */}
        <a href={"/"}>Home</a>
        <a href={"/about"}>About</a>

        <a href={"/contacts"}>Contact</a>

        <a href={"/agents"}>Agents</a>
      </div>
      <div className="right">
        {/* If User Authenticated Logic */}

        {currentUser ? (
          <div className="user">
            <img src={currentUser.avatar || "/favicon.png"} alt="Profile" />
            <span>{currentUser?.username}</span>

            <Link to={"/profile"}>
              <button>Profile</button>
            </Link>
          </div>
        ) : (
          <>
            <a href={"/login"}>Sign in</a>
            <a href={"/register"} className="register">
              Sign up
            </a>
          </>
        )}

        <div className="menuIcon">
          <img src="/menu.png" alt="" onClick={() => setOpen((pre) => !pre)} />
          <div className={`${open ? "menu active" : "menu"}`}>
            <a href={"/"}>Home</a>
            <a href={"/about"}>About</a>

            <a href={"/contacts"}>Contact</a>

            <a href={"/agents"}>Agents</a>
            <a href={"/sign-in"}>Sign in</a>

            <a href={"/sign-up"}>Sign up</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
