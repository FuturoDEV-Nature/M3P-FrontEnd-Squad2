import { useState, useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { MapPin, UsersRound } from "lucide-react";
import { MapContainer, TileLayer } from "react-leaflet";
import { Marcadores } from "../components/Marcadores";
import "leaflet/dist/leaflet.css";
import "../pages/Dashboard.css";
import useAxios from "../hooks/useAxios";

function Dashboard() {
  //DOIS QUADROS - usuarios
  
  const [numeroDeUsuarios, setNumeroDeUsuarios] = useState(0);

  useEffect(() => {
    const carregarUsuarios = async (data) => {
      try {
        const resposta = await useAxios.get("/usuario", data);
        const dados = resposta.data;
        console.log(dados);
        setNumeroDeUsuarios(Object.keys(dados).length);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      }
    };
    carregarUsuarios();
  }, []);

  //DOIS QUADROS - locais
  const [numeroDeLocais, setNumeroDeLocais] = useState(0);

  useEffect(() => {
    const carregarLocais = async (data) => {
      try {
        const resposta = await useAxios.get("/destino", data);
        const dados = resposta.data;
        console.log(dados);
        setNumeroDeLocais(Object.keys(dados).length);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      }
    };
    carregarLocais();
  }, []);

  // TABELA GRANDE
  const [locais, setLocais] = useState([]);

  useEffect(() => {
    const carregarDados = async (data) => {
      try {
        const resposta = await useAxios.get("/destino", data);
        const dados = resposta.data;
        setLocais(dados);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      }
    };
    carregarDados();
  }, []);

  //MAPA
  const coordenadaInicial = [-27.59249003298383, -48.56058625979836];

  return (
    <>
      <div className="dashboard">
        <Sidebar></Sidebar>
        <div className="main-content">
          <h2> DASHBOARD </h2>

          <div className="quadros">
            {/* DOIS QUADROS */}
            <div className="quadro-dash">
              <h2>Usuários</h2>
              <UsersRound size={16} />
              <p>{numeroDeUsuarios}</p>
            </div>

            <div className="quadro-dash">
              <h2>Locais</h2>
              <MapPin size={16} />
              <p>{numeroDeLocais}</p>
            </div>
          </div>

          {/* TABELA GRANDE */}
          <div className="tabela-dash">
            <h3> Locais e Descrição </h3>
            <table>
              <thead></thead>
              <tbody>
                {locais.map((local) => (
                  <tr key={local.id}>
                    <td className="nomes2">{local.endereco}</td>
                    <td className="nomes">{local.descricao}</td>
                    <td className="nomes">{local.nomelocal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MAPA */}
          <div>
            <MapContainer
              center={coordenadaInicial}
              zoom={8}
              className="mapa-dash"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {locais.map((local) =>
                local.latitude && local.longitude ? ( 
                  <Marcadores
                  destino={locais}
                    key={local.id}
                    position={[local.lat, local.lng]}                    
                  />
                ) : null
              )}
            </MapContainer>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;