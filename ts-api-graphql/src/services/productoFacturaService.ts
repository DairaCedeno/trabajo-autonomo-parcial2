import axios from "axios";
import { data } from "../config";

const API_BASE_URL = data.URL_API_PYTHON;

// obtener productoFactura por id
export const getProductoFactura = async (id: number) => {
  const response = await axios.get(`${API_BASE_URL}/api/productosfactura/${id}`);


  const responseProuctoFactura = response.data
  const productoID = responseProuctoFactura.producto;
  const productoResponse = await axios.get(`${API_BASE_URL}/api/productos/${productoID}`);
  const producto = productoResponse.data;

  //facturas que tiene
  const facturasResponse = await axios.get(`${data.URL_API_PYTHON}/api/facturas/byproductofactura/${id}/`);
  const facturas = facturasResponse.data;

  return { ...responseProuctoFactura, producto: producto, factura: facturas};
};

// obtener todos los productosFactura
export const getProductosFacturas = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/productosfactura/`);
  const productosFactura = response.data;
  const productosFacturaProductos = await Promise.all(
    productosFactura.map(async (productoFactura: any) => {
      const productoID = productoFactura.producto;
      const productoResponse = await axios.get(`${API_BASE_URL}/api/productos/${productoID}`);
      const producto = productoResponse.data;
      //facturas que tiene
      const facturasResponse = await axios.get(`${data.URL_API_PYTHON}/api/facturas/byproductofactura/${productoFactura.id_producto_factura}/`);
      const facturas = facturasResponse.data;
      return { ...productoFactura, producto: producto, factura: facturas };
    })
  );
  return productosFacturaProductos;

}

export const createProductoFactura = async (cantidad: number, precio: number, tamano: string, peso: number, id_prodcuto: number ) => {

  const response = await axios.post(`${API_BASE_URL}/api/productosfactura/`, { cantidad, precio, tamano, peso, id_prodcuto });
  const productoFactura = response.data;
}

export const updateProductoFactura = async (id: number, cantidad?: number, precio?: number, tamano?: string, peso?: number, id_prodcuto?: number) => {
  const productoFacturaBefore = await axios.get(`${API_BASE_URL}/api/productosfactura/${id}`);
  const productoFactura = productoFacturaBefore.data;
  if (!cantidad) cantidad = productoFactura.cantidad;
  if (!precio) precio = productoFactura.precio;
  if (!tamano) tamano = productoFactura.tamano;
  if (!peso) peso = productoFactura.peso;
  if (!id_prodcuto) id_prodcuto = productoFactura.id_prodcuto;

  const response = await axios.put(`${API_BASE_URL}/api/productosfactura/${id}`, { cantidad, precio, tamano, peso, id_prodcuto });
  const productoFacturaResponse = response.data;
  const productoID = productoFacturaResponse.producto;
  const productoResponse = await axios.get(`${API_BASE_URL}/api/productos/${productoID}`);
  const producto = productoResponse.data;
  return { ...productoFacturaResponse, producto: producto };

}

export const deleteProductoFactura = async (id: number) => {
  const response = await axios.delete(`${API_BASE_URL}/api/productosfactura/${id}`);
  return response.data;
}