import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import "../pages/CadastroUsuario.css";

async function verificarCPF(cpf) {
  const resposta = await fetch(`http://localhost:3000/users?cpf=${cpf}`);
  const usuarios = await resposta.json();
  return usuarios.length === 0;
}

async function addUsers(values) {
  try {
    const cpfUnico = await verificarCPF(values.cpf);

    if (!cpfUnico) {
      alert("Já existe um usuário cadastrado com este CPF.");
      return false;
    }

    console.log(values);

    const resposta = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!resposta.ok) {
      alert("Houve um erro ao cadastrar o usuário");
      return false;
    } else {
      alert("Pessoa cadastrada com sucesso");
      return true;
    }
  } catch (error) {
    alert("Houve um erro ao cadastrar o usuário - no catch");
    return false;
  }
}

async function buscarEndereco(cep) {
  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const endereco = await resposta.json();

    if (endereco.erro) {
      alert("CEP não encontrado.");
      return null;
    }

    return endereco;
  } catch (error) {
    alert("Erro ao buscar o endereço.");
    return null;
  }
}

function CadastroUsuario() {
  const navigate = useNavigate();
  const { register, formState, handleSubmit, setValue } = useForm();
  const [cep, setCep] = useState("");

  const validarCPF = (cpf) => {
    const cpfLimpo = cpf.replace(/\D/g, "");

    if (cpfLimpo.length !== 11) {
      alert("O CPF deve ter exatamente 11 dígitos.");
    }
    return true;
  };

  const handleBuscarEndereco = async () => {
    const endereco = await buscarEndereco(cep);
    if (endereco) {
      setValue("endereço", endereco.logradouro);
      setValue("numero", endereco.numero || "");
      setValue("bairro", endereco.bairro);
      setValue("cidade", endereco.localidade);
      setValue("estado", endereco.uf);
    }
  };

  const onSubmit = async (values) => {
    console.log("Dados do formulário:", values);

    const sucesso = await addUsers(values);

    console.log("Sucesso da operação:", sucesso);

    if (sucesso) {
      console.log("Navegando para a página inicial");
      navigate("/");
    }
  };

  return (
    <>
      <div className="usuario-cadastro">
        <h2> CADASTRO DE USUÁRIO </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="usuario-label">Nome</label>
            <input
              className="usuario-input"
              placeholder="Digite o nome"
              {...register("nome", { required: "O nome é obrigatório" })}
            />
            {formState.errors?.nome?.message}
          </div>

          <div>
            <label className="usuario-label">Sobrenome</label>
            <input
              className="usuario-input"
              placeholder="Digite o sobrenome"
              {...register("sobrenome", {
                required: "O sobrenome é obrigatório",
              })}
            />
            {formState.errors?.sobrenome?.message}
          </div>

          <div>
            <label className="usuario-label">Data de nascimento</label>
            <input
              className="usuario-input"
              type="date"
              placeholder="Digite a data de nascimento"
              {...register("nascimento", {
                required: "A data de nascimento é obrigatória",
              })}
            />
            {formState.errors?.nascimento?.message}
          </div>

          <div>
            <label className="usuario-label">Sexo</label>
            <select
              className="select-usuario"
              {...register("sexo", { required: "O sexo é obrigatório" })}
            >
              <option value=""></option>
              <option value="feminino">Feminino</option>
              <option value="masculino">Masculino</option>
            </select>
            {formState.errors?.sexo?.message}
          </div>

          <div>
            <label className="usuario-label">CPF</label>
            <input
              className="usuario-input"
              type="text"
              placeholder="Digite o CPF"
              {...register("cpf", {
                required: "O CPF é obrigatório",
                validate: validarCPF,
              })}
            />
            {formState.errors?.cpf?.message}
          </div>

          <div>
            <label className="usuario-label">Email</label>
            <input
              className="usuario-input"
              type="email"
              placeholder="Digite o email"
              {...register("email", { required: "O email é obrigatório" })}
            />
            {formState.errors?.email?.message}
          </div>

          <div>
            <label className="usuario-label">Senha</label>
            <input
              className="usuario-input"
              type="password"
              placeholder="Digite a senha"
              {...register("senha", { required: "O email é obrigatório" })}
            />
            {formState.errors?.senha?.message}
          </div>

          <div>
            <label className="usuario-label">Endereço</label>
            <input
              className="usuario-input"
              type="string"
              placeholder="Digite ao endereço"
              {...register("endereço", { required: "O email é obrigatório" })}
            />
            {formState.errors?.endereço?.message}
          </div>

          <div>
            <label className="usuario-label">Número/Complemento</label>
            <input
              className="usuario-input"
              placeholder="Digite o número do endereço"
              {...register("numero", { required: "O email é obrigatório" })}
            />
            {formState.errors?.numero?.message}
          </div>

          <div>
            <label className="usuario-label">CEP</label>
            <input
              className="usuario-input"
              type="text"
              placeholder="Digite o CEP do endereço"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
            />
          </div>


          <div className="botoes-cadastrousuario">
          <div>
            <button
              className="btn-buscar"
              type="button"
              onClick={handleBuscarEndereco}
            >
              Buscar Endereço-CEP
            </button>
            {formState.errors?.cep?.message}
          </div>

          <div>
            <button className="btn-cadastrar" type="submit">
              Cadastrar
            </button>
          </div>

          <div>
            <h2>
              {" "}
              Já possui cadastro? Faça o seu <Link to="/">Login</Link>
            </h2>
          </div>
          </div>
        </form> 
      </div>
    </>
  );
}

export default CadastroUsuario;