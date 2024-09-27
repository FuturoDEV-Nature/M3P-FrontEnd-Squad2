import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import { UsersRound, LogIn } from "lucide-react";
import "../pages/Home.css";

function Home() {
  const { signIn } = useAuth();
  const { register, formState, handleSubmit } = useForm();
  const navigate = useNavigate();

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
            <Link to="/CadastroUsuario">
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
      </div>
    </>
  );
}

export default Home;