import { useState } from "react";
import api from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nome.trim()) {
      newErrors.nome = "nome é obrigatório";
    } else if (formData.nome.trim().length < 3) {
      newErrors.nome = "nome deve ter pelo menos 3 caracteres";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "email inválido";
    }
    
    if (!formData.password) {
      newErrors.password = "senha é obrigatória";
    } else if (formData.password.length < 6) {
      newErrors.password = "senha deve ter pelo menos 6 caracteres";
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "as senhas não coincidem";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function handleRegister(e) {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const payload = {
        nome: formData.nome.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password
      };
      
      await api.post("register/", payload);
      
      const loginRes = await api.post("login/", {
        email: payload.email,
        password: payload.password
      });
      
      localStorage.setItem("token", loginRes.data.access);
      localStorage.setItem("refresh", loginRes.data.refresh);
      
      navigate("/anuncios");
      
    } catch(err) {
      console.log(err.response?.data);
      
      if (err.response?.data?.error === "Email já existe") {
        setErrors({ email: "email já cadastrado" });
      } else {
        alert("erro ao cadastrar");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-container">
      <div className="form-container">
        <div className="page-header">
          <h1>cadastro</h1>
        </div>
        
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="nome">nome</label>
            <input
              id="nome"
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className={errors.nome ? "error" : ""}
            />
            {errors.nome && <span className="error-message">{errors.nome}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email">email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "error" : ""}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">senha</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "error" : ""}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">confirmar senha</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? "error" : ""}
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>
          
          <div className="form-group">
            <button type="submit" disabled={loading}>
              {loading ? "[processando...]" : "[cadastrar]"}
            </button>
          </div>
        </form>
        
        <p className="mt-2 text-soft">
          já tem conta? <Link to="/login">[faça login]</Link>
        </p>
      </div>
    </div>
  );
}