import api from "./axios";

export const login = (dados)=>
 api.post("login/", dados);

export const register = (dados)=>
 api.post("register/", dados);

export const logout = (refresh)=>
 api.post("logout/", {refresh});