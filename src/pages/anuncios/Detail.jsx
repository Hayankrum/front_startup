import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api/axios";

export default function Detail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregar();
  }, [id]);

  async function carregar() {
    try {
      const res = await api.get(`anuncios/${id}/`);
      setItem(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="loading">carregando...</div>;
  }

  if (!item) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <p>anúncio não encontrado</p>
          <Link to="/anuncios">[voltar]</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>{item.titulo}</h1>
        <Link to="/anuncios">[voltar]</Link>
      </div>

      <div className="terminal-card" style={{ maxWidth: "600px" }}>
        <div className="form-group">
          <label>descrição</label>
          <div>{item.descricao || "-"}</div>
        </div>

        <div className="form-group">
          <label>preço</label>
          <div className="card-price">R$ {item.preco || "0"}</div>
        </div>

        <div className="form-group">
          <label>peso</label>
          <div>{item.peso ? `${item.peso} kg` : "-"}</div>
        </div>

        <div className="form-group">
          <label>idade</label>
          <div>{item.idade || "-"}</div>
        </div>

        <div className="form-group">
          <label>sexo</label>
          <div>{item.sexo === "macho" ? "macho" : item.sexo === "femea" ? "fêmea" : item.sexo || "-"}</div>
        </div>

        <div className="form-group">
          <label>categoria</label>
          <div>{item.categoria?.nome || item.categoria || "-"}</div>
        </div>

        <div className="form-group">
          <label>subcategoria</label>
          <div>{item.subcategoria?.nome || item.subcategoria || "-"}</div>
        </div>

        <div className="form-group">
          <label>usuário</label>
          <div>{item.usuario?.nome || "-"}</div>
        </div>

        <div className="form-group">
          <label>status</label>
          <div>{item.ativo ? "ativo" : "inativo"}</div>
        </div>

        <div className="form-group">
          <label>criado em</label>
          <div>{item.criado_em ? new Date(item.criado_em).toLocaleString() : "-"}</div>
        </div>
      </div>
    </div>
  );
}