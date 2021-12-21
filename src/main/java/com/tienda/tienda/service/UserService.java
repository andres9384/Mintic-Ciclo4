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

        Optional<UserModel> userIdMaximo = userRepository.lastUserId();

        if (user.getId() == null) {
            if (userIdMaximo.isEmpty()) {
                user.setId(1);
            } else {
                user.setId(userIdMaximo.get().getId() + 1);
            }
            Optional<UserModel> e = userRepository.getUser(user.getId());
            if (e.isEmpty()) {
                if (existeEmail(user.getEmail()) == false) {
                    return userRepository.save(user);
                } else {
                    return user;
                }
            } else {
                return user;
            }
        }
        return userRepository.save(user);

    }

    public boolean existeEmail(String email) {
        return userRepository.existeEmail(email);
    }

    public UserModel autenticarUsuario(String email, String password) {
        Optional<UserModel> usuario = userRepository.autenticarUsuario(email, password);

        if (usuario.isEmpty()) {
            return new UserModel(null, null, null, null, null, null, null, null, null, null, null);
            // new UserModel(id, identification, name, birthtDay, monthBirthtDay, address,
            // cellPhone, email, password, zone, type)
        } else {
            return usuario.get();
        }
    }

    public UserModel updateUser(UserModel date) {
        if (date.getId() != null) {
            Optional<UserModel> consulte = userRepository.getUser(date.getId());
            if (!consulte.isEmpty()) {
                if (date.getIdentification() != null) {
                    consulte.get().setIdentification(date.getIdentification());
                }
                if (date.getName() != null) {
                    consulte.get().setName(date.getName());
                }
                if (date.getBirthtDay() != null) {
                    consulte.get().setBirthtDay(date.getBirthtDay());
                }
                if (date.getMonthBirthtDay() != null) {
                    consulte.get().setMonthBirthtDay(date.getMonthBirthtDay());
                }
                if (date.getAddress() != null) {
                    consulte.get().setAddress(date.getAddress());
                }
                if (date.getCellPhone() != null) {
                    consulte.get().setCellPhone(date.getCellPhone());
                }
                if (date.getEmail() != null) {
                    consulte.get().setEmail(date.getEmail());
                }
                if (date.getPassword() != null) {
                    consulte.get().setPassword(date.getPassword());
                }
                if (date.getZone() != null) {
                    consulte.get().setZone(date.getZone());
                }
                if (date.getType() != null) {
                    consulte.get().setType(date.getType());
                }
                return userRepository.save(consulte.get());
            }
        }
        return date;
    }

    public boolean deleteUser(int id) {
        Optional<UserModel> consulte = userRepository.getUser(id);
        if (!consulte.isEmpty()) {
            userRepository.delete(consulte.get());
            return true;
        }
        return false;
    }

    public List<UserModel> birthDayList(String fecha) {
        return userRepository.birthDayList(fecha);
    }
}
