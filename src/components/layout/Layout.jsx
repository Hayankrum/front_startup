import { Outlet, NavLink, useNavigate } from "react-router-dom";
import "./Layout.css";

/* ========== ICONES MINIMALISTAS ========== */

const HomeIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M4 11L12 4l8 7" />
    <path d="M6 10v10h12V10" />
  </svg>
);

const AnunciosIcon = () => (
  <svg viewBox="0 0 24 24">
    <rect x="3" y="7" width="18" height="14" />
    <path d="M3 7l9 4 9-4" />
  </svg>
);

const CriarAnuncioIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
);

const LoginIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M15 3h4v18h-4" />
    <path d="M10 17l5-5-5-5" />
    <path d="M15 12H3" />
  </svg>
);

const PerfilIcon = () => (
  <svg viewBox="0 0 24 24">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c2-4 6-6 8-6s6 2 8 6" />
  </svg>
);

const ConfigIcon = () => (
  <svg viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="3" />
    <path d="M19 12a7 7 0 0 0-.1-1l2-1-2-4-2 1a7 7 0 0 0-2-1l-.3-2h-4l-.3 2a7 7 0 0 0-2 1l-2-1-2 4 2 1a7 7 0 0 0 0 2l-2 1 2 4 2-1a7 7 0 0 0 2 1l.3 2h4l.3-2a7 7 0 0 0 2-1l2 1 2-4-2-1c.1-.3.1-.7.1-1z" />
  </svg>
);

const RegisterIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M16 3h5v5" />
    <path d="M21 8l-7 7-4-4-8 8" />
  </svg>
);

/* ========== LAYOUT ========== */

export default function Layout() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = async () => {
    const refresh = localStorage.getItem("refresh");
    if (refresh) {
      try {
        const api = (await import("../../api/axios")).default;
        await api.post("logout/", { refresh });
      } catch (err) {
        console.error("Erro no logout:", err);
      }
    }
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  return (
    <div className="app">
      <nav className="sidebar">
        <NavLink to="/" className="item" title="home">
          <HomeIcon />
        </NavLink>

        <NavLink to="/anuncios" className="item" title="anuncios">
          <AnunciosIcon />
        </NavLink>

        {token && (
          <NavLink to="/anuncios/novo" className="item" title="novo">
            <CriarAnuncioIcon />
          </NavLink>
        )}

        {!token ? (
          <>
            <NavLink to="/login" className="item" title="login">
              <LoginIcon />
            </NavLink>
          </>
        ) : (
          <NavLink to="/profile" className="item" title="perfil">
            <PerfilIcon />
          </NavLink>
        )}

        <NavLink to="/configuracoes" className="item" title="config">
          <ConfigIcon />
        </NavLink>
      </nav>

      <main className="content">
        <header className="topbar">
          <h2>{token ? `>_ ${localStorage.getItem("user_email") || "user"}` : ">_ guest"}</h2>
          {token && <span className="user-status">●</span>}
        </header>
        <div className="page">
          <Outlet />
        </div>
      </main>
    </div>
  );
}