import knex from 'knex';

export async function up(Knex: knex) {
    return Knex.schema.createTable('classes', table => {
        table.increments('id').primary();
        table.string('subject').notNullable();
        table.decimal('cost').notNullable();

        // fazer um relacionamento
        // Salvar o usuário que vai dar a aula
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')

            // Se eu altero o id do usuário, ele automaticamnete reflete a alteração em todos os lugares daquela informação
            .onUpdate('CASCADE')
            /* O que vai acontecer com as alunas de um professor 
            caso esse professor seja deletado na plataforma */
            .onDelete('CASCADE'); // agora se um proffy for deletado da plataforma, as aulas dele somem
    });
}

export async function down(Knex: knex) {
    return Knex.schema.dropTable('classes');
};