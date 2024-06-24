package com.example.restapi.repositories;

import com.example.restapi.models.ClienteModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Optional;

@Repository
public interface IClienteRepository extends JpaRepository<ClienteModel, Long> {
    ArrayList<ClienteModel> findAll();
    // method to get a client by id
    Optional<ClienteModel> findById(Long id);
    // method to save a client
    ClienteModel save(ClienteModel cliente);
    // method to delete a client by id
    void deleteById(Long id);

    Optional<Object> findByCedulaIdentidad(String cedulaIdentidad);
}
