package com.example.restapi.repositories;

import com.example.restapi.models.EmpleadoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Optional;

@Repository
public interface IEmpleadoRepository extends JpaRepository<EmpleadoModel, Long> {
    ArrayList<EmpleadoModel> findAll();
    // method to get an employee by id
    Optional<EmpleadoModel> findById(Long id);
    // method to save an employee
    EmpleadoModel save(EmpleadoModel empleado);
    // method to delete an employee by id
    void deleteById(Long id);

    Optional<Object> findByCedulaIdentidad(String cedulaIdentidad);
}
