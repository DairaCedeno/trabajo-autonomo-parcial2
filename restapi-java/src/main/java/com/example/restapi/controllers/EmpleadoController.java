package com.example.restapi.controllers;

import com.example.restapi.models.EmpleadoModel;
import com.example.restapi.services.EmpleadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;

@RestController
@RequestMapping("/empleados")
public class EmpleadoController {
    @Autowired
    private EmpleadoService empleadoService;
    // Method to get all employees
    @GetMapping
    public ArrayList<EmpleadoModel> getEmpleados() {
        // if not exist employees, return an empty list
        if (this.empleadoService.getEmpleados().isEmpty()) {
            //add a message to the res, if there are no employees
            ArrayList<EmpleadoModel> emptyList = new ArrayList<EmpleadoModel>();
            EmpleadoModel empty = new EmpleadoModel();
            empty.setNombre("No hay empleados");
            emptyList.add(empty);
            return emptyList;
        }
        return this.empleadoService.getEmpleados();
    }
    // Method to get an employee by id
    @GetMapping("/{id}")
    public Optional<EmpleadoModel> getEmpleadoById(@PathVariable Long id) {
        // if not exist employee, return an empty employee
        if (this.empleadoService.getEmpleadoById(id).isEmpty()) {
            Optional<EmpleadoModel> empty = Optional.of(new EmpleadoModel());
            empty.get().setNombre("No existe el empleado");
            return empty;
        }
        return this.empleadoService.getEmpleadoById(id);
    }

    //@requestBody is used to bind the request body with a method parameter.
    //@PostMapping is used to handle POST requests.
    @PostMapping
    public EmpleadoModel saveEmpleado(@RequestBody EmpleadoModel empleado) {
        // validations for the employee
        if (empleado.getNombre() == null || empleado.getApellido() == null || empleado.getCedulaIdentidad() == null
                || empleado.getTelefono() == null || empleado.getDireccion() == null) {
            empleado.setNombre("Todos los campos son requeridos");
            return empleado;
        }
        if (empleado.getCedulaIdentidad().length() < 10) {
            empleado.setNombre("Cedula de identidad debe tener 10 digitos");
            return empleado;
        }
        if (empleado.getTelefono().length() < 10) {
            empleado.setNombre("Telefono debe tener 10 digitos");
            return empleado;
        }
        if (empleado.getNombre().length() < 3 || empleado.getApellido().length() < 3) {
            empleado.setNombre("Nombre y apellido deben tener al menos 3 caracteres");
            return empleado;
        }
        if (this.empleadoService.getEmpleadoByCedulaIdentidad(empleado.getCedulaIdentidad()).isPresent()) {
            empleado.setNombre("Ya existe un empleado con esa cedula de identidad");
            return empleado;
        }
        return this.empleadoService.saveEmpleado(empleado);
    }

    @PutMapping("{id}")
    public Optional<EmpleadoModel> updateEmpleado(@RequestBody EmpleadoModel empleado, @PathVariable Long id) {
        Optional<EmpleadoModel> empleadoToUpdate = this.empleadoService.getEmpleadoById(id);
        if (empleadoToUpdate == null) {
            // if not exist employee, return empty employee
            EmpleadoModel empty = new EmpleadoModel();
            empty.setNombre("No existe el empleado");
            return Optional.of(empty);
        }
        if (empleado.getNombre() != null) {
            empleadoToUpdate.get().setNombre(empleado.getNombre());
        }
        if (empleado.getApellido() != null) {
            empleadoToUpdate.get().setApellido(empleado.getApellido());
        }
        if (empleado.getCedulaIdentidad() != null) {
            empleadoToUpdate.get().setCedulaIdentidad(empleado.getCedulaIdentidad());
        }
        if (empleado.getTelefono() != null) {
            empleadoToUpdate.get().setTelefono(empleado.getTelefono());
        }
        if (empleado.getDireccion() != null) {
            empleadoToUpdate.get().setDireccion(empleado.getDireccion());
        }
        this.empleadoService.saveEmpleado(empleadoToUpdate.get());
        return empleadoToUpdate;
    }

    @DeleteMapping("{id}")
    public String deleteEmpleado(@PathVariable Long id) {
        if (this.empleadoService.getEmpleadoById(id).isEmpty()) {
            return "No existe el empleado";
        }
        this.empleadoService.deleteEmpleado(id);
        return "Empleado eliminado";
    }
}
