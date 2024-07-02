package com.example.restapi.controllers;

import com.example.restapi.models.ClienteModel;
import com.example.restapi.services.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;

@RestController
@RequestMapping("/clientes")
public class ClienteController {
  @Autowired
  private ClienteService clienteService;

  @GetMapping
  public ArrayList<ClienteModel> getClientes() {
    // if not exist clients, return an empty list
    if (this.clienteService.getClientes().isEmpty()) {
      // add a message to the res, if there are no clients
      ArrayList<ClienteModel> emptyList = new ArrayList<ClienteModel>();
      ClienteModel empty = new ClienteModel();
      // add the empty client to the list
      empty.setNombre("No hay clientes");
      emptyList.add(empty);
      return emptyList;
    }
    return this.clienteService.getClientes();
  }

  @GetMapping("/{id}")
  public Optional<ClienteModel> getClienteById(@PathVariable Long id) {
    // if not exist client, return an empty client
    if (this.clienteService.getClienteById(id).isEmpty()) {
      Optional<ClienteModel> empty = Optional.of(new ClienteModel());
      empty.get().setNombre("No existe el cliente");
      return empty;
    }
    return this.clienteService.getClienteById(id);
  }

  // @requestBody is used to bind the request body with a method parameter.
  // @PostMapping is used to handle POST requests.
  @PostMapping
  public ClienteModel saveCliente(@RequestBody ClienteModel cliente) {
    // validations for the client
    if (cliente.getNombre() == null || cliente.getApellido() == null || cliente.getCedulaIdentidad() == null
            || cliente.getTelefono() == null || cliente.getDireccion() == null) {
      cliente.setNombre("Todos los campos son requeridos");
      return cliente;
    }
    if (cliente.getCedulaIdentidad().length() < 10) {
      cliente.setNombre("Cedula de identidad debe tener 10 digitos");
      return cliente;
    }
    if (cliente.getTelefono().length() < 10) {
      cliente.setNombre("Telefono debe tener 10 digitos");
      return cliente;
    }
    if (cliente.getNombre().length() < 3 || cliente.getApellido().length() < 3) {
      cliente.setNombre("Nombre y apellido deben tener al menos 3 caracteres");
      return cliente;
    }
    if (this.clienteService.getClienteByCedulaIdentidad(cliente.getCedulaIdentidad()).isPresent()) {
      cliente.setNombre("Ya existe un cliente con esa cedula de identidad");
      return cliente;
    }
    // email validation
    if (cliente.getEmail() != null) {
      if (!cliente.getEmail().matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$")) {
        cliente.setNombre("Email invalido");
        return cliente;
      }
    }
    return this.clienteService.saveCliente(cliente);
  }

  @PutMapping("/{id}")
  public Optional<ClienteModel> updateCliente(@RequestBody ClienteModel cliente, @PathVariable Long id) {
    Optional<ClienteModel> clienteToUpdate = this.clienteService.getClienteById(id);
    if (clienteToUpdate == null) {
      // if not exist client, return empty client
      ClienteModel empty = new ClienteModel();
      empty.setNombre("No existe el cliente");
      return Optional.of(empty);
    }
    if (cliente.getNombre() != null) {
      clienteToUpdate.get().setNombre(cliente.getNombre());
    }
    if (cliente.getApellido() != null) {
      clienteToUpdate.get().setApellido(cliente.getApellido());
    }
    if (cliente.getCedulaIdentidad() != null) {
      clienteToUpdate.get().setCedulaIdentidad(cliente.getCedulaIdentidad());
    }
    if (cliente.getTelefono() != null) {
      clienteToUpdate.get().setTelefono(cliente.getTelefono());
    }
    if (cliente.getEmail() != null) {
      clienteToUpdate.get().setEmail(cliente.getEmail());
    }
    this.clienteService.saveCliente(clienteToUpdate.get());
    return clienteToUpdate;
  }

  @DeleteMapping("{id}")
  public String deleteCliente(@PathVariable Long id) {
    if (this.clienteService.getClienteById(id).isEmpty()) {
      return "No existe el cliente";
    }
    this.clienteService.deleteCliente(id);
    return "Cliente eliminado";
  }
}
