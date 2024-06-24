package com.example.restapi.services;

import com.example.restapi.models.ClienteModel;
import com.example.restapi.repositories.IClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class ClienteService {
    @Autowired
    IClienteRepository clienteRepository;

    // Method to get all clients
    public ArrayList<ClienteModel> getClientes() {
        return (ArrayList<ClienteModel>) clienteRepository.findAll();
    }

    // Method to get a client by id
    public Optional<ClienteModel> getClienteById(Long id) {
        return clienteRepository.findById(id);
    }

    // Method to save a client
    public ClienteModel saveCliente(ClienteModel cliente) {
        return clienteRepository.save(cliente);
    }

    // Method to delete a client by id
    public void deleteCliente(Long id) {
        clienteRepository.deleteById(id);
    }

    public Optional<Object> getClienteByCedulaIdentidad(String cedulaIdentidad) {
        return clienteRepository.findByCedulaIdentidad(cedulaIdentidad);
    }
}
