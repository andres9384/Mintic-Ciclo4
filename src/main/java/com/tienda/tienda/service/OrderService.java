package com.tienda.tienda.service;

import java.util.List;
import java.util.Optional;

import com.tienda.tienda.model.OrderModel;
import com.tienda.tienda.repository.OrderRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    public List<OrderModel>getAll(){
        return orderRepository.getAll();
    }

    public Optional<OrderModel>getOrder(int id){
        return orderRepository.getOrder(id);
    }

    public OrderModel createOrder(OrderModel order){
       
        Optional <OrderModel> orderIdMaximo = orderRepository.lastOrderId();

        if(order.getId() ==null){
            if (orderIdMaximo .isEmpty()) {
                order.setId(1);
            }else{
                order.setId(orderIdMaximo.get().getId()+1);
            }
        }
            Optional<OrderModel> e = orderRepository.getOrder(order.getId());
            if(e.isEmpty()){    
                    return orderRepository.createOrder(order);
               
            }else{
                return order;    
            }
        
              
    }

    public OrderModel updateOrder(OrderModel order){
        if (order.getId()!=null) {
            Optional<OrderModel> orderDB = orderRepository.getOrder(order.getId());
            if (!orderDB.isEmpty()) {
                if(order.getStatus()!=null){
                    orderDB.get().setStatus(order.getStatus());
                }
                orderRepository.updatesOrder(orderDB.get());
                return orderDB.get();
            } else {
                return order;
            }
        }else{
            return order;
        }
        
       
    }

    public boolean deleteOrder(int id) {
        Boolean aBoolean= getOrder(id).map(OrderModel->{
            orderRepository.deleteOrder(OrderModel);
            return true;
        }).orElse(false);
        return aBoolean;
    }

    public List<OrderModel>findByZone(String zone){
        return orderRepository.findByZone(zone);
    }

    //   public List<OrderModel>ordersSalesManByDate(String date, int id){
    //     return orderRepository.ordersSalesManByDate(date,id);
    // }

    //   public List<OrderModel>ordersSalesManByState(String state, Integer id){
    //     return orderRepository.ordersSalesManByState(state,id);
    // }
}
