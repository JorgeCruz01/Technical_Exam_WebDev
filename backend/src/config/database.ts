import { Sequelize } from 'sequelize';
import path from 'path';
import { environment } from './environment';

// Crear una instancia de Sequelize conectada a SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: environment.dbPath,
  logging: environment.nodeEnv === 'development' // Activar logs solo en desarrollo
});

// Función para probar la conexión
export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida correctamente.');
  } catch (error) {
    console.error('❌ No se pudo conectar a la base de datos:', error);
    process.exit(1); // Salir si no se puede conectar a la base de datos
  }
};

export default sequelize;