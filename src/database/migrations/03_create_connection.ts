/* Aqui vai ser armazenada a informção se o usuário tentou entrar 
em contato com o professor */

import knex from 'knex';

export async function up(Knex: knex) {
    return Knex.schema.createTable('connections', table => {
        table.increments('id').primary();

        // fazer um relacionamento
        // Se um user tentar entrar em contato com um prof
        // Ouve uma conecção com qual professor?
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

        // quando que houve essa conecção?
        // A hora que o user tentou entrar em contato
        table.timestamp('created_at')
            .defaultTo(Knex.raw('CURRENT_TIMESTAMP')) // pega a hora atual e salva no created_at
            .notNullable();
    });
};

export async function down(Knex: knex) {
    return Knex.schema.dropTable('connections')
};