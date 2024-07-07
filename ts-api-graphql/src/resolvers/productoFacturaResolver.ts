import { PubSub } from "graphql-subscriptions";
import { 
  getProductosFacturas, 
  getProductoFactura, 
  createProductoFactura, 
  updateProductoFactura, 
  deleteProductoFactura 
} from "../services/productoFacturaService";

const pubsub = new PubSub();
const PRODUCTO_FACTURA_ADDED = "PRODUCTO_FACTURA_ADDED";

export const productoFacturaResolvers = {
  Query: {
    getProductoFactura: async (_: any, { id }: { id: number }) => getProductoFactura(id),
    getProductoFacturas: async () => getProductosFacturas(),
  },
  Mutation: {
    createProductoFactura: async (
      _: any,
      {
        cantidad,
        precio,
        tamano,
        peso,
        id_prodcuto,
      }: {
        cantidad: number;
        precio: number;
        tamano: string;
        peso: number;
        id_prodcuto: number;
      }
    ) => {
      const newProductoFactura = await createProductoFactura(
        cantidad,
        precio,
        tamano,
        peso,
        id_prodcuto
      );
      pubsub.publish(PRODUCTO_FACTURA_ADDED, { productoFacturaAdded: newProductoFactura });
      return newProductoFactura;
    },
    updateProductoFactura: async (
      _: any,
      {
        id,
        cantidad,
        precio,
        tamano,
        peso,
        id_prodcuto,
      }: {
        id: number;
        cantidad?: number;
        precio?: number;
        tamano?: string;
        peso?: number;
        id_prodcuto?: number;
      }
    ) => {
      const updatedProductoFactura = await updateProductoFactura(
        id,
        cantidad,
        precio,
        tamano,
        peso,
        id_prodcuto
      );
      return updatedProductoFactura;
    },
    deleteProductoFactura: async (_: any, { id }: { id: number }) => deleteProductoFactura(id),
  },
  Subscription: {
    productoFacturaAdded: {
      subscribe: () => pubsub.asyncIterator([PRODUCTO_FACTURA_ADDED]),
    },
  },
};