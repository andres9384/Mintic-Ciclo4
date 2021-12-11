$(document).ready(function () {
  allUser();
  clear();
});


function clear(){


       $("#id").val(""),

     $("#identificacion").val(""),
     $("#nombre").val(""),

     $("#direccion").val(""),
    $("#telefono").val(""),

     $("#correo").val(""),
     $("#contraseña").val(""),

     $("#zona").val(""),
     $("#tipo").val("")
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
          var email = '"'+cliente.email+'"';
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
          cliente.id  + ')">Eliminar </button><button class="btn btn-success opt" id="editar" onclick="obtenerInformacion('+email+')">Editar</button></td> '
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

    id: $("#id").val(),

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
    console.log(emai);
}