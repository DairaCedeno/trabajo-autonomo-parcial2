package com.example.restapi.services;

import com.example.restapi.models.CategoriaModel;
import com.example.restapi.repositories.ICategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.Optional;

@Service
public class CategoriaService {
    @Autowired
    ICategoriaRepository categoriaRepository;

    // Method to get all categories
    public ArrayList<CategoriaModel> getCategorias() {
        return (ArrayList<CategoriaModel>) categoriaRepository.findAll();
    }

    // Method to get a category by id
    public Optional<CategoriaModel> getCategoriaById(Long id) {
        return categoriaRepository.findById(id);
    }

    // Method to save a category
    public CategoriaModel saveCategoria(CategoriaModel categoria) {
        return categoriaRepository.save(categoria);
    }

    // Method to delete a category by id
    public void deleteCategoria(Long id) {
        categoriaRepository.deleteById(id);
    }
}
