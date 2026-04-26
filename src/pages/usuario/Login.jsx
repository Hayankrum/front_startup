import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await api.post("login/", {
        email: email.trim().toLowerCase(),
        password: password.trim()
      });
      localStorage.setItem("token", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      navigate("/anuncios");
    } catch {
      alert("credenciais inválidas");
    }
  }

  return (
    <div className="page-container">
      <div className="form-container">
        <div className="page-header"><h1>Login</h1></div>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">email</label>
            <input 
              id="email"
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">senha</label>
            <input 
              id="password"
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit">[entrar]</button>
          <p className="mt-2 text-soft">não tem conta? <Link to="/register">registre-se</Link></p>
        </form>
      </div>
    </div>
  );
}