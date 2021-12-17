package com.tienda.tienda.web;

import java.util.List;
import java.util.Optional;

import com.tienda.tienda.model.OrderModel;
import com.tienda.tienda.service.OrderService;

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
@RequestMapping("/api/order")
@CrossOrigin("*")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping("/all")
    public List<OrderModel> getAll() {
        return orderService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<OrderModel> getOrder(@PathVariable("id") int id) {
        return orderService.getOrder(id);
    }

    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public OrderModel createOrder(@RequestBody OrderModel user) {
        return orderService.createOrder(user);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public OrderModel updateUser(@RequestBody OrderModel date) {
        return orderService.updateOrder(date);
    }

    @DeleteMapping("/{numId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean deleteUser(@PathVariable("numId") int id) {
        return orderService.deleteOrder(id);
    }

    @GetMapping("/zona/{zona}")
    public List<OrderModel>findByZone(@PathVariable("zona")String zona){
        return orderService.findByZone(zona);
    }

    @GetMapping("/salesman/{id}")
    public List<OrderModel>ordersSalesManById(@PathVariable("id")Integer id){
        return orderService.ordersSalesManById(id);
    }

    @GetMapping("/state/{state}/{id}")
    public List<OrderModel>ordersSalesManByState(@PathVariable("state")String state,@PathVariable("id")Integer id){
        return orderService.ordersSalesManByState(state,id);
    }

    @GetMapping("/date/{date}/{id}")
    public List<OrderModel>ordersSalesManByDate(@PathVariable("date")String date,@PathVariable("id")Integer id){
        return orderService.ordersSalesManByDate(date,id);
    }
}
