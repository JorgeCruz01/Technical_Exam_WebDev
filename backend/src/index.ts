import express from 'express';
import type { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { json } from 'body-parser';
import sequelize, { testConnection } from './config/database';
import schema from './graphql/schema';
import { environment } from './config/environment';
import Persona from './models/Persona';

// Crear la aplicación Express
const app: Express = express();

// Configurar middlewares
app.use(cors());
app.use(json());

// Crear el servidor Apollo con configuración específica
const server = new ApolloServer({
  schema,
  context: ({ req }) => ({
    // Aquí puedes agregar contexto adicional si es necesario
  }),
  // Configuración adicional para mejorar la seguridad y el rendimiento
  introspection: environment.nodeEnv === 'development', // Habilitar introspection solo en desarrollo
  formatError: (error) => {
    // Formatear errores para producción
    if (environment.nodeEnv === 'production') {
      return {
        message: 'Internal server error',
        path: error.path
      };
    }
    return error;
  }
});

// Función para inicializar el servidor
async function startServer(): Promise<void> {
  try {
    // Probar conexión a la base de datos
    await testConnection();

    // Sincronizar modelos con la base de datos
    await sequelize.sync({ alter: environment.nodeEnv === 'development' });
    console.log('✅ Base de datos sincronizada');

    // Iniciar Apollo Server
    await server.start();
    
    // Aplicar middleware de Apollo a Express
    server.applyMiddleware({
      app: app as any, // Necesario debido a incompatibilidad de tipos entre versiones
      path: environment.graphqlPath,
      cors: false // Ya estamos usando el middleware de cors de Express
    });

    // Iniciar servidor Express
    const httpServer = app.listen(environment.port, () => {
      console.log(`🚀 Server running on port ${environment.port}`);
      console.log(`📊 GraphQL endpoint: http://localhost:${environment.port}${environment.graphqlPath}`);
    });

    // Manejar cierre graceful del servidor
    const shutdown = async (): Promise<void> => {
      console.log('👋 Shutting down server...');
      await new Promise<void>((resolve) => httpServer.close(() => resolve()));
      await sequelize.close();
      process.exit(0);
    };

    // Manejar señales de terminación
    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);

  } catch (error) {
    console.error('❌ Error starting server:', error);
    process.exit(1);
  }
}

// Iniciar el servidor
startServer();