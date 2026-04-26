import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function ChangePassword() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (newPass !== confirm) {
      alert("senhas não coincidem");
      return;
    }
    
    try {
      await api.post("user/change-password/", {
        current_password: current,
        new_password: newPass
      });
      alert("senha alterada");
      navigate("/profile");
    } catch {
      alert("senha atual incorreta");
    }
  }

  return (
    <div className="page-container">
      <div className="form-container">
        <div className="page-header"><h1>Alterar Senha</h1></div>
        <form onSubmit={handleSubmit}>
          <div className="form-group"><label>senha atual</label><input type="password" value={current} onChange={e => setCurrent(e.target.value)} required /></div>
          <div className="form-group"><label>nova senha</label><input type="password" value={newPass} onChange={e => setNewPass(e.target.value)} required /></div>
          <div className="form-group"><label>confirmar</label><input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required /></div>
          <div className="flex"><button type="submit">[alterar]</button><button type="button" onClick={() => navigate("/profile")}>[cancelar]</button></div>
        </form>
      </div>
    </div>
  );
}