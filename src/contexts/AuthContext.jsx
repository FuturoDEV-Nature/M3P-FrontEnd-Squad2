import { createContext, useState, useEffect } from "react";
import axios from "axios"

export const AuthContext = createContext({
    user: null,
    signIn: async () => {},
    signOut: () => {}
});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storageUser = localStorage.getItem('@natureza365:user');
        if (storageUser) {
            setUser(JSON.parse(storageUser));
        }
    }, []);

    async function signIn(dados) {
        try {
        const response = await axios.post("http://localhost:3000/login", {
            email:dados.email,
            senha:dados.senha
        })
        if (response.status === 200) {
            let token = response.data.token;
            let user = response.data.user;

            // const resposta = await axios.post("/usuario/islogado")
            // console.log(resposta)

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            return true
        }
        } catch (error){
            console.log(error)
        }
        return false
    }

    async function signOut() {
        localStorage.removeItem('user');
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );    
}