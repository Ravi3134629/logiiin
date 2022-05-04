import React from "react";
import "./Header.css";
function Header({ company_name, user, setUser }) {
  const logoutUser = () => {
    localStorage.removeItem("token");
    setUser(null);
    setTimeout(() => {
      window.location.href = "/auth/login";
    }, 2000);
  };

  return (
    <div className="header">
      <div className="header_wrapper">
        <a href="#">{company_name}</a>
        <div className="navbar_user">
          <div className="user_navbar_info">
            {user ? (
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <h3>{user.name}</h3>
                <button
                  onClick={logoutUser}
                  style={{
                    padding: 8,
                    backgroundColor: "#f44336",
                    color: "#fff",
                    border: 0,
                    minWidth: 90,
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <a
                href="/login"
                style={{
                  padding: 8,
                  backgroundColor: "#262626",
                  color: "#fff",
                  border: 0,
                  minWidth: 90,
                }}
              >
                Login
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
