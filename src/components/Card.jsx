import "./card.css";

const ImageIcon = () => (
  <svg viewBox="0 0 24 24" className="img-icon">
    <rect x="3" y="5" width="18" height="14" />
    <circle cx="8" cy="10" r="2" />
    <path d="M21 15l-5-5-6 6-3-3-4 4" />
  </svg>
);

export default function Card({
 nome="",
 tipo="",
 preco="",
 descricao="",
 imagens=[]
}) {

 const partes = nome.split(" ");

 const primeiraImagem =
   imagens?.length > 0
      ? imagens[0].imagem
      : null;

 return (
  <div className="card">

    <div className="card-media">

      <span className="tag">
        {tipo}
      </span>

      {primeiraImagem ? (
        <img
          src={primeiraImagem}
          className="card-img"
          alt={nome}
        />
      ) : (
        <ImageIcon />
      )}

    </div>

    <div className="info">

      <p className="first">
        {partes[0]}
      </p>

      <p className="last">
        {partes.slice(1).join(" ")}
      </p>

      <p className="descricao">
        {descricao}
      </p>

      <strong className="preco">
        R$ {preco}
      </strong>

    </div>

  </div>
 );
}