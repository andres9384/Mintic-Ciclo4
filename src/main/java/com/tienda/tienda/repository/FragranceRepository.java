package com.tienda.tienda.repository;

import java.util.List;
import java.util.Optional;

import com.tienda.tienda.model.FragranceModel;
import com.tienda.tienda.repository.crud.FragranceCrudRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class FragranceRepository {
    @Autowired
    private FragranceCrudRepository fragranceCrudRepository;
    public List<FragranceModel> getAll(){
        return (List<FragranceModel>) fragranceCrudRepository.findAll();
    }

    public Optional<FragranceModel> getFragrance (String id) {
        return fragranceCrudRepository.findById(id);
    
    }

    public FragranceModel save(FragranceModel user) {
        return fragranceCrudRepository.save(user);
    }

    public void  delete(FragranceModel id){
        fragranceCrudRepository.delete(id);
    }



}
