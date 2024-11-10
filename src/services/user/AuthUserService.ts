import prismaClient from "../../prisma";
import {compare} from "bcryptjs";
import {sign} from "jsonwebtoken";

interface AuthRequest{
    email: string;
    password: string;
}

class AuthUserService{
    async execute({email, password}: AuthRequest){

        //Primeiro verificar se o email existe
        const user = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(!user){
            throw new Error("User/Password incorrect")
        }

        //Segundo verificar se a senha que ele mandou esta correta
        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch){
            throw new Error("User/Password incorrect")
        }

        //Terceiro gerar um token jwt  e devolver os dados do usuario, como id, name e email
        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '30d',
            }
        )

        return {
            id: user.id,
            email: user.email,
            name: user.name,
            token: token
        }

    }
}

export {AuthUserService}