$(document).ready(function () {
    // $("#actualizar").hide();
    
    // tablaComputadores();
    // categoria();
  
      $("#email").val(""),
      $("#password").val("");
      
  });

  function ingreso() {
    var contenedor = document.querySelector(".message");
    event.preventDefault();
    var email = $("#email").val();
    var password = $("#password").val();
 
    $.ajax({
      url: "http://localhost:8080/api/user/"+email+"/"+password,
      type: "GET",
      dataType: "JSON",
      success: function (respuesta) {
          
          if(respuesta.id === null){
            var mensajeHTML= "<h6>Email y/o Contraseña Incorrectos</h6>"
            contenedor.innerHTML = mensajeHTML;
             
          }else{
            
            window.location = 'http://localhost:8080/main.html';
          }
      },
      error: function (respuesta) {
          console.log(email);
        
      },
    });
 
  }
  
  // function registrarComputador() {
  //   console.log("id:"+$("option:selected").attr("value"));
  //   datos = {
  //     name: $("#name").val(),
  //     brand: $("#brand").val(),
  //     year: $("#year").val(),
  //     category: {id:$("option:selected").attr("value")},
  //     description:$("#description").val()
      
  //   };
  //   var datosEnviar = JSON.stringify(datos);
  //   console.log(datosEnviar)
  
  //   $.ajax({
  //     type: "POST",
  //     contentType: "application/json; charset=utf8",
  //     dataType: "JSON",
  //     data: datosEnviar,
  //     url: "http://129.159.52.217:8080/api/Computer/save",
      
      
      
  //     success: function (respuesta) {
  //       console.log("Registrado");
  //       console.log(respuesta.name);
  //       tablaComputadores();
  //     },
  //     error: function (respuesta) {
  //       console.log("No Registrado");
  //     },
  //     complete: function (respuesta) {
  //       $("#name").val(""),
  //       $("#brand").val("");
  //       $("#year").val(""),
  //       $("#categorias").val("");
  //       $("#description").val("");
        
  //         tablaComputadores();
  //     },
  //   });
  // }
  
  // function categoria() {
  //   $.ajax({
  //     url: "http://129.159.52.217:8080/api/Category/all",
  //     type: "GET",
  //     dataType: "JSON",
  //     success: function (respuesta) {
  //       console.log("Refresco")
  //       $("#categorias").empty();
  //       var categorias = respuesta;
  //       categorias.forEach((categoria) => {
  //         $("#categorias").append("<option  id='"+categoria.id+"' value='"+categoria.id+"'>"  + categoria.name + "</option");
  //       });
  //     },
  //     error: function (respuesta) {
  //       console.log(respuesta.xhr);
  //     },
  //   });
  // }

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