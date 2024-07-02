import axios from 'axios';
import { data } from '../config';

const API_BASE_URL = data.URL_API_JAVA;


// en este archivo se definen los servicios para la entidad cliente de la api de java

/*
para la api de python, las entidades existentes son:
- productoFactura
- factura
- producto

para la api de java, las entidades existentes son:
- clientes
- empleados
- categorias

los endpoints de la api de java entidad cliente son:
- GET /clientes
- GET /clientes/{id}
- POST /clientes
- PUT /clientes/{id}
- DELETE /clientes/{id}
*/

// obtener un cliente por id
export const getCliente = async (id: number) => {
  const response = await axios.get(`${API_BASE_URL}/clientes/${id}`);
  return response.data;
};

// obtener todos los clientes
export const getClientes = async () => {
  const response = await axios.get(`${API_BASE_URL}/clientes`);
  return response.data;
};

// crear un cliente
export const createCliente = async (nombre: string, apellido: string, cedulaIdentidad: string, telefono: string, direccion: string, email: string) => {
  const response = await axios.post(`${API_BASE_URL}/clientes`, 
    { nombre, apellido, cedulaIdentidad, telefono, direccion, email }
  );
  return response.data;
};

// actualizar un cliente
export const updateCliente = async (id: number, nombre?: string, apellido?: string, cedulaIdentidad?: string, telefono?: string, direccion?: string, email?: string) => {
  const response = await axios.put(`${API_BASE_URL}/clientes/${id}`, { nombre, apellido, cedulaIdentidad, telefono, direccion, email });
  return response.data;
};

// eliminar un cliente
export const deleteCliente = async (id: number) => {
  const response = await axios.delete(`${API_BASE_URL}/clientes/${id}`);
  return response.data;
};
