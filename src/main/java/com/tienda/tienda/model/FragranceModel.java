package com.tienda.tienda.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection="perfumes")
public class FragranceModel {
    @Id
    private String reference;

    private String brand;

    private String category;

    private String presentation;

    private String description;

    private boolean availability = true;

    private double price;

    private int quantity;

    private String photography;
}
