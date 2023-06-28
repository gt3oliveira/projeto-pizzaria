import { compareSync } from "bcryptjs";
import prismaClient from "../../prisma";
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface AuthRequest {
    email: string,
    password: string,
}

export default class AuthUserService {
    async execute({ email, password }: AuthRequest) {
        // verificar se o email existe.
        const user = await prismaClient.user.findFirst({ where: { email: email } })
        if (!user) {
            throw new Error("Usuário ou senha incorretos.")
        }

        // verificar se a senha está correta.
        const passwordMath = await compare(password, user.password)
        if (!passwordMath) {
            throw new Error("Usuário ou senha incorretos.")
        }

        // gerar um token JWT e devolver os dados do usuário 
        const token = sign({
            name: user.name,
            email: user.email,
        },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: "30d"
            }
        )

        return { 
            id: user.id, 
            name: user.name,
            email: user.email,
            token: token
        }
    }
}
