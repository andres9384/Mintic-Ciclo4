package com.tienda.tienda.web;

import java.util.List;
import java.util.Optional;

import com.tienda.tienda.model.FragranceModel;
import com.tienda.tienda.service.FragranceService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/fragance")
@CrossOrigin("*")
public class FragranceController {
       
	@Autowired
    private FragranceService fragranceService;

    @GetMapping("/all")
    public List<FragranceModel> getAll() {
        return fragranceService.getAll();
    }

    @GetMapping("/{fragance}")
    public Optional<FragranceModel> getFragance(@PathVariable("fragance") String reference) {
        return fragranceService.getFragrance(reference);
    }

@PostMapping("/new")
@ResponseStatus(HttpStatus.CREATED) 
public FragranceModel registrar(@RequestBody FragranceModel fragrance) {
    return fragranceService.saveFragrance(fragrance);
}

@PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public FragranceModel updateFragrance(@RequestBody FragranceModel date){
        return fragranceService.updateFragrance(date);
    }
    
    @DeleteMapping("/{numId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean deleteUser(@PathVariable("numId")String id){
        return fragranceService.deleteFragance(id);
    }
    

}
