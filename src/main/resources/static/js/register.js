
$(document).ready(function () {

    $("#name").val(""),
      $("#email").val(""),
      $("#password").val(""),
      $("#password2").val("");
      
  });
 
  function registrarUser() {
    var contenedor = document.querySelector(".message");

    // event.preventDefault();
    if($("#password").val() == $("#password2").val()){
    datos = {
      name: $("#name").val(),
      email: $("#email").val(),
      password: $("#password").val(),      
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
        $("#name").val(""),
        $("#email").val(""),
        $("#password").val(""),
        $("#password2").val("");
        var mensajeHTML= "<h6>Datos Registrados Correctamente </h6>"
        contenedor.innerHTML = mensajeHTML
         
      },
    });
    }else if($("#password").val() != $("#password2").val()) {
        
        var mensajeHTML= "<h6>Las Contraseñas no coinciden </h6>"
        contenedor.innerHTML = mensajeHTML
        
    } 
  }
  
  function emailExistente() {
    var contenedor = document.querySelector(".message");
    event.preventDefault();
    var email = $("#email").val();
 
    $.ajax({
      url: "http://localhost:8080/api/user/"+email,
      type: "GET",
      dataType: "JSON",
      success: function (respuesta) {
          console.log(respuesta)
          if(respuesta === false){
              registrarUser()
          }else{
var mensajeHTML= "<h6>Este email ya esta registrado</h6>"
            contenedor.innerHTML = mensajeHTML;
          }
      },
      error: function (respuesta) {
          console.log(email);
        
      },
    });
 
  }

  // function tablaComputadores() {
  //   $.ajax({
  //     url: "http://129.159.52.217:8080/api/Computer/all",
  //     type: "GET",
  //     dataType: "JSON",
  //     success: function (respuesta) {
    
  //       $("#computer").empty();
  //       var computadores = respuesta;
        
  //       computadores.forEach((Computer) => {
  //         $("#computer").append("<tr>");
  //         $("#computer").append("<td>" + Computer.id + "</td>");
  //         $("#computer").append("<td>" + Computer.name + "</td>");
  //         $("#computer").append("<td>" + Computer.brand + "</td>");
  //         $("#computer").append("<td>" + Computer.year + "</td>");
  //         $("#computer").append("<td>" + Computer.category.name+ "</td>");
  //         $("#computer").append("<td>" + Computer.description+ "</td>");
  //         $("#computer").append(
  //           '<td ><button id="eliminar" onclick="eliminarComputador(' +
  //             Computer.id +
  //             ')">Eliminar</button><button  id="editar" onclick="obtenerInformacion(' +
  //             Computer.id +
  //             ')">Editar</button></td> '
  //         );
  //         $("#computer").append("</tr>");
  //       });
  //     },
  //     error: function (respuesta) {
  //       console.log(respuesta.xhr);
  //     },
  //   });
  // }
  
 
  // function eliminarComputador(idComputador) {
  //   console.log(idComputador);
  //   var datos = {
  //     id: idComputador,
  //   };
  
  //   var datosEnviar = JSON.stringify(datos);
  
  //   $.ajax({
      
  //     type: "DELETE",
  //     dataType: "jsonp",
  //     // contentType: "application/json; charset=utf8",
  //     // dataType: "JSON",
  //     url: "http://129.159.52.217:8080/api/Computer/"+idComputador,
      
  //     // contentType: "application/JSON",
  //     success: function (respuesta) {
  //       console.log("Eliminado");

  //     },
  //     error: function (respuesta) {
  //       console.log("No se a podido eliminar");
  //       console.log(respuesta);
  //     },
  //     complete: function (respuesta) {
  //       tablaComputadores();
  //     },
  //   });
  // }


  // function obtenerInformacion(idElemento) {
  //   $("#registrar").hide();
  //   $("#actualizar").show();

  //   $.ajax({
  //     url: "http://129.159.52.217:8080/api/Computer/"+idElemento,
  //     type: "GET",
  //     dataType: "JSON",

      
      
      
      
  //     success: function (respuesta) {
  //       console.log(respuesta);
  //       var categoria = respuesta;
     
  //       $("#id").val(categoria.id);
  //       $("#id").prop("disabled",true);
  //       $("#name").val(categoria.name);
  //       $("#brand").val(categoria.brand);
  //       $("#year").val(categoria.year);
  //       $("#description").val(categoria.description);
  //       $("#categorias").hide();
      
  //     },
  //     error: function (jqXHR, textStatus, errorThrown) {},
  //   });
  // }

  // function actualizarComputador() {
  //   datos = {
        
  //     id: $("#id").val(),   
  //     name: $("#name").val(),
  //     brand: $("#brand").val(),
  //     year: $("#year").val(),
  //     description:$("#description").val()
  //   };
  //   var datosEnviar = JSON.stringify(datos);
  
  //   $.ajax({

  //     type: "PUT",
  //     contentType: "application/json; charset=utf8",
  //     dataType: "JSON",
  //     data: datosEnviar,
  //     url: "http://129.159.52.217:8080/api/Computer/update",

  //     success: function (respuesta) {
  //       console.log("Actualizado");
  //     },
  //     error: function (respuesta) {
  //       console.log("No se a podido actualizar");
  //     },
  //     complete: function (respuesta) {
  //       $("#categorias").show();
  //       $("#registrar").show();
  //       $("#actualizar").hide();
  //       $("#id").val(""),
  //       $("#id").prop("disabled",false);
  //         $("#name").val(""),
  //         $("#description").val(""),
     
  
  //         tablaComputadores()
  //     },
  //   });
  // }