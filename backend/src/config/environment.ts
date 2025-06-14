import dotenv from 'dotenv';
import path from 'path';

// Cargar variables de entorno
dotenv.config();

// Obtener el directorio actual de manera segura
const currentDir = process.cwd();

export const environment = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  dbPath: process.env.DB_PATH || path.resolve(currentDir, 'database.sqlite'),
  graphqlPath: process.env.GRAPHQL_PATH || '/graphql'
};
