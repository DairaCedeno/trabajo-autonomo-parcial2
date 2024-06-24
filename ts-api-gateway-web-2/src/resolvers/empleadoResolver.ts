import { PubSub } from 'graphql-subscriptions';
import { getEmpleado, createEmpleado, deleteEmpleado, getEmpleados, updateEmpleado } from '../services/empleadoService';
/**
 * PubSub es una clase que permite publicar y suscribirse a eventos
 * 
 * En este caso, se utiliza para publicar un evento cuando se crea un empleado
 */
const pubsub = new PubSub();
const EMPLEADO_ADDED = 'EMPLEADO_ADDED';
// En este archivo se definen los resolvers para la entidad empleado
export const empleadoResolvers = {
  Query: {
    getEmpleado: async (_: any, { id }: { id: number }) => getEmpleado(id),
    getEmpleados: async () => getEmpleados(),
  },
  // Mutation es un objeto que contiene funciones que representan los endpoints de la API
  Mutation: {
    // createEmpleado es una función que recibe los argumentos nombre, apellido, CI, telefono y direccion y llama a la función createEmpleado del archivo empleadoService.ts
    createEmpleado: async (_: any, { nombre, apellido, cedulaIdentidad, telefono, direccion }: { nombre: string, apellido: string, cedulaIdentidad: string, telefono: string, direccion: string }) => {
      const newEmpleado = await createEmpleado(nombre, apellido, cedulaIdentidad, telefono, direccion);
      pubsub.publish(EMPLEADO_ADDED, { empleadoAdded: newEmpleado });
      return newEmpleado;
    },
    // updateEmpleado es una función que recibe los argumentos id, nombre, apellido, CI, telefono y direccion y llama a la función updateEmpleado del archivo empleadoService.ts
    updateEmpleado: async (_: any, { id, nombre, apellido, cedulaIdentidad, telefono, direccion }: { id: number, nombre?: string, apellido?: string, cedulaIdentidad?: string, telefono?: string, direccion?: string }) => updateEmpleado(id, nombre, apellido, cedulaIdentidad, telefono, direccion),
    // deleteEmpleado es una función que recibe el argumento id y llama a la función deleteEmpleado del archivo empleadoService.ts
    deleteEmpleado: async (_: any, { id }: { id: number }) => deleteEmpleado(id),
  },
  Subscription: {
    empleadoAdded: {
      subscribe: () => pubsub.asyncIterator([EMPLEADO_ADDED]),
    },
  },
}