import axios from "axios";

import { data } from "../config";

const API_BASE_URL = data.URL_API_PYTHON;

// obtener factura por id
export const getFactura = async (id: number) => {
  const response = await axios.get(`${API_BASE_URL}/api/facturas/${id}`);
  const factura = response.data;
  const productosFacturaResponse = await axios.get(
    `${data.URL_API_PYTHON}/api/facturas/${id}/`
  );
  //empleado 
  const empleadoResponse = await axios.get(`${data.URL_API_JAVA}/empleados/${factura.empleado}`);
  const empleado = empleadoResponse.data;
  //cliente
  const clienteResponse = await axios.get(`${data.URL_API_JAVA}/clientes/${factura.cliente}`);
  const cliente = clienteResponse.data;
  return { ...factura, productosFactura: productosFacturaResponse.data, empleado: empleado, cliente: cliente };
}

export const getFacturas = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/facturas/`);
  const facturas = response.data;
  const facturasProductos = await Promise.all(
    facturas.map(async (factura: any) => {
      const productosFacturaResponse = await axios.get(
        `${data.URL_API_PYTHON}/api/productosfactura/byfactura/${factura.id_factura}/`
      );
      //empleado 
      const empleadoResponse = await axios.get(`${data.URL_API_JAVA}/empleados/${factura.empleado}`);
      const empleado = empleadoResponse.data;
      //cliente
      const clienteResponse = await axios.get(`${data.URL_API_JAVA}/clientes/${factura.cliente}`);
      const cliente = clienteResponse.data;
      return { ...factura, productos: productosFacturaResponse.data, empleado: empleado, cliente: cliente };
    })
  );
  return facturasProductos;

}
export const createFactura = async (fecha: string, total: number, descuento: number, cliente: number, empleado: number) => {
  const response = await axios.post(`${API_BASE_URL}/api/facturas/`, { fecha, total, cliente, empleado,descuento });
  return response.data;
}

export const updateFactura = async (id: number, fecha?: string, total?: number,descuento?: number, cliente?: number, empleado?: number) => {
  const facturaBefore = await axios.get(`${API_BASE_URL}/api/facturas/${id}`);
  const facturaPre = facturaBefore.data;
  if (!fecha) fecha = facturaPre.fecha;
  if (!total) total = facturaPre.total;
  if (!cliente) cliente = facturaPre.cliente;
  if (!empleado) empleado = facturaPre.empleado;

  const response = await axios.put(`${API_BASE_URL}/api/facturas/${id}`, { fecha, total, cliente, empleado, descuento });
  const factura = response.data;
  const productosFacturaResponse = await axios.get(
    `${data.URL_API_PYTHON}/api/productosfactura/byfactura/${id}/`
  );
  return { ...factura, productosFactura: productosFacturaResponse.data };
}

export const deleteFactura = async (id: number) => {
  const response = await axios.delete(`${API_BASE_URL}/api/facturas/${id}`);
  return response.data;
}