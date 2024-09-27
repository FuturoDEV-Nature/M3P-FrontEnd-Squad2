import { createContext, useState, useEffect } from "react";

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

    async function signIn(data) {
        try {
            const response = await fetch(`http://localhost:3000/users?email=${data.email}&senha=${data.senha}`);
            const users = await response.json();
    
            if (users.length === 0) {
                throw new Error("Email/Senha inválida");
            }
    
            if (users.length > 0) {
                const loggedInUser = users[0];
                setUser(loggedInUser); 
                localStorage.setItem('@natureza365:user', JSON.stringify(loggedInUser)); 
                return true;                 
            } else {
                return false;
            }
    
        } catch (error) {
            console.error('Error during signIn:', error);
            return false;
        }
    }

    async function signOut() {
        localStorage.removeItem('@natureza365:user');
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );    
}
