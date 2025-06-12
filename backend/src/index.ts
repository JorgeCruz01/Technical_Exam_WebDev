import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { json } from 'body-parser';
import sequelize, { testConnection } from './config/database';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';
import Persona from './models/Persona';

// Función asíncrona para iniciar el servidor
async function startServer() {
  // Crear aplicación Express
  const app = express();
  
  // Middlewares
  app.use(cors());
  app.use(json());
  
  // Probar conexión a la base de datos
  await testConnection();
  
  // Sincronizar modelos con la base de datos
  await sequelize.sync({ force: true }); // force: true recrea las tablas (solo para desarrollo)
  
  // Datos de ejemplo
  await Persona.create({
    nombres: 'Juan Carlos',
    apellidoPaterno: 'Pérez',
    apellidoMaterno: 'García',
    direccion: 'Calle Principal 123',
    telefono: '555-123-4567'
  });
  
  await Persona.create({
    nombres: 'María Elena',
    apellidoPaterno: 'López',
    apellidoMaterno: 'Martínez',
    direccion: 'Avenida Central 456',
    telefono: '555-987-6543'
  });
  
  // Crear servidor Apollo
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // Simplificar el contexto para evitar problemas de tipos
    context: () => ({})
  });
  
  // Iniciar servidor Apollo
  await server.start();
  
  // Aplicar middleware de Apollo a Express
  server.applyMiddleware({ app: app as any });
  
  // Puerto del servidor
  const PORT = process.env.PORT || 3000;
  
  // Iniciar servidor Express
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`GraphQL disponible en http://localhost:${PORT}${server.graphqlPath}`);
  });
}

// Iniciar el servidor
startServer().catch(error => {
  console.error('Error al iniciar el servidor:', error);
});