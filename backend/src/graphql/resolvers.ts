import Persona from '../models/Persona';

// Definir interfaces para los argumentos
interface PersonaArgs {
  id: string;
}

interface PersonaInputArgs {
  input: {
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    direccion: string;
    telefono: string;
  };
}

interface PersonaUpdateArgs {
  id: string;
  input: {
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    direccion: string;
    telefono: string;
  };
}

// Resolvers para las operaciones GraphQL
const resolvers = {
  Query: {
    // Obtener todas las personas
    personas: async () => {
      return await Persona.findAll();
    },
    
    // Obtener una persona por ID
    persona: async (_: any, { id }: PersonaArgs) => {
      return await Persona.findByPk(id);
    }
  },
  
  Mutation: {
    // Crear una nueva persona
    crearPersona: async (_: any, { input }: PersonaInputArgs) => {
      return await Persona.create(input);
    },
    
    // Actualizar una persona existente
    actualizarPersona: async (_: any, { id, input }: PersonaUpdateArgs) => {
      const persona = await Persona.findByPk(id);
      
      if (!persona) {
        throw new Error(`Persona con ID ${id} no encontrada`);
      }
      
      await persona.update(input);
      return persona;
    },
    
    // Eliminar una persona
    eliminarPersona: async (_: any, { id }: PersonaArgs) => {
      const persona = await Persona.findByPk(id);
      
      if (!persona) {
        throw new Error(`Persona con ID ${id} no encontrada`);
      }
      
      await persona.destroy();
      return true;
    }
  }
};

export default resolvers;