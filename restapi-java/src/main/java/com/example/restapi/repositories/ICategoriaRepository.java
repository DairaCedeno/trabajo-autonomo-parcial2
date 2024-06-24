package com.example.restapi.repositories;

import com.example.restapi.models.CategoriaModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Optional;

@Repository
public interface ICategoriaRepository extends JpaRepository<CategoriaModel, Long> {
    ArrayList<CategoriaModel> findAll();
    // method to get a category by id
    Optional<CategoriaModel> findById(Long id);
    // method to save a category
    CategoriaModel save(CategoriaModel categoria);
    // method to delete a category by id
    void deleteById(Long id);
}
