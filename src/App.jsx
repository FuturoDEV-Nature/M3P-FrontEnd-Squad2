import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { SignOut } from "../src/contexts/SignOut";
import { TemplatePrivado } from "./routes/privateRoute";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CadastroUsuario from "./pages/CadastroUsuario";
import CadastroLocais from "./pages/CadastroLocais";
import ListagemDestino from "./pages/ListagemDestino";


function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/cadastrousuario' element={<CadastroUsuario />} />
            <Route path='/' element={<Home />} />
            <Route element={<TemplatePrivado />}>
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/cadastrolocais' element={<CadastroLocais />} />
              <Route path='/cadastrolocais/:id' element={<CadastroLocais />} />
              <Route path='/destino' element={<ListagemDestino />} />
              <Route path='/destino/:id' element={<ListagemDestino />} />
              <Route path='/signout' element={<SignOut />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;