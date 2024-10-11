// import { useForm } from "react-hook-form";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../contexts/useAuth";
// import { UsersRound, LogIn } from "lucide-react";
// import "../pages/Home.css";

// function Home() {
//   const { signIn } = useAuth();
//   const { register, formState, handleSubmit } = useForm();
//   const navigate = useNavigate();

//   async function onSubmit(data) {
//     try {
//       const isSuccess = await signIn(data);
//       if (isSuccess) {
//         navigate("/dashboard");
//       } else {
//         alert("Email/senha inválidos");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//     <>
//       <div className="layout-container">
//         <div className="sidebar-home">
//           <form onSubmit={handleSubmit(onSubmit)} className="form-home">
//             <label className="label-home"> Email </label>
//             <input
//               className="input-home"
//               placeholder="Digite o seu email"
//               type="email"
//               {...register("email", { required: "O email é obrigatório" })}
//             />
//             <span className="home-error">
//               {formState.errors?.email?.message}
//             </span>
//             <label className="label-home"> Senha </label>
//             <input
//               className="input-home"
//               placeholder="Digite a sua senha"
//               type="password"
//               {...register("senha", { required: "A senha é obrigatória" })}
//             />
//             <span className="home-error">
//               {formState.errors?.senha?.message}
//             </span>

//             <button className="btn-home btn-home-entrar">
//               <LogIn size={16} />
//               Entrar
//             </button>
//             <Link to="/usuario">
//               <button className="btn-home btn-home-cadastrar">
//                 <UsersRound size={16} />
//                 Cadastrar
//               </button>
//             </Link>
//           </form>

//           <div className="logo-home">
//             <h1> NATUREZA 365 </h1>
//           </div>
//         </div>

//         <div className="img-home">
//           <img
//             className="imghome"
//             src="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821_1280.jpg"
//           />
//         </div>
//       </div>
//     </>
//   );
// }

// export default Home;







import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import { UsersRound, LogIn, MapPin } from "lucide-react";
import { Marcadores } from "../components/Marcadores";
import { MapContainer, TileLayer } from "react-leaflet";
import { useState, useEffect } from 'react';
import useAxios from "../hooks/useAxios";
import "../pages/Home.css";
import "leaflet/dist/leaflet.css";

function Home() {
  const { signIn } = useAuth();
  const { register, formState, handleSubmit } = useForm();
  const navigate = useNavigate();

    //******isLogado******
  
 
    const [numeroDeLogados, setNumeroDeLogados] = useState(0);

    useEffect(() => {
      const token = localStorage.getItem('token')
        const carregarLogados = async () => {
            try {
                const resposta = await useAxios.get("/usuario/countlogados", {
                    headers: {
                        Authorization: `Bearer ${token}` 
                    }
                });
                const dados = resposta.data;
                console.log(dados);
                setNumeroDeLogados(dados);
            } catch (error) {
                console.error("Erro ao carregar os dados:", error);
            }
        };
  
        carregarLogados();
    }, []); 

  // DOIS QUADROS - usuarios
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

  // DOIS QUADROS - locais
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

  // MAPA
  const coordenadaInicial = [-27.59249003298383, -48.56058625979836];

  async function onSubmit(data) {
    try {
      const isSuccess = await signIn(data);
      if (isSuccess) {
        navigate("/dashboard");
      } else {
        alert("Email/senha inválidos");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="layout-container">
        <div className="sidebar-home">
          <form onSubmit={handleSubmit(onSubmit)} className="form-home">
            <label className="label-home"> Email </label>
            <input
              className="input-home"
              placeholder="Digite o seu email"
              type="email"
              {...register("email", { required: "O email é obrigatório" })}
            />
            <span className="home-error">
              {formState.errors?.email?.message}
            </span>
            <label className="label-home"> Senha </label>
            <input
              className="input-home"
              placeholder="Digite a sua senha"
              type="password"
              {...register("senha", { required: "A senha é obrigatória" })}
            />
            <span className="home-error">
              {formState.errors?.senha?.message}
            </span>

            <button className="btn-home btn-home-entrar">
              <LogIn size={16} />
              Entrar
            </button>
            <Link to="/usuario">
              <button className="btn-home btn-home-cadastrar">
                <UsersRound size={16} />
                Cadastrar
              </button>
            </Link>
          </form>

          <div className="logo-home">
            <h1> NATUREZA 365 </h1>
          </div>
        </div>

        <div className="img-home">
          <img
            className="imghome"
            src="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821_1280.jpg"
          />
        </div>

        <div className="dashboard">
          <div className="main-content">
            {/* <h2> DASHBOARD </h2> */}

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

          {/* isLogado****** */}
          <div className="quadro-dash">
              <h2>Logados</h2>
              <UsersRound size={16} />
              <p>{numeroDeLogados}</p>
            </div>
          </div>


            {/* TABELA GRANDE */}
            <div className="tabela-dash">
              {/* <h3> Locais e Descrição </h3> */}
              <table>
                <thead></thead>
                <tbody>
                  {locais.map((local) => (
                    <tr key={local.id}>
                      <td className="nomes">{local.nomelocal}</td>
                      <td className="nomes2">{local.endereco}</td>
                      <td className="nomes">{local.descricao}</td>
                      
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
                  (local.latitude != null && local.longitude != null) ? (
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
      </div>
    </>
  );
}

export default Home;