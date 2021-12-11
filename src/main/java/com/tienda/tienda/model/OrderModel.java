package com.tienda.tienda.model;

import java.util.Date;
import java.util.Map;

import javax.persistence.Id;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection="ordenes")
public class OrderModel {
    public static String PENDING = "Pendiente";
    public static String APROVED = "Aprovada";
    public static String REJECTED = "Rechazada";

    @Id
    private Integer id;
    private Date registerDay;
    private String status;
    private UserModel salesMan;

    private Map<String,FragranceModel>products;
    private Map<String,Integer>quantities;  
}
