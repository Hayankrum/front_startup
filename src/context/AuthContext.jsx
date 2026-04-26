import {createContext,useState} from "react";

export const AuthContext = createContext();

export function AuthProvider({children}){

 const [user,setUser]=useState(
   JSON.parse(localStorage.getItem("user"))
 );

 async function entrar(email,password){

 }

 return(
  <AuthContext.Provider value={{
   user,
   setUser
  }}>
   {children}
  </AuthContext.Provider>
 )
}