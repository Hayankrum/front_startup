import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";

export default function Form() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  
  const [form, setForm] = useState({
    titulo: "", descricao: "", preco: "",
    peso: "", idade: "", sexo: "", categoria: "", subcategoria: ""
  });
  
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);

  useEffect(() => {
    carregarCategorias();
    if (id) carregarAnuncio();
  }, [id]);

  async function carregarCategorias() {
    const res = await api.get("categorias/");
    setCategorias(res.data);
  }

  async function carregarSubcategorias(catId) {
    const res = await api.get("subcategorias/");
    const filtradas = res.data.filter(i => i.categoria === parseInt(catId));
    setSubcategorias(filtradas);
  }

  async function carregarAnuncio() {
    const res = await api.get(`anuncios/${id}/`);
    const a = res.data;
    setForm(a);
    if (a.categoria) carregarSubcategorias(a.categoria);
  }

  async function salvar(e) {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (id) {
        await api.put(`anuncios/${id}/`, form);
      } else {
        await api.post("anuncios/", form);
      }
      navigate("/anuncios");
    } catch (err) {
      alert("erro ao salvar");
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>{id ? "Editar" : "Novo"} Anúncio</h1>
      </div>

      <div className="form-container">
        <form onSubmit={salvar}>
          <div className="form-group">
            <label>título</label>
            <input name="titulo" value={form.titulo} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>descrição</label>
            <textarea name="descricao" value={form.descricao} onChange={handleChange} rows={4} />
          </div>

          <div className="form-group">
            <label>preço</label>
            <input name="preco" type="number" step="0.01" value={form.preco} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>categoria</label>
            <select name="categoria" value={form.categoria} onChange={(e) => {
              handleChange(e);
              carregarSubcategorias(e.target.value);
            }}>
              <option value="">selecione</option>
              {categorias.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
            </select>
          </div>

          {subcategorias.length > 0 && (
            <div className="form-group">
              <label>subcategoria</label>
              <select name="subcategoria" value={form.subcategoria} onChange={handleChange}>
                <option value="">selecione</option>
                {subcategorias.map(s => <option key={s.id} value={s.id}>{s.nome}</option>)}
              </select>
            </div>
          )}

          <div className="flex">
            <div className="form-group">
              <label>peso (kg)</label>
              <input name="peso" type="number" value={form.peso} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>idade</label>
              <input name="idade" value={form.idade} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>sexo</label>
              <select name="sexo" value={form.sexo} onChange={handleChange}>
                <option value="">selecione</option>
                <option value="macho">macho</option>
                <option value="femea">fêmea</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <button type="submit" disabled={loading}>
              {loading ? "[salvando...]" : "[salvar]"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}