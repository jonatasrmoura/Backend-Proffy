import knex from 'knex';

export async function up(Knex: knex) {
    return Knex.schema.createTable('class_schedule', table => {
        table.increments('id').primary();

        table.integer('week_day').notNullable(); // Um campo que vai de zero a 6, aonde 0 é domingo e 6 é sabado
        table.integer('from').notNullable(); // de que horas  ele começa a atender
        table.integer('to').notNullable(); // até que horario eu atendo

        // fazer um relacionamento
        // Salvar o usuário que vai dar a aula
        table.integer('class_id')
            .notNullable()
            .references('id')
            .inTable('classes')

            // Se eu altero o id do usuário, ele automaticamnete reflete a alteração em todos os lugares daquela informação
            .onUpdate('CASCADE')
            .onDelete('CASCADE'); // agora se isso for deletado da plataforma, as aulas dele somem
    });
};

export async function down(Knex: knex) {
    return Knex.schema.dropTable('class_schedule');
};