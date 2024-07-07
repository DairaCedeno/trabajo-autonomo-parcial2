import axios from "axios";
import { data } from "../config";

// en este archivo se definen los servicios para la entidad producto de la api de python

/*
para la api de python, las entidades existentes son:
- productoFactura
- factura
- producto

para la api de java, las entidades existentes son:
- clientes
- empleados
- categorias

los endpoints de la api de python entidad producto son:
- GET /prodcutos
- GET /prodcutos/{id}
- POST /productos
- PUT /productos/{id}
- DELETE /productos/{id}
*/

export const getProducto = async (id: number) => {
  const productResponse = await axios.get(
    `${data.URL_API_PYTHON}/api/productos/${id}/`
  );
  const product = productResponse.data;
  const categoriaID = product.categoria;
  const categoryResponse = await axios.get(
    `${data.URL_API_JAVA}/categorias/${categoriaID}`
  );
  const category = categoryResponse.data;
  // productoFactura
  const productoFacturaResponse = await axios.get(
    `${data.URL_API_PYTHON}/api/productosfactura/byproduct/${id}/`
  );
  const productoFactura = productoFacturaResponse.data;

  const facturaPromises = productoFactura.map(async (pf: any) => {
    console.log("Factura", pf);
    if (pf) {
      const facturaResponse = await axios.get(
        `${data.URL_API_PYTHON}/api/facturas/byproductofactura/${pf.id_producto_factura}/`
      );
      return {
        ...pf,
        factura: facturaResponse.data,
      };
    }
    return pf;
  });

  const productoFacturaWithFacturas = await Promise.all(facturaPromises);
  return {
    ...productResponse.data,
    categoria: category,
    productoFactura: productoFacturaWithFacturas,
  };
};

export const getProductos = async () => {
  const productResponse = await axios.get(
    `${data.URL_API_PYTHON}/api/productos/`
  );
  // consultar la categoria de cada producto
  const productsWithCategories = await Promise.all(
    productResponse.data.map(async (product: any) => {
      const categoryResponse = await axios.get(
        `${data.URL_API_JAVA}/categorias/${product.categoria}`
      );
      // agregar la categoria al producto y retornarlo
      return { ...product, categoria: categoryResponse.data };
    })
  );
  return productsWithCategories;
};

export const createProducto = async (
  nombre: string,
  precio: number,
  stock: number,
  categoria: number
) => {
  const response = await axios.post(`${data.URL_API_PYTHON}/api/productos/`, {
    nombre,
    precio,
    stock,
    categoria,
  });
  console.log(response.data);
  const categoriaID = response.data.categoria;
  const categoryResponse = await axios.get(
    `${data.URL_API_JAVA}/categorias/${categoriaID}`
  );
  const category = categoryResponse.data;
  return { ...response.data, categoria: category };
};

export const updateProducto = async (
  id: number,
  nombre?: string,
  precio?: number,
  stock?: number,
  categoria?: number
) => {
  const productBefore = await axios.get(
    `${data.URL_API_PYTHON}/api/productos/${id}/`
  );
  const product = productBefore.data;
  if (!nombre) {
    nombre = product.nombre;
  }
  if (!precio) {
    precio = product.precio;
  }
  if (!stock) {
    stock = product.stock;
  }
  if (!categoria) {
    categoria = product.categoria;
  }

  const response = await axios.put(
    `${data.URL_API_PYTHON}/api/productos/${id}/`,
    { nombre, precio, stock, categoria }
  );
  const categoriaID = response.data.categoria;
  const categoryResponse = await axios.get(
    `${data.URL_API_JAVA}/categorias/${categoriaID}`
  );
  const category = categoryResponse.data;
  return { ...response.data, categoria: category };
};

export const deleteProducto = async (id: number) => {
  const response = await axios.delete(
    `${data.URL_API_PYTHON}/api/productos/${id}/`
  );
  return response.data;
};
