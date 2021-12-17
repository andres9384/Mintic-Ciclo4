$(document).ready(function () {
  allUser();
  clear();
  $("#actualizar").hide();
});


function clear(){


      

     $("#identificacion").val(""),
     $("#nombre").val(""),

     $("#direccion").val(""),
    $("#telefono").val(""),

     $("#correo").val(""),
     $("#contraseña").val(""),

     $("#zona").val(""),
     $("#tipo").val("")
}
function agregar(){
  var titulo = $(".modal-title")
  
    titulo[0].textContent= "Agregar Usuario";
    $("#actualizar").hide();
    $("#agregar").show();
  clear();
}
function allUser() {
  $.ajax({
    url: "http://localhost:8080/api/user/all",
    type: "GET",
    dataType: "JSON",
    success: function (respuesta) {
      
        $("#user").empty();
      var clientes = respuesta;
      console.log(clientes);
      clientes.forEach((cliente) => {
        $("#user").append("<tr>");
        $("#user").append("<td>" + cliente.id + "</td>");
        $("#user").append("<td>" + cliente.identification + "</td>");
        $("#user").append("<td>" + cliente.name + "</td>");
        $("#user").append("<td>" + cliente.cellPhone + "</td>");
        $("#user").append("<td>" + cliente.email + "</td>");
        $("#user").append("<td>" + cliente.zone + "</td>");
        $("#user").append("<td>" + cliente.type + "</td>");
        $("#user").append(
          '<td ><button id="eliminar" class="btn btn-danger opt" onclick="eliminarCliente(' +
          cliente.id  + ')">Eliminar </button><button data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap" class="btn btn-warning opt" id="editar" onclick="obtenerInformacion('+cliente.id + ')">Editar</button></td> '
        );
        $("#user").append("</tr>");
      });
    },
    error: function (respuesta) {
      console.log(respuesta.xhr);
    },
  });
}

function saveUser() {
  datos = {

  

    identification: $("#identificacion").val(),
    name: $("#nombre").val(),

    address: $("#direccion").val(),
    cellPhone: $("#telefono").val(),

    email: $("#correo").val(),
    password: $("#contraseña").val(),

    zone: $("#zona").val(),
    type: $("#tipo").val(),
  };
  var datosEnviar = JSON.stringify(datos);

  $.ajax({
    type: "POST",
    contentType: "application/json; charset=utf8",
    dataType: "JSON",
    data: datosEnviar,
    url: "http://localhost:8080/api/user/new",

    success: function (respuesta) {
      console.log("Registrado");
      
    },
    error: function (respuesta) {
      console.log("No Registrado");
    },
    complete: function (respuesta) {
      clear();
        allUser();
    },
  });
}
function obtenerInformacion(emai){

  var titulo = $(".modal-title")
  
    titulo[0].textContent= "Editar Usuario";
    $("#actualizar").show();
    $("#agregar").hide();
    $('#actualizar').attr("onclick","updateUser("+emai+")")
    $.ajax({
      dataType: "JSON",
      url: "http://localhost:8080/api/user/"+emai,      
      type: "GET",
      success: function (respuesta) {
        console.log(respuesta);
        var mensaje = respuesta;
     
         $("#identificacion").val(respuesta.identification),
      $("#nombre").val(respuesta.name);

    $("#direccion").val(respuesta.address);
     $("#telefono").val(respuesta.cellPhone);

    $("#correo").val(respuesta.email);
     $("#contraseña").val(respuesta.password);

     $("#zona").val(respuesta.zone);
     $("#tipo").val(respuesta.type);
        
      },
      
    });
  
  
}
function updateUser(id) {
  datos = {
      
    id:id,
    identification: $("#identificacion").val(),
    name: $("#nombre").val(),

    address: $("#direccion").val(),
    cellPhone: $("#telefono").val(),

    email: $("#correo").val(),
    password: $("#contraseña").val(),

    zone: $("#zona").val(),
    type: $("#tipo").val(),
    
  };
  var datosEnviar = JSON.stringify(datos);

  $.ajax({
    type: "PUT",
    contentType: "application/json; charset=utf8",
    dataType: "JSON",
    data: datosEnviar,
    url: "http://localhost:8080/api/user/update",

    success: function (respuesta) {
      console.log("Actualizado");
    },
    error: function (respuesta) {
      console.log("No se a podido actualizar");
    },
    complete: function (respuesta) {
      
        allUser();
clear();
    },
  });
}

function eliminarCliente(idClient) {

  $.ajax({
    type: "DELETE",
    dataType: "jsonp",
    url: "http://localhost:8080/api/user/"+idClient,
    
    contentType: "application/JSON",
    success: function (respuesta) {
      console.log("Eliminado");
    },
    error: function (respuesta) {
      console.log("No se a podido eliminar");
    },
    complete: function (respuesta) {
    allUser();
    },
  });
}