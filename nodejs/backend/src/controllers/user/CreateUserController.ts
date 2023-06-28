import {Request, Response} from 'express'
import CreateUserService from '../../services/user/CreateUserService'

export default class CreateUserController{
    async handle(req:Request, res:Response){
        // console.log(req.body)
        const {name, email, password} = req.body

        const userService = new CreateUserService();
        const user = await userService.execute({ name, email, password })

        return res.json(user)
    }
}