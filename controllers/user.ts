import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import userMapper from '../dataMappers/userMapper'

interface User {
    connectUser: (req: Request, res: Response) => void;
}

const user : User = {
    connectUser: async(req, res) => {
        const {mail, password} = req.body;
        const findUser = await userMapper.fetchUser(mail);
        
        if(findUser === null){
            const message = `nom d'utilisateur ou mot de passe incorrect`;
            res.json(message);
        }
        
        if(findUser){
            const isValidPassword = bcrypt.compareSync(password, findUser.password);

            if(!isValidPassword) {
                const message = `nom d'utilisateur ou mot de passe incorrect`;
                res.json(message);
            }else{
                res.json(findUser)
            }
        }
    }
}

export default user