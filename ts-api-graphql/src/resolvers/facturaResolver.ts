import { getFactura, createFactura, deleteFactura, getFacturas, updateFactura } from "../services/facturaService";
import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();
const FACTURA_ADDED = "FACTURA_ADDED";
/* const FACTURA_UPDATED = "FACTURA_UPDATED";
const FACTURA_DELETED = "FACTURA_DELETED"; */

export const facturaResolvers = {
  Query: {
    getFactura: async (_: any, { id }: { id: number }) => getFactura(id),
    getFacturas: async () => getFacturas(),
  },
  Mutation: {
    createFactura: async (
      _: any,
      {
        fecha,
        total,
        descuento,
        cliente,
        empleado,
      }: {
        fecha: string;
        total: number;
        descuento: number;
        cliente: number;
        empleado: number;
      }
    ) => {
      const newFactura = await createFactura(
        fecha,
        total,
        descuento,
        cliente,
        empleado
      );
      pubsub.publish(FACTURA_ADDED, { facturaAdded: newFactura });
      return newFactura;
    },
    updateFactura: async (
      _: any,
      {
        id,
        fecha,
        total,
        descuento,
        cliente,
        empleado,
      }: {
        id: number;
        fecha?: string;
        total?: number;
        descuento?: number;
        cliente?: number;
        empleado?: number;
      }
    ) => {
      const updatedFactura = await updateFactura(
        id,
        fecha,
        total,
        descuento,
        cliente,
        empleado
      );
      // pubsub.publish(FACTURA_UPDATED, { facturaUpdated: updatedFactura });
      return updatedFactura;
    },
    deleteFactura: async (
      _: any,
      { id }: { id: number }
    ) => {
      const deletedFactura = await deleteFactura(id);
      //pubsub.publish(FACTURA_DELETED, { facturaDeleted: deletedFactura });
      return deletedFactura;
    },
  },
  Subscription: {
    facturaAdded: {
      subscribe: () => pubsub.asyncIterator([FACTURA_ADDED]),
    }
  },
};