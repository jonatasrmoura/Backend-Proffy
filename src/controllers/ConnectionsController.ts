import { Request, Response } from 'express';

import db from '../database/connection';

export default class ConnectionsController {
    // Método Listar todas conexãoes
    async index(request: Request, response: Response) {
        const totalConnections = await db('connections').count('* as total'); // Vai fazer uma coluno chamada total
    
        // pegar o total, fazendo uma desestruturação, returnando 1 registro , para isso eu preciso pegar a primeira posição do array
        const { total } = totalConnections[0];

        // retornar dentro de um Objeto
        return response.json({ total });
    }

    // Método para criar conexãoes
    async create(request: Request, response: Response) {
        // Pegar ID do usuario
        const { user_id } = request.body;

        await db('connections').insert({
            user_id,
        });
        
        return response.status(201).send();
    }
}