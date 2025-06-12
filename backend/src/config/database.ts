import { Sequelize } from 'sequelize';
import path from 'path';

// Crear una instancia de Sequelize conectada a SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../../database.sqlite'), // Ruta al archivo de la base de datos
  logging: false // Desactivar logs de SQL en consola
});

// Función para probar la conexión
export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
};

export default sequelize;