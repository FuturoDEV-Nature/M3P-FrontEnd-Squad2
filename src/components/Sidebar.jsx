import { Link } from "react-router-dom";
import { House, ListCollapse, MapPin, LogOut } from "lucide-react";
import { SignOut } from "../contexts/SignOut";
import "../components/Sidebar.css";

export function Sidebar() {
  return (
    <>
      <div className="sidebar">
        <h2 className="titulo">NATUREZA 365</h2>

        <div className="quadro1">
          <div className="quadro">
            <h2> Página inicial</h2>
            <button className="btn-sidebar">
              <House size={16} />
              <Link to="/dashboard">Dashboard</Link>
            </button>
          </div>
          <div className="quadro">
            <h2> Cadastro de Locais </h2>
            <button className="btn-sidebar">
              <MapPin size={16} />
              <Link to="/cadastrolocais">Cadastro Locais</Link>
            </button>
          </div>
          <div className="quadro">
            <h2> Listagem de Locais </h2>
            <button className="btn-sidebar">
              <ListCollapse size={16} />
              <Link to="/listagemlocais">Listagem Locais</Link>
            </button>
          </div>
        </div>

        <div className="quadro2">
          <div className="quadro">
            <h2> Sair </h2>
            <button className="btn-sidebar" onClick={SignOut}>
              <LogOut size={16} />
              <Link to="/">Sair</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}