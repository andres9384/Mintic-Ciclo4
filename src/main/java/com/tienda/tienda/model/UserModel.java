package com.tienda.tienda.model;

import java.io.Serializable;
// import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor 
@NoArgsConstructor
@Document(collection="usuarios")
public class UserModel implements Serializable {
   
    @Id
    private Integer id;

    private String identification;

    private String name;

    // private Date birthtDay;

    // private String monthBirthtDay;

    private String address;

    private String cellPhone;

    private String email;

    private String password;

    private String zone;

    private String type;
} 
// @Id
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    // private Integer id;
    // @NonNull
    // @Column(name = "user_email", nullable = false, length = 50)
    // private String email;
    // @NonNull
    // @Column(name = "user_password", nullable = false, length = 50)
    // private String password;
    // @NonNull
    // @Column(name = "user_name", nullable = false, length = 80)
    // private String name;
