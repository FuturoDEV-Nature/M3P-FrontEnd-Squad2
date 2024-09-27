import { Sidebar } from "../components/Sidebar";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer } from "react-leaflet";
import { Marcadores } from "../components/Marcadores";
import { MapPin, Pencil, Trash } from "lucide-react";
import 'leaflet/dist/leaflet.css';
import '../pages/ListagemLocais.css'
import { AuthContext } from "../contexts/AuthContext";

function ListagemLocais() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [lista, setLista] = useState([]);

  async function carregarDados() {
    if (!user) return;

    try {
      const resposta = await fetch(`http://localhost:3000/locais?userId=${user.id}`);
      const locais = await resposta.json();
      setLista(locais);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  }

  useEffect(() => {
    carregarDados();
  }, [user]);

  //MAPA
  const [locais, setLocais] = useState([]);
  const coordenadaInicial = [-27.59249003298383, -48.56058625979836]

  //EXCLUIR

  async function excluirLocal(id) {
    const confirmacao = window.confirm("Tem certeza de que deseja excluir este local?");
  
    if (confirmacao) {
      try {
        await fetch(`http://localhost:3000/locais/${id}`, {
          method: 'DELETE',
        });
  
        setLista(lista.filter(local => local.id !== id));
      } catch (error) {
        alert("Houve um erro ao excluir o local.");
      }
    }
  }

  return (
    <>
      <div className="container-listagem">
      <Sidebar></Sidebar>
      <div className="main-content">
        <h2> LISTAGEM LOCAIS </h2>

        <div>
        <button className="btn-cadastrar-listagem" onClick={() => navigate("/cadastrolocais")}>
        <MapPin size={16}/> Cadastrar</button>
        </div>

        <div className="tabela-container">
            <table> 
            <tbody>
            {lista.map((local) => (
              <tr key={local.id}>
                <td className="nome-listagem">{local.nomelocal}</td>
                <td className="mapa-listagem">
                  <MapContainer
                    center={coordenadaInicial}
                    zoom={8}
                    className="mapa-dashboard"
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marcadores locais={locais}></Marcadores>
                  </MapContainer>
                </td>
                <td className="botao-coluna"> 
                  <Link to={`/cadastrolocais/${local.id}`}>
                    <button className="btn-editar-listagem">
                      <Pencil size={16}/>Editar</button>
                  </Link>              
                </td>
                <td className="botao-coluna">  
                  <button className="btn-excluir-listagem" onClick={() => excluirLocal(local.id)}>
                    <Trash size={16}/>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
      </div>
    </>
  );
}

export default ListagemLocais;