package com.tienda.tienda.repository.crud;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import com.tienda.tienda.model.UserModel;

public interface UserCrudRepository extends CrudRepository <UserModel, Integer>{
    Optional<UserModel> findByEmail(String email);
    Optional<UserModel> findByEmailAndPassword(String email,String password);
  
}
