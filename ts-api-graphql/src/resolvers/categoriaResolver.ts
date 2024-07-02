import { PubSub } from "graphql-subscriptions";
import { getCategoria, createCategoria, deleteCategoria, getCategorias, updateCategoria } from "../services/categoriaService";

/**
 * PubSub es una clase que permite publicar y suscribirse a eventos
 * 
 * En este caso, se utiliza para publicar un evento cuando se crea una categoria
 */
const pubsub = new PubSub();
const CATEGORIA_ADDED = 'CATEGORIA_ADDED';

// En este archivo se definen los resolvers para la entidad categoria

export const categoriaResolvers = {
  Query: {
    getCategoria: async (_: any, { id }: { id: number }) => getCategoria(id),
    getCategorias: async () => getCategorias(),
  },
  // Mutation es un objeto que contiene funciones que representan los endpoints de la API 
  Mutation: {
    // createCategoria es una función que recibe los argumentos nombre, estado y tipo y llama a la función createCategoria del archivo categoriaService.ts
    createCategoria: async (_: any, { nombre, estado, tipo }: { nombre: string, estado: string, tipo: string }) => {
      const newCategoria = await createCategoria(nombre, estado, tipo);
      pubsub.publish(CATEGORIA_ADDED, { categoriaAdded: newCategoria });
      return newCategoria;
    },
    // updateCategoria es una función que recibe los argumentos id, nombre, estado y tipo y llama a la función updateCategoria del archivo categoriaService.ts
    updateCategoria: async (_: any, { id, nombre, estado, tipo }: { id: number, nombre?: string, estado?: string, tipo?: string }) => updateCategoria(id, nombre, estado, tipo),
    // deleteCategoria es una función que recibe el argumento id y llama a la función deleteCategoria del archivo categoriaService.ts
    deleteCategoria: async (_: any, { id }: { id: number }) => deleteCategoria(id),
  },
  Subscription: {
    categoriaAdded: {
      subscribe: () => pubsub.asyncIterator([CATEGORIA_ADDED]),
    },
  },
};