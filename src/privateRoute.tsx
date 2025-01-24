// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import { Navigate } from "react-router-dom";

// Componente para proteger rotas
function PrivateRoute({ element, ...rest }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated"); // Ou qualquer outro método de autenticação

  if (!isAuthenticated) {
    // Redireciona para a página de login se não estiver autenticado
    return <Navigate to="/" replace />;
  }

  return element; // Retorna o componente da rota protegida se estiver autenticado
}

export default PrivateRoute;
