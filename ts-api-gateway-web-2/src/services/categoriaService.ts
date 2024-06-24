import axios from "axios";
import { data } from "../config";

// en este archivo se definen los servicios para la entidad categoria de la api de java

/*
para la api de python, las entidades existentes son:
- productoFactura
- factura
- producto

para la api de java, las entidades existentes son:
- clientes
- empleados
- categorias

los endpoints de la api de java entidad categoria son:
- GET /categorias
- GET /categorias/{id}
- POST /categorias
- PUT /categorias/{id}
- DELETE /categorias/{id}
*/

const API_BASE_URL = data.URL_API_JAVA;

// obtener una categoria por id
export const getCategoria = async (id: number) => {
  const response = await axios.get(`${API_BASE_URL}/categorias/${id}`);
  return response.data;
}

// obtener todas las categorias
export const getCategorias = async () => {
  const response = await axios.get(`${API_BASE_URL}/categorias`);
  return response.data;
}

// crear una categoria
export const createCategoria = async (nombre: string, estado: string, tipo: string) => {
  const response = await axios.post(`${API_BASE_URL}/categorias`, { nombre, estado, tipo });
  return response.data;
}

// actualizar una categoria
export const updateCategoria = async (id: number, nombre?: string, estado?: string, tipo?: string) => {
  const response = await axios.put(`${API_BASE_URL}/categorias/${id}`, { nombre, estado, tipo });
  return response.data;
}

// eliminar una categoria
export const deleteCategoria = async (id: number) => {
  const response = await axios.delete(`${API_BASE_URL}/categorias/${id}`);
  return response.data;
}