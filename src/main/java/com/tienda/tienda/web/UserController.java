package com.tienda.tienda.web;

import java.util.List;

import com.tienda.tienda.model.UserModel;
import com.tienda.tienda.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
@CrossOrigin("*")
public class UserController {
      /**
         * Autowired
         */
	@Autowired
    /**
     * variable User Service
     */
private UserService userService;
    
/**
     * 
     * @return Get Mapping ret Ser
*/
@GetMapping("/all")
public List<UserModel> getAll() {
    return userService.getAll();
}

/**
     * @param Peticion Post user
     * @return 
*/
@PostMapping("/new")
@ResponseStatus(HttpStatus.CREATED)
public UserModel registrar(@RequestBody UserModel user) {
    return userService.registrar(user);
}
    
/**
     * @param peticion email y password
     * @return 
 */
@GetMapping("/{email}/{password}")
public UserModel autenticarUsuario(@PathVariable("email") String email, @PathVariable("password") String password) {
    return userService.autenticarUsuario(email, password);
}
/**
     * @param Peticion get email
     * @return 
*/
@GetMapping("/{email}")
public boolean existeEmail(@PathVariable("email") String email) {
    return userService.existeEmail(email);
}
}
