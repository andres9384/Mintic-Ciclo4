package com.tienda.tienda.repository.crud;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import com.tienda.tienda.model.UserModel;

public interface UserCrudRepository extends MongoRepository <UserModel, Integer>{

    
    Optional<UserModel> findByEmail(String email);
    Optional<UserModel> findByEmailAndPassword(String email,String password);
    Optional<UserModel> findTopByOrderByIdDesc();

    List<UserModel> findByMonthBirthtDay(String monthBirthtDay);
  
}
