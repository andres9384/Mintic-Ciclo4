$(document).ready(function () {
    allOrders();
    clear();
    $("#actualizar").hide();
    getUser();
    getProducts()
    
  });
  var productos;
  

  function clear(){
  
       $("#referencia").val(""),
       $("#marca").val(""),
  
       $("#categoria").val(""),
      $("#presentacion").val(""),
  
       $("#descripcion").val(""),
       $("#precio").val(""),
  
       $("#cantidad").val(""),
       $("#fotografia").val("")
  }
  function agregar(){
    var titulo = $(".modal-title")
    
      titulo[0].textContent= "Añadir orden  ";
      $('#referencia').removeAttr("readonly")
      $("#actualizar").hide();
      $("#agregar").show();
    clear();
  }
  function allOrders() {
    $.ajax({
      url: "http://localhost:8080/api/order/all",
      type: "GET",
      dataType: "JSON",
      success: function (respuesta) {
        
          $("#products").empty();
         orders = respuesta;
        console.log(respuesta)
        orders.forEach((order) => {
            console.log(order.products)
            var cadena2 = order.registerDay.slice(0, -19);
            var objeto= order.products;
            console.log(objeto)
            
           console.log( Object.values(objeto))
           var hola = Object.values(objeto)
          
          $("#orden").append("<tr>");
          $("#orden").append("<td>" + order.id + "</td>");
          $("#orden").append("<td>" + cadena2 + "</td>");
          $("#orden").append("<td>" + order.status + "</td>");
          $("#orden").append("<td>" + order.salesMan.name + "</td>");
          hola.forEach(element => {
          $("#orden").append("<td>" + 
            element.reference 
           + "</td>");
         })
          $("#orden").append(
            '<td ><button id="eliminar" class="btn btn-danger opt" onclick="deleteProduct('+order.id+')">Eliminar </button><button data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap" class="btn btn-warning opt" id="editar" onclick="obtenerInformacion('+order.id+')">Editar</button></td> '
          );
          $("#orden").append("</tr>");
        }) ;
      },
      error: function (respuesta) {
        console.log(respuesta.xhr);
      },
    });
  }


  function getUser() {
    $.ajax({
      url: "http://localhost:8080/api/user/all",
      type: "GET",
      dataType: "JSON",
      success: function (respuesta) {
          $("#usuarios").empty();
        var clientes = respuesta;
        console.log(clientes);
        clientes.forEach((cliente) => {
          $("#usuarios").append('<option value="'+cliente.id+'">'+cliente.name+'</option>');     
        });
      },
      error: function (respuesta) {
        console.log(respuesta.xhr);
      },
    });
  }
  
  function getProducts() {
    $.ajax({
      url: "http://localhost:8080/api/fragance/all",
      type: "GET",
      dataType: "JSON",
      success: function (respuesta) {
        
          $("#productos").empty();
         productos = respuesta;
        console.log(respuesta)
        productos.forEach((producto) => {
            
          $("#productos").append('<input class="form-check-input  inputCheck"  type="checkbox" value="'+producto.reference+'" id="'+producto.reference+'">' );
          $("#productos").append('<label style="" class="form-check-label labelCheck" for="'+producto.reference+'">'+producto.reference+'</label>');
        });
      },
      error: function (respuesta) {
        console.log(respuesta.xhr);
      },
    });
  }



  function saveProducts() {
    datos = {
  
        
        reference: $("#referencia").val(),
        brand: $("#marca").val(),
        category: $("#categoria").val(),
        presentation: $("#presentacion").val(),
        description: $("#descripcion").val(),
        price : $("#precio").val(),
        quantity : $("#cantidad").val(),
        photography : $("#fotografia").val()
    
    };
    var datosEnviar = JSON.stringify(datos);
  
    $.ajax({
      type: "POST",
      contentType: "application/json; charset=utf8",
      dataType: "JSON",
      data: datosEnviar,
      url: "http://localhost:8080/api/fragance/new",
  
      success: function (respuesta) {
        console.log("Registrado");
        
      },
      error: function (respuesta) {
        console.log("No Registrado");
      },
      complete: function (respuesta) {
        clear();
          allProducts();
      },
    });
  }
  function obtenerInformacion(email){
    console.log(email);
    var titulo = $(".modal-title")
    
      titulo[0].textContent= "Editar Producto";
      $("#actualizar").show();
      $("#agregar").hide();
      $('#actualizar').attr("onclick","updateProduct(\'"+email+"\')")
      $('#referencia').attr("readonly","true")
      $.ajax({
        dataType: "JSON",
        url: "http://localhost:8080/api/fragance/"+email,      
        type: "GET",
        success: function (respuesta) {
          console.log(respuesta);
          var mensaje = respuesta;
       
          
       $("#referencia").val(respuesta.reference),
       $("#marca").val(respuesta.brand),
  
       $("#categoria").val(respuesta.category),
      $("#presentacion").val(respuesta.presentation),
  
       $("#descripcion").val(respuesta.description),
       $("#precio").val(respuesta.price),
  
       $("#cantidad").val(respuesta.quantity),
       $("#fotografia").val(respuesta.photography)
          
        },
        
      });
    
    
  }
  function updateProduct(id) {
    datos = {
        
        reference: $("#referencia").val(),
        brand: $("#marca").val(),
        category: $("#categoria").val(),
        presentation: $("#presentacion").val(),
        description: $("#descripcion").val(),
        price : $("#precio").val(),
        quantity : $("#cantidad").val(),
        photography : $("#fotografia").val()
      
    };
    var datosEnviar = JSON.stringify(datos);
  
    $.ajax({
      type: "PUT",
      contentType: "application/json; charset=utf8",
      dataType: "JSON",
      data: datosEnviar,
      url: "http://localhost:8080/api/fragance/update",
  
      success: function (respuesta) {
        console.log("Actualizado");
      },
      error: function (respuesta) {
        console.log("No se a podido actualizar");
      },
      complete: function (respuesta) {
        
          allProducts();
  clear();
      },
    });
  }
  
  function deleteProduct(idClient) {
  
    $.ajax({
      type: "DELETE",
      dataType: "jsonp",
      url: "http://localhost:8080/api/fragance/"+idClient,
      
      contentType: "application/JSON",
      success: function (respuesta) {
        console.log("Eliminado");
      },
      error: function (respuesta) {
        console.log("No se a podido eliminar");
      },
      complete: function (respuesta) {
      allProducts();
      },
    });
  }
  var $hola = document.querySelectorAll('#AP-904');
  if ($hola.checked) {
    console.log("estoy checkeado")
  }else{
    console.log("no estoy checkeado")
  }