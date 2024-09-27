import { Navigate, Outlet } from "react-router-dom";

export function TemplatePrivado() {
  const user = localStorage.getItem("@natureza365:user");

  let estaAutenticado = false;

  try {
    const userObj = JSON.parse(user);

    if (userObj && userObj.email && userObj.senha) {
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