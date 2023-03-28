package com.example.application;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EdificioRepository extends JpaRepository<Edificio, Integer> {
   
     
    Optional<Edificio>findById(Integer id);
}