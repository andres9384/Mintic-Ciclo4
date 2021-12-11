package com.tienda.tienda.repository.crud;

import java.util.List;
import java.util.Optional;

import com.tienda.tienda.model.OrderModel;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface OrderCrudRepository extends MongoRepository<OrderModel,Integer>{
    

    @Query("{'salesMan.zone':?0}")
    List<OrderModel>findByZone(final String zone);

    @Query("{status:?0}")
    List<OrderModel>findByStatus(final String status);

    Optional<OrderModel> findTopByOrderByIdDesc();
}
