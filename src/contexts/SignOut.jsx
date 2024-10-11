import { Link } from 'react-router-dom';
import useAxios from '../hooks/useAxios';

export async function SignOut() {
    try {
        console.log("SignOut");

        const token = localStorage.getItem('token');

        console.log("token", token);

        const resposta = await useAxios.post("/usuario/islogout", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` // Envie o token se necessário
            }
        })

        const logout = resposta.data;

        if (logout.erro) {
            alert("Erro ao sair");
            return null;
        }

        localStorage.removeItem('token');
        localStorage.removeItem('user');

        return logout; // Aqui você pode retornar algum valor se necessário
    } catch (error) {
        alert("Erro ao sair - no catch");
        return null;
    }
}

const LogoutButton = () => {
    const handleLogout = async () => {
        await SignOut(); // Chama a função de logout
        // Você pode redirecionar ou atualizar o estado do componente após o logout
    };

    return (
        <div>
            <button onClick={handleLogout}>
                Sair
            </button>
            <Link to="/">Home</Link>
        </div>
    );
};

export default LogoutButton;




// import { Link } from 'react-router-dom';

// export function SignOut () {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user')
  
//     return(
//         <>
//            <div>
//         <button onClick={SignOut}> 
//             <Link to='/'>Home</Link> 
//         </button>        
//         </div>
//         </>
//     )

// }