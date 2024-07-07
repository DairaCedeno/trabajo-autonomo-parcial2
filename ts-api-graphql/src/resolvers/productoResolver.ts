import { PubSub } from "graphql-subscriptions";
import { 
  getProducto, 
  getProductos, 
  createProducto, 
  updateProducto, 
  deleteProducto 
} from "../services/productoService";

/**
 * PubSub es una clase que permite publicar y suscribirse a eventos
 *
 * En este caso, se utiliza para publicar un evento cuando se crea un cliente
 */
const pubsub = new PubSub();
const PRODUCTO_ADDED = "PRODUCTO_ADDED";

// En este archivo se definen los resolvers para la entidad producto
export const productoResolvers = {
  Query: {
    getProducto: async (_: any, { id }: { id: number }) => getProducto(id),
    getProductos: async () => getProductos(),
  },
  // Mutation es un objeto que contiene funciones que representan los endpoints de la API
  Mutation: {
    // createProducto es una función que recibe los argumentos nombre, precio, stock, estado y categoriaId y llama a la función createProducto del archivo productoService.ts
    createProducto: async (
      _: any,
      {
        nombre,
        precio,
        stock,
        categoria,
      }: {
        nombre: string;
        precio: number;
        stock: number;
        categoria: number;
      }
    ) => {
      const newProducto = await createProducto(
        nombre,
        precio,
        stock,
        categoria
      );
      pubsub.publish(PRODUCTO_ADDED, { productoAdded: newProducto });
      return newProducto;
    },
    // updateProducto es una función que recibe los argumentos id, nombre, precio, stock, estado y categoriaId y llama a la función updateProducto del archivo productoService.ts
    updateProducto: async (
      _: any,
      {
        id,
        nombre,
        precio,
        stock,
        categoria,
      }: {
        id: number;
        nombre?: string;
        precio?: number;
        stock?: number;
        categoria?: number;
      }
    ) => {
      const updatedProducto = await updateProducto(
        id,
        nombre,
        precio,
        stock,
        categoria
      );
      return updatedProducto;
    },
    // deleteProducto es una función que recibe el argumento id y llama a la función deleteProducto del archivo productoService.ts
    deleteProducto: async (_: any, { id }: { id: number }) => {
      const deletedProducto = await deleteProducto(id);
      return deletedProducto;
    },
  },
  Subscription: {
    productoAdded: {
      subscribe: () => pubsub.asyncIterator([PRODUCTO_ADDED]),
    },
  },
};



