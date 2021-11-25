package com.tienda.tienda.service;

import java.util.List;
import java.util.Optional;

import com.tienda.tienda.model.UserModel;
import com.tienda.tienda.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
     
    public List<UserModel> getAll() {
        return userRepository.getAll();
    }

    public Optional<UserModel> getUser(int id) {
        return userRepository.getUser(id);
    }

    public UserModel registrar(UserModel user) {
        if (user.getId() == null) {
            if (existeEmail(user.getEmail()) == false) {
                return userRepository.save(user);
            } else {
                return user;
            }
        } else {
            return user;
        }
    }

    public boolean existeEmail(String email) {
        return userRepository.existeEmail(email);
    }

    public UserModel autenticarUsuario(String email, String password) {
        Optional<UserModel> usuario = userRepository.autenticarUsuario(email, password);

        if (usuario.isEmpty()) {
            return new UserModel(email, password, "NO DEFINIDO");
        } else {
            return usuario.get();
        }
    }
}
