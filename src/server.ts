// tudo vai partir esse arquivo, ele é o principal arquivo da aplicação BackEnd
import express from 'express';
import cors from 'cors';
import routes from './routes';

// minha aplição
// Todas as rotas, requisissões ...
const app = express();

app.use(cors());
// Para o express endenter o JSON
app.use(express.json());
app.use(routes);

// GET: Buscar ou listar uma informação
// POST: Criar alguma nova informação
// PUT: Atualizar uma informação existente
// DELETE: Deletar uma informação existente
// ex:
    // corpo da requisissão = request.body
    //console.log(request.query);

/* PARÃMETROS */
// Corpo (requist body): Dados para criação ou atualização de um registro
// Route Params: Identificar qual recurso eu quero atualizar ou deletar
// Query Params: Paginação, filtros, orientação











// ele vai ouvir as requisissões HTTP (comunicação)
// endereço localhost:3333
app.listen(3333);

