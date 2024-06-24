package com.example.restapi.controllers;

import com.example.restapi.models.CategoriaModel;
import com.example.restapi.services.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;

@RestController
@RequestMapping("/categorias")
public class CategoriaController {
    @Autowired
    private CategoriaService categoriaService;

    @GetMapping
    public ArrayList<CategoriaModel> getCategorias() {
        // if not exist categories, return an empty list
        if (this.categoriaService.getCategorias().isEmpty()) {
            //add a message to the res, if there are no categories
            ArrayList<CategoriaModel> emptyList = new ArrayList<CategoriaModel>();
            CategoriaModel empty = new CategoriaModel();
            empty.setNombre("No hay categorias");
            //add the empty category to the list
            emptyList.add(empty);
            return emptyList;
        }
        return this.categoriaService.getCategorias();
    }

    @GetMapping("/{id}")
    public Optional<CategoriaModel> getCategoriaById(@PathVariable Long id) {
        // if not exist category, return an empty category
        if (this.categoriaService.getCategoriaById(id).isEmpty()) {
            Optional<CategoriaModel> empty = Optional.of(new CategoriaModel());
            empty.get().setNombre("No existe la categoria");
            return empty;
        }
        return this.categoriaService.getCategoriaById(id);
    }

    //@requestBody is used to bind the request body with a method parameter.
    //@PostMapping is used to handle POST requests.
    @PostMapping
    public CategoriaModel saveCategoria(@RequestBody CategoriaModel categoria) {
        return this.categoriaService.saveCategoria(categoria);
    }

    @PutMapping("/{id}")
    public Optional<CategoriaModel> updateCategoria(@RequestBody CategoriaModel categoria, @PathVariable Long id) {
        Optional<CategoriaModel> categoriaToUpdate = this.categoriaService.getCategoriaById(id);
        if (categoriaToUpdate == null) {
            // if not exist category, return empty category
            CategoriaModel empty = new CategoriaModel();
            empty.setNombre("No existe la categoria");
            return Optional.of(empty);
        }
        categoriaToUpdate.get().setNombre(categoria.getNombre());
        categoriaToUpdate.get().setEstado(categoria.getEstado());
        categoriaToUpdate.get().setTipo(categoria.getTipo());
        this.categoriaService.saveCategoria(categoriaToUpdate.get());
        return categoriaToUpdate;
    }

    @DeleteMapping("/{id}")
    public String deleteCategoria(@PathVariable Long id) {
        if (this.categoriaService.getCategoriaById(id).isEmpty()) {
            return "No existe la categoria";
        }
        this.categoriaService.deleteCategoria(id);
        return "Categoria eliminada";
    }
}
