package com.tienda.tienda.service;

import java.util.List;
import java.util.Optional;

import com.tienda.tienda.model.FragranceModel;
import com.tienda.tienda.repository.FragranceRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FragranceService {
    @Autowired

    private FragranceRepository fragranceRepository;
     
    public List<FragranceModel> getAll() {
        return fragranceRepository.getAll();
    }

    public Optional<FragranceModel> getFragrance(String id) {
        return fragranceRepository.getFragrance(id);
    }

    public FragranceModel saveFragrance(FragranceModel product) {
        return fragranceRepository.save(product);
    }

    public FragranceModel updateFragrance(FragranceModel date) {
        if (date.getReference() != null) {
            Optional<FragranceModel> consulte = fragranceRepository.getFragrance(date.getReference());
            if (!consulte.isEmpty()) {
                if (date.getBrand() != null) {
                    consulte.get().setBrand(date.getBrand());
                }
                if (date.getCategory() != null) {
                    consulte.get().setCategory(date.getCategory());
                }
                if (date.getPresentation() != null) {
                    consulte.get().setPresentation(date.getPresentation());
                }
                if (date.getDescription() != null) {
                    consulte.get().setDescription(date.getDescription());
                }
                if (date.getPrice() != 0) {
                    consulte.get().setPrice(date.getPrice());
                }
                if (date.getQuantity() != 0) {
                    consulte.get().setQuantity(date.getQuantity());
                }
                if (date.getPhotography() != null) {
                    consulte.get().setPhotography(date.getPhotography());
                }
               
                return fragranceRepository.save(consulte.get());
            }
        }
        return date;
    }

    public boolean deleteFragance(String id) {
        Optional<FragranceModel> consulte = fragranceRepository.getFragrance(id);
        if (!consulte.isEmpty()) {
            fragranceRepository.delete(consulte.get());
            return true;
        }
        return false;
    }

    public List<FragranceModel> productByPrice(double precio){
        return fragranceRepository.productByPrice(precio);
    }

    public List<FragranceModel> findByDescriptionLike(String description){
        return fragranceRepository.findByDescriptionLike(description);
    }

}
