package com.tienda.tienda.repository;

import java.util.List;
import java.util.Optional;

import com.tienda.tienda.model.UserModel;
import com.tienda.tienda.repository.crud.UserCrudRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepository {
    @Autowired
    private UserCrudRepository userCrudRepository;
    public List<UserModel> getAll(){
        return (List<UserModel>) userCrudRepository.findAll();
    }

    public Optional<UserModel> getUser(int id) {
        return userCrudRepository.findById(id);
    
    }

    public UserModel save(UserModel user) {
        return userCrudRepository.save(user);
    }

    public boolean existeEmail(String email) {
        Optional<UserModel> usuario = userCrudRepository.findByEmail(email);

        return !usuario.isEmpty();
    }

    public Optional<UserModel> autenticarUsuario(String email, String password) {
        return userCrudRepository.findByEmailAndPassword(email, password);
    }

    public void  delete(UserModel id){
        userCrudRepository.delete(id);
    }
 
    
    public Optional<UserModel>lastUserId(){
        return userCrudRepository.findTopByOrderByIdDesc();
    }
}
