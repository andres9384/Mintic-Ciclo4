package com.tienda.tienda.repository.crud;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

import com.tienda.tienda.model.FragranceModel;

public interface FragranceCrudRepository extends MongoRepository <FragranceModel, String> {
    public List<FragranceModel>findByPriceLessThanEqual(double precio);

    @Query("{'description':{'$regex':'?0','$options':'i'}}")
    public List<FragranceModel>findByDescriptionLike(String descripcion);

}
