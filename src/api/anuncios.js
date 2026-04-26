import api from "./axios";

export const listarAnuncios = () =>
 api.get("/anuncios/");

export const detalheAnuncio = (id)=>
 api.get(`/anuncios/${id}/`);

export const criarAnuncio = (dados)=>
 api.post("/anuncios/",dados);

export const editarAnuncio = (id,dados)=>
 api.put(`/anuncios/${id}/`,dados);

export const excluirAnuncio = (id)=>
 api.delete(`/anuncios/${id}/`);