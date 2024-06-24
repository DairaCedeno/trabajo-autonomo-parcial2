import express from 'express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { mergeResolvers } from '@graphql-tools/merge';
import { graphqlHTTP } from 'express-graphql';
import fs from 'fs';
import path from 'path';

// importar resolvers
import { empleadoResolvers } from './resolvers/empleadoResolver';
import { categoriaResolvers } from './resolvers/categoriaResolver';
import { clienteResolvers } from './resolvers/clientResolver';

// Leer el esquema desde el archivo .graphql
const typeDefs = fs.readFileSync(path.join(__dirname, 'schema', 'schema.graphql'), 'utf8');


// Merge de los resolvers
const resolvers = mergeResolvers([
  empleadoResolvers,
  categoriaResolvers,
  clienteResolvers,
]);



const schema = makeExecutableSchema({ typeDefs, resolvers });

// Crear el servidor Express
const app = express();
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(5050, () => {
  console.log(`Servidor GraphQL ejecutándose en http://localhost:5050/graphql`);
});
 