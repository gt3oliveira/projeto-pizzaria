import { createContext, ReactNode, useState, useEffect } from 'react'
import { promises } from 'dns'
import { api } from '@/services/apiClient'
import { destroyCookie, setCookie, parseCookies } from 'nookies'
import Router from 'next/router'
import { toast } from 'react-toastify'

type AuthContextData = {
    user: UserProps,
    isAuthenticated: boolean,
    signIn: (credentials: SignInProps) => Promise<void>,
    signOut: () => void,
    signUp: (credentials: SignUpProps) => Promise<void>,
}

type SignInProps = {
    email: string,
    password: string,
}

type SignUpProps = {
    name: string,
    email: string,
    password: string,
}

type UserProps = {
    id: string,
    name: string,
    email: string,
}

type AuthProviderProps = {
    children: ReactNode,
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut() {
    try {
        destroyCookie(undefined, "@nextauth.token")
        toast.success("Deslogado!")
        Router.push('/')
    } catch (error) {
        toast.error("Erro ao deslogar!")
        console.log(error)
    }
}

export default function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user

    useEffect(() => {
        // pegar token no cookie
        const { '@nextauth.token': token } = parseCookies()

        if(token){
            api.get('/me').then(response => {
                const { id, name, email } = response.data;
                setUser({
                    id, name, email
                })
            })
            .catch(() => {
                // se deu erro, deslogamos o user.
                signOut();
            })
        }
    }, [])

    async function signIn({ email, password }: SignInProps) {
        try {
            const response = await api.post('/session', {
                email,
                password
            })
            // console.log(response.data)

            const { id, name, token } = response.data

            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30, // Expirar em 1 mes.
                path: "/" // Quais caminhos terão ao cookie.
            })

            setUser({
                id,
                name,
                email,
            })

            // Passar para as próximas requisições o nosso token.
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            toast.success(`Você está Logado!`)
            // Redirecionar o user para /dashboard
            Router.push('/dashboard')

        } catch (error) {
            toast.error("Erro ao acessar!")
            console.log("Erro ao acessar ", error)
        }
    }

    async function signUp({ name, email, password }: SignUpProps) {
        try {
            const response = await api.post('/users', {
                name, email, password
            })

            toast.success("Conta criada com sucesso!")
            Router.push('/')

        } catch (error) {
            toast.error("Erro ao cadastrar!")
            console.log(error)
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}
