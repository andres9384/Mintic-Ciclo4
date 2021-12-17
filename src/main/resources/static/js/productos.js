$(document).ready(function () {
    allProducts();
    clear();
    $("#actualizar").hide();
    
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
    
      titulo[0].textContent= "Agregar Producto";
      $('#referencia').removeAttr("readonly")
      $("#actualizar").hide();
      $("#agregar").show();
    clear();
  }
  function allProducts() {
    $.ajax({
      url: "http://localhost:8080/api/fragance/all",
      type: "GET",
      dataType: "JSON",
      success: function (respuesta) {
        
          $("#products").empty();
         productos = respuesta;
        console.log(respuesta)
        productos.forEach((producto) => {
            var id= "'hola mundo'"
          $("#products").append("<tr>");
          $("#products").append("<td>" + producto.reference + "</td>");
          $("#products").append("<td>" + producto.brand + "</td>");
          $("#products").append("<td>" + producto.category + "</td>");
          $("#products").append("<td>" + producto.presentation + "</td>");
          $("#products").append("<td>" + producto.description + "</td>");
          $("#products").append("<td>" + producto.price + "</td>");
          $("#products").append("<td>" + producto.quantity + "</td>");
         
          $("#products").append(
            '<td ><button id="eliminar" class="btn btn-danger opt" onclick="deleteProduct('+'\''+producto.reference+'\''+')">Eliminar </button><button data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap" class="btn btn-warning opt" id="editar" onclick="obtenerInformacion('+'\''+producto.reference+'\''+')">Editar</button></td> '
          );
          $("#products").append("</tr>");
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