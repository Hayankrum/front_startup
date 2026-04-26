import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

// Ícone de perfil SVG
const ProfileIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c2-4 6-6 8-6s6 2 8 6" />
  </svg>
);

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ nome: "", email: "" });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [deletePwd, setDeletePwd] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const res = await api.get("user/profile/");
      setUser(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile(e) {
    e.preventDefault();
    try {
      await api.put("user/profile/", user);
      setEditMode(false);
      setSuccessMsg("perfil atualizado");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      alert("erro ao atualizar");
    }
  }

  async function logout() {
    const refresh = localStorage.getItem("refresh");
    if (refresh) {
      try {
        await api.post("logout/", { refresh });
      } catch (err) {
        console.error(err);
      }
    }
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    navigate("/login");
  }

  async function deleteAccount() {
    try {
      await api.delete("user/delete-account/", { data: { password: deletePwd } });
      localStorage.clear();
      navigate("/register");
    } catch (err) {
      alert("senha incorreta");
    }
  }

  if (loading) return <div className="loading">carregando...</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="flex" style={{ alignItems: "center", gap: "1rem" }}>
          <ProfileIcon />
          <h1>perfil</h1>
        </div>
        <div className="flex">
          <button onClick={logout} className="btn-danger">[sair]</button>
        </div>
      </div>

      {successMsg && (
        <div className="alert alert-success">{successMsg}</div>
      )}

      {!editMode ? (
        <div style={{ maxWidth: "500px" }}>
          <div className="terminal-card">
            <div className="form-group">
              <p className="label">nome</p>
              <div>{user.nome}</div>
            </div>
            <div className="form-group">
              <p className="label">email</p>
              <div>{user.email}</div>
            </div>
            <div className="flex mt-2">
              <button onClick={() => setEditMode(true)}>[editar]</button>
              <button onClick={() => navigate("/change-password")}>[alterar senha]</button>
              <button onClick={() => setShowDelete(true)} className="btn-danger">[deletar conta]</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="form-container">
          <form onSubmit={updateProfile}>
            <div className="form-group">
              <label htmlFor="nome">nome</label>
              <input 
                id="nome"
                value={user.nome} 
                onChange={e => setUser({ ...user, nome: e.target.value })} 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">email</label>
              <input 
                id="email"
                type="email" 
                value={user.email} 
                onChange={e => setUser({ ...user, email: e.target.value })} 
                required 
              />
            </div>
            <div className="flex">
              <button type="submit">[salvar]</button>
              <button type="button" onClick={() => setEditMode(false)}>[cancelar]</button>
            </div>
          </form>
        </div>
      )}

      {showDelete && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>deletar conta</h2>
            <p>esta ação é irreversível</p>
            <input 
              type="password" 
              placeholder="confirme sua senha" 
              value={deletePwd} 
              onChange={e => setDeletePwd(e.target.value)} 
            />
            <div className="modal-actions">
              <button onClick={deleteAccount} className="btn-danger">[confirmar]</button>
              <button onClick={() => setShowDelete(false)}>[cancelar]</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}