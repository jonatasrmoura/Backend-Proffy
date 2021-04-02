import Knex from 'knex';

// aqui eu faço as alterações
export async function up(Knex: Knex) {
    // criar um nova tabela
    return Knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('avatar').notNullable();
        table.string('whatsapp').notNullable();
        table.string('bio').notNullable();
    });
}

// Aqui eu disfaço as alterações que eu fiz no banco
// casos de algum erro.
export async function down(Knex: Knex) {
    // exclui a tabela
    return Knex.schema.dropTable('users');
}