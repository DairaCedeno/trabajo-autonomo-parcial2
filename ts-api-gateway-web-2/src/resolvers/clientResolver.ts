import { PubSub } from 'graphql-subscriptions';
import { getCliente, createCliente, deleteCliente, getClientes, updateCliente } from '../services/clientService';

/**
 * PubSub es una clase que permite publicar y suscribirse a eventos
 * 
 * En este caso, se utiliza para publicar un evento cuando se crea un cliente
 */
const pubsub = new PubSub();
const CLIENTE_ADDED = 'CLIENTE_ADDED';
// En este archivo se definen los resolvers para la entidad cliente
export const clienteResolvers = {
  Query: {
    getCliente: async (_: any,{ id }: { id: number }) => getCliente(id),
    getClientes: async () => getClientes(),
  },
  // Mutation es un objeto que contiene funciones que representan los endpoints de la API 
  Mutation: {
    // createCliente es una función que recibe los argumentos nombre, apellido, CI, telefono, direccion y email y llama a la función createCliente del archivo clientService.ts
    createCliente: async (_: any, { nombre, apellido, cedulaIdentidad, telefono, direccion, email }: { nombre: string, apellido: string, cedulaIdentidad: string, telefono: string, direccion: string, email: string }) => {
      const newCliente = await createCliente(nombre, apellido, cedulaIdentidad, telefono, direccion, email);
      pubsub.publish(CLIENTE_ADDED, { clienteAdded: newCliente });
      return newCliente;
    },
    // updateCliente es una función que recibe los argumentos id, nombre, apellido, CI, telefono, direccion y email y llama a la función updateCliente del archivo clientService.ts

    updateCliente: async (_: any, { id, nombre, apellido, cedulaIdentidad, telefono, direccion, email }: { id: number, nombre?: string, apellido?: string, cedulaIdentidad?: string, telefono?: string, direccion?: string, email?: string }) => updateCliente(id, nombre, apellido, cedulaIdentidad, telefono, direccion, email),
    // deleteCliente es una función que recibe el argumento id y llama a la función deleteCliente del archivo clientService.ts
    deleteCliente: async (_: any, { id }: { id: number }) => deleteCliente(id),
  },
  Subscription: {
    clienteAdded: {
      subscribe: () => pubsub.asyncIterator([CLIENTE_ADDED]),
    },
  },
};
