import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

// Interfaz para definir los atributos de Persona
interface PersonaAttributes {
  id?: number;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  direccion: string;
  telefono: string;
}

// Interfaz para el modelo de Persona
interface PersonaModel extends Model<PersonaAttributes, PersonaAttributes>, PersonaAttributes {}

// Definición del modelo
const Persona = sequelize.define<PersonaModel>('Persona', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombres: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellidoPaterno: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellidoMaterno: {
    type: DataTypes.STRING,
    allowNull: false
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default Persona;