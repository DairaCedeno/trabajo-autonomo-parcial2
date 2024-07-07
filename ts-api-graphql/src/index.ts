import express from 'express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { mergeResolvers } from '@graphql-tools/merge';
import { graphqlHTTP } from 'express-graphql';
import { ApolloServer } from 'apollo-server'; 
// importaciones de nodejs
import fs from 'fs';
import path from 'path';

// importar resolvers
import { empleadoResolvers } from './resolvers/empleadoResolver';
import { categoriaResolvers } from './resolvers/categoriaResolver';
import { clienteResolvers } from './resolvers/clientResolver';
import { productoResolvers } from './resolvers/productoResolver';
import { facturaResolvers } from './resolvers/facturaResolver';
import { productoFacturaResolvers } from './resolvers/productoFacturaResolver';

// Leer el esquema desde el archivo .graphql
const typeDefs = fs.readFileSync(path.join(__dirname, 'schema', 'schema.graphql'), 'utf8');


// Merge de los resolvers
const resolvers = mergeResolvers([
  empleadoResolvers,
  categoriaResolvers,
  clienteResolvers,
  productoResolvers,
  facturaResolvers,
  productoFacturaResolvers
]);



const schema = makeExecutableSchema({ typeDefs, resolvers });

// Crear el servidor Apollo
const server = new ApolloServer({ schema });
server.listen().then(({ url }) => {
  console.log(`Servidor GraphQL ejecutándose en ${url}`);
});
// Crear el servidor Express
/* const app = express();
app.use('/graphql', graphqlHTTP({
  schema,
  // interface grafica de graphql
  graphiql: true,
}));

app.listen(5050, () => {
  console.log(`Servidor GraphQL ejecutándose en http://localhost:5050/graphql`);
});
  */