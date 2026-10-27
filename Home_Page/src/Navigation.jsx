
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./Navigation.css";

function Navigation() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="nav_bar">
      <Link to="/" className="nav">
        Home
      </Link>

      <Link to="/pricing" className="nav">
        Pricing
      </Link>

      {currentUser ? (
        <>
          <span className="nav">
            {currentUser.displayName || currentUser.email}
          </span>

          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className="nav">
            Login
          </Link>

          <Link to="/signup" className="nav">
            Sign Up
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navigation;
