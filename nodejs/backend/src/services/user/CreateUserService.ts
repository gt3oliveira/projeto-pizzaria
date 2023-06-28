import prismaClient from '../../prisma'
import { hash } from 'bcryptjs'

interface UserRequest{
    name: string,
    email: string,
    password: string,
}

export default class CreateUserService{

    async execute({ name, email, password }:UserRequest){
        // console.log(`${name}, ${email}, ${password}`)

        // verificar se o usuário enviou um email
        if(!email){
            throw new Error("Email incorreto!")
        }
        // verificar se esse email já está cadastrado
        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        }) 
        
        if(userAlreadyExists){
            throw new Error("Este usuário já existe.")
        }

        const passwordHash = await hash(password, 8)

        const user = await prismaClient.user.create({
            data:{
                name: name,
                email: email,
                password: passwordHash,
            },
            select:{
                id: true,
                name: true,
                email: true,
            }
        })

        return user;
    }
}