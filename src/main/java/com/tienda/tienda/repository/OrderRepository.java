package com.tienda.tienda.repository;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import com.tienda.tienda.model.OrderModel;
import com.tienda.tienda.repository.crud.OrderCrudRepository;

import org.aspectj.weaver.ast.And;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Repository;

@Repository
public class OrderRepository {
    @Autowired
    private OrderCrudRepository orderCrudRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public List<OrderModel> getAll() {
        return (List<OrderModel>) orderCrudRepository.findAll();
    }

    public Optional<OrderModel> getOrder(int id) {
        return orderCrudRepository.findById(id);
    }

    public OrderModel createOrder(OrderModel order) {
        return orderCrudRepository.save(order);
    }

    public void updatesOrder(OrderModel order) {
        orderCrudRepository.save(order);
    }

    public void deleteOrder(OrderModel order) {
        orderCrudRepository.delete(order);
    }

    public Optional<OrderModel> lastOrderId() {
        return orderCrudRepository.findTopByOrderByIdDesc();
    }

    public List<OrderModel> findByZone(String zona) {
        return orderCrudRepository.findByZone(zona);
    }

    public List<OrderModel> ordersSalesManById(Integer id) {
        Query query = new Query();
        Criteria criterio = Criteria.where("salesMan.id").is(id);
        query.addCriteria(criterio);

        List<OrderModel> orders = mongoTemplate.find(query, OrderModel.class);
        return orders;
    }

    public List<OrderModel> ordersSalesManByState(String state, Integer id) {
        Query query = new Query();
        Criteria criterio = Criteria.where("salesMan.id").is(id).and("status").is(state);
        query.addCriteria(criterio);

        List<OrderModel> orders = mongoTemplate.find(query, OrderModel.class);
        return orders;
    }

    public List<OrderModel>ordersSalesManByDate(String date, Integer id){
          DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");

          Query query = new Query();
          Criteria dataCriteria = Criteria.where("registerDay").gte(LocalDate.parse(date,dtf).minusDays(1).atStartOfDay()).lt(LocalDate.parse(date,dtf).plusDays(1).atStartOfDay()).and("salesMan.id").is(id);
          query.addCriteria(dataCriteria);
          List<OrderModel> orders= mongoTemplate.find(query, OrderModel.class);
          return orders;
    }

}
