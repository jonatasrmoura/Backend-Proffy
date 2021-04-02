import { Request, Response } from 'express';

import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';


// define qual que é um formato de um objeto
interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}


export default class ClassesController {
    // Método de Listagem
    async index(request: Request, response: Response) {
        // Listagem das aulas, vai ter 3 filtros dia da semana, materia e o horario
        const filters = request.query;

        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;

        // Se o usuário não informou isso:
        if (!filters.week_day || !filters.subject || !filters.time) {
            return response.status(400).json({
                error: 'Missing filters to search classes'
            })
        }
        
        const timeInMinutes = convertHourToMinutes(time);

        const classes = await db('classes')
        .whereExists(function() {
            // vou fazer um sub-query para ver se tem um horario disponivel para o professor
            this.select('class_schedule.*')
             .from('class_schedule')
             .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
             .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)]) //para passar o parametro precisa de ??. [] como o segundo parametro desse whereRaw. cada posição do array representa um parametro detro do ??.
             .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes]) // Espero que o professor deija dando aula ao horario que eu quero ter uma aula
             .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes]) // Se o professor para de trabalhar 12hora, as pessoas tem que marcarem aulas antes de 12h e não nas 12horas
        })
         .where('classes.subject', '=', subject)
         .join('users', 'classes.user_id', '=', 'users.id')
         .select(['classes.*', 'users.*']);

        return response.json(classes);
    }


    async create(request: Request, response: Response) {
        // Todos os Dados para a criação dessa aula
    
        // Variáveis dos dados
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule,
        } = request.body;
    
        // schema de transaction, para erros, se der um erro ele apaga tudo que foi feito neste contexto, do erro
        const trx = await db.transaction();
    
        try {
                // Inserir o usuário dentro do banco de dados, usando o auto import no db
            const insertedUsersIds = await trx('users').insert({ // O retorno vai ser os ids dos usuários inseridos
                name,
                avatar,
                whatsapp,
                bio,
            });
    
            const user_id = insertedUsersIds[0];
    
    
            const insertedClassesIds = await trx('classes').insert({
                subject,
                cost,
                user_id,
            });
    
            // returna a aula que inseri
            const class_id = insertedClassesIds[0];
    
            // converter as horas das aulas (que esta no banco) em minutos
            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to),
                };
            })
    
            // inserir no banco de Dados
            await trx('class_schedule').insert(classSchedule); // já está mo formato que o banco aceita
    
            // se o código chegar aqui então ele insere tudo ao mesmo tempo no banco de dados
            await trx.commit();
        
            // 201 = Criado com sucesso
            return response.status(201).send();
    
    
        } catch (err) {
            // Se aconteceu um alteração no banco nesse meio tempo, ele vai desfazer
            await trx.rollback();
    
            return response.status(400).json({ // Bad question
                error: 'Unexpected error while creating new class'
            });
        }
    
    }
}