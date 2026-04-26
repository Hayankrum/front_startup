import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import TerminalCard from "../../components/TerminalCard";

export default function Home() {
  const [anuncios, setAnuncios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    try {
      const res = await api.get("anuncios/");
      setAnuncios(res.data.slice(0, 6));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const token = localStorage.getItem("token");

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Últimos Anúncios</h1>
        <Link to="/anuncios">[ver todos]</Link>
      </div>

      {loading ? (
        <div className="loading">carregando...</div>
      ) : anuncios.length === 0 ? (
        <div className="empty-state">
          <p>nenhum anúncio encontrado</p>
          {token && <Link to="/anuncios/novo">[criar primeiro anúncio]</Link>}
        </div>
      ) : (
        <div className="card-grid">
          {anuncios.map((item) => (
            <TerminalCard
              key={item.id}
              id={item.id}
              title={item.titulo}
              description={item.descricao}
              price={item.preco}
            />
          ))}
        </div>
      )}
    </div>
  );
}