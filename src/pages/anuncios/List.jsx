import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import TerminalCard from "../../components/TerminalCard";

export default function List() {
  const [anuncios, setAnuncios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    try {
      const res = await api.get("anuncios/");
      setAnuncios(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function excluir(id) {
    if (window.confirm("excluir este anúncio?")) {
      try {
        await api.delete(`anuncios/${id}/`);
        carregar();
      } catch (err) {
        alert("erro ao excluir");
      }
    }
  }

  const token = localStorage.getItem("token");
  const filtrados = anuncios.filter(a =>
    a.titulo?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Anúncios</h1>
          <span className="count">{anuncios.length} itens</span>
        </div>
        <div className="flex">
          <input
            type="text"
            placeholder="buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "200px" }}
          />
          {token && <Link to="/anuncios/novo" className="btn">[novo]</Link>}
        </div>
      </div>

      {loading ? (
        <div className="loading">carregando...</div>
      ) : filtrados.length === 0 ? (
        <div className="empty-state">
          <p>nenhum anúncio encontrado</p>
          {token && <Link to="/anuncios/novo">[criar anúncio]</Link>}
        </div>
      ) : (
        <div className="card-grid">
          {filtrados.map((item) => (
            <TerminalCard
              key={item.id}
              id={item.id}
              title={item.titulo}
              description={item.descricao}
              price={item.preco}
              onDelete={excluir}
            />
          ))}
        </div>
      )}
    </div>
  );
}