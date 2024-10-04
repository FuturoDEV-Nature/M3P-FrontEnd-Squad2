import { Sidebar } from "../components/Sidebar";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer } from "react-leaflet";
import { Marcadores } from "../components/Marcadores";
import { MapPin, Pencil, Trash } from "lucide-react";
import "leaflet/dist/leaflet.css";
import "../pages/ListagemDestino.css";
// import { AuthContext } from "../contexts/AuthContext";
import useAxios from "../hooks/useAxios";

function ListagemDestino() {
  // const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  // const [lista, setLista] = useState([]);
  const [locais, setLocais] = useState([]);

  useEffect(() => {
    const carregarDados = async (data) => {
      try {
        const userData = localStorage.getItem("user");
        if (userData) {
          const user = JSON.parse(userData);
          console.log(user.id);
          const resposta = await useAxios.get(
            `/destino/local/${user.id}`,
            data
          );
          console.log(resposta.data);
          const dados = resposta.data;
          console.log(dados);
          setLocais(dados);
        } else {
          console.error("Usuário não encontrado no localStorage.");
        }
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      }
    };
    carregarDados();
  }, []);

  useEffect(() => {
    console.log("Locais atualizados:", locais);
  }, [locais]);

  //MAPA
  const coordenadaInicial = [-27.59249003298383, -48.56058625979836];

  //EXCLUIR
  async function excluirLocal(id) {
    const confirmacao = window.confirm(
      "Tem certeza de que deseja excluir este local?"
    );

    if (confirmacao) {
      try {
        await useAxios.delete(`/destino/${id}`);
        setLocais(locais.filter((local) => local.id !== id));
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
            <button
              className="btn-cadastrar-listagem"
              onClick={() => navigate("/cadastrolocais")}
            >
              <MapPin size={16} /> Cadastrar{" "}
            </button>
          </div>

          <div className="tabela-container">
            <table>
              <tbody>
                {locais.map((local) => (
                  <tr key={local.id}>
                    <td className="nomes2">{local.endereco}</td>
                    <td className="nomes">
                      {local.descricao}
                      </td>

                      <td className="botao-coluna">
                      <Link to={`/cadastrolocais/${local.id}`}>
                        <button className="btn-editar-listagem">
                          <Pencil size={16} />
                          Editar
                        </button>
                      </Link>
                    </td>
                    <td className="botao-coluna">
                      <button
                        className="btn-excluir-listagem"
                        onClick={() => excluirLocal(local.id)}
                      >
                        <Trash size={16} />
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>         
                      <MapContainer
                        center={coordenadaInicial}
                        zoom={8}
                        className="mapa-dashboard"
                      >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                      <Marcadores destino={locais} />
                      </MapContainer>
                    
        </div>
      </div>
    </>
              );
            }


export default ListagemDestino;