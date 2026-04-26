import { Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";

import Home from "../pages/Home/Home";
import Configuracoes from "../pages/Configuracoes";

import Login from "../pages/usuario/Login";
import Register from "../pages/usuario/Register";
import Profile from "../pages/usuario/Profile";
import ChangePassword from "../pages/usuario/ChangePassword"; // Adicione esta linha

// páginas normais

// status
import Offline from "../pages/Status/Offline";
import NotFound from "../pages/Status/NotFound";
import Loading from "../pages/Status/Loading";

import AnuncioList from "../pages/anuncios/List";
import AnuncioDetail from "../pages/anuncios/Detail";
import AnuncioForm from "../pages/anuncios/Form";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="configuracoes" element={<Configuracoes />} />

        <Route path="anuncios" element={<AnuncioList />} />
        <Route path="anuncios/novo" element={<AnuncioForm />} />
        <Route path="anuncios/:id" element={<AnuncioDetail />} />
        <Route path="anuncios/:id/editar" element={<AnuncioForm />} />

        <Route path="offline" element={<Offline />} />
        <Route path="loading" element={<Loading />} />

        <Route path="*" element={<NotFound />} />

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="profile" element={<Profile />} />
        <Route path="change-password" element={<ChangePassword />} /> {/* Adicione esta linha */}
      </Route>
    </Routes>
  );
}