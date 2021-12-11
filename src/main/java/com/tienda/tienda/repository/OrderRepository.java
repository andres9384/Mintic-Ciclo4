package com.tienda.tienda.repository;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import javax.management.Query;

import com.tienda.tienda.model.OrderModel;
import com.tienda.tienda.repository.crud.OrderCrudRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Repository;

@Repository
public class OrderRepository {
    @Autowired
    private OrderCrudRepository orderCrudRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public List<OrderModel>getAll(){
        return (List<OrderModel>)orderCrudRepository.findAll();
    }

    public Optional<OrderModel>getOrder(int id){
        return orderCrudRepository.findById(id);
    }

    public OrderModel createOrder(OrderModel order){
        return orderCrudRepository.save(order);
    }

    public void updatesOrder(OrderModel order){
        orderCrudRepository.save(order);
    }

    public void deleteOrder(OrderModel order){
        orderCrudRepository.delete(order);
    }

    public Optional<OrderModel>lastOrderId(){
        return orderCrudRepository.findTopByOrderByIdDesc();
    }

    public List <OrderModel>findByZone(String zona){
        return orderCrudRepository.findByZone(zona);
    }

    //   public List<OrderModel>ordersSalesManByDate(String date, Integer id){
    //       DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    //       Query query = new Query();
    //       Criteria
    //     return orderCrudRepository.ordersSalesManByDate(date,id);
    // }

}
