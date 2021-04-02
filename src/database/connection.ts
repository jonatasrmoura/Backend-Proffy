// conexão com o banco
import knex from 'knex';
// para ultilizar caminhos dentro do node
// mostrar os arquivos, aonde deve ficar um pasta ou um arquivo
import path from 'path';

// migrations - controlam a versão do banco de dados

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite')
    } ,
    useNullAsDefault: true,
});

export default db;