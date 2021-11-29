package com.tienda.tienda.repository.crud;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.tienda.tienda.model.FragranceModel;

public interface FragranceCrudRepository extends MongoRepository <FragranceModel, String> {
    
}
