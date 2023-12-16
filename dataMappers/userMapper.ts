import { QueryResult } from 'pg';
import client from '../data/client';

interface User {
    id: number;
    name: string;
    mail: string;
    password: string;
    statut: string;
}


interface UserMapper {
    fetchUser: (mail: string) => Promise<User | null>;
}

const userMapper: UserMapper = {
    fetchUser: async (mail) => {
        try {
            const query: string = `SELECT * FROM "user" WHERE mail = $1`;
            const values = [mail];
            const result: QueryResult = await client.query(query, values);
            if (result.rows.length > 0) {
                return result.rows[0] as User; 
            } else {
                return null;
            }
        } catch (error) {
            console.error("Erreur lors de la recherche de l'utilisateur", error);
            throw error;
        }
    },
};

export default userMapper;