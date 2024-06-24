package com.example.restapi.services;

import com.example.restapi.models.EmpleadoModel;
import com.example.restapi.repositories.IEmpleadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class EmpleadoService {
    // Dependency injection
    @Autowired
    IEmpleadoRepository empleadoRepository;
    // Method to get all employees
    public ArrayList<EmpleadoModel> getEmpleados() {
        return (ArrayList<EmpleadoModel>) empleadoRepository.findAll();
    }

    // Method to get an employee by id
    public Optional<EmpleadoModel> getEmpleadoById(Long id) {
        return empleadoRepository.findById(id);
    }

    // Method to save an employee
    public EmpleadoModel saveEmpleado(EmpleadoModel empleado) {
        return empleadoRepository.save(empleado);
    }

    // Method to delete an employee by id
    public void deleteEmpleado(Long id) {
        empleadoRepository.deleteById(id);
    }

    public Optional<Object> getEmpleadoByCedulaIdentidad(String cedulaIdentidad) {
        return empleadoRepository.findByCedulaIdentidad(cedulaIdentidad);
    }
}
