import { Navigate, Outlet } from "react-router-dom";

export function TemplatePrivado() {
  const token = localStorage.getItem("token");

  let estaAutenticado = false;

  try {

    if (token) {
      estaAutenticado = true;
    }
  } catch (e) {
    console.error("Erro ao verificar a autenticação:", e);
  }

  return estaAutenticado ? (
    <div>
      <Outlet />
    </div>
  ) : (
    <Navigate to="/" replace />
  );
}