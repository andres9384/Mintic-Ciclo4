$(document).ready(function () {
  allOrders();
  clear();
  $("#actualizar").hide();
  getUser();
  getProducts();
});
  var listaCantidad={};
var objetoOrden={};
var product2
var obj;


$("#orden").data("midato","mivalor"); 
console.log($("#orden").data("midato"))

function clear() {
  $("#referencia").val(""),
    $("#marca").val(""),
    $("#categoria").val(""),
    $("#presentacion").val(""),
    $("#descripcion").val(""),
    $("#precio").val(""),
    $("#cantidad").val(""),
    $("#fotografia").val("");
}
function agregar() {
  var titulo = $(".modal-title");

  titulo[0].textContent = "Añadir orden  ";
  $("#referencia").removeAttr("readonly");
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
      $("#orden").empty();
      orders = respuesta;

      orders.forEach((order) => {
        var cadena2 = order.registerDay.slice(0, -19);
        var objeto = order.products;

        var hola = Object.values(objeto);

        $("#orden").append("<tr>");
        $("#orden").append("<td>" + order.id + "</td>");
        $("#orden").append("<td>" + cadena2 + "</td>");
        $("#orden").append("<td>" + order.status + "</td>");
        $("#orden").append("<td>" + order.salesMan.name + "</td>");
        hola.forEach((element) => {
          $("#orden").append("<td>" + element.reference + "</td>");
        });
        $("#orden").append(
          '<td ><button id="eliminar" class="btn btn-danger opt" onclick="deleteProduct(' +
            order.id +
            ')">Eliminar </button><button data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap" class="btn btn-warning opt" id="editar" onclick="obtenerInformacion(' +
            order.id +
            ')">Editar</button></td> '
        );
        $("#orden").append("</tr>");
      });
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

      clientes.forEach((cliente) => {
        $("#usuarios").append(
          '<option value="' + cliente.id + '">' + cliente.name + "</option>"
        );
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

      productos.forEach((producto) => {
        $("#productos").append(
          '<input class="form-check-input  inputCheck" type="checkbox" value="' +
            producto.reference +
            '" id="' +
            producto.reference +
            '">'
        );
        $("#productos").append(
          '<label style="width:90px;" class="form-check-label labelCheck" for="' +
            producto.reference +
            '">' +
            producto.reference +
            "</label>"
        );
        $("#productos").append(
          '<input  style="width:100px;" class="'+producto.reference+'" type="number" value="" min="0" max="'+producto.quantity+'" placeholder="Cantidad" ></br>'
        );
      });
    },
    error: function (respuesta) {
      console.log(respuesta.xhr);
    },
  });
}

function saveOrden() {
  
  var listaProductos = [];
  let llamado = $("input[type=checkbox]");
  
  llamado = Object.values(llamado);
  
  llamado.forEach((element) => {
    if (element.checked) {
      listaProductos.push(element.value);
    }
  });
   var date = new Date();
  result = date.toISOString();
  arreglo=[objetoOrden]
 
  
  $.ajax({
    dataType: "JSON",
    url: "http://localhost:8080/api/user/" + $("#usuarios").val(),
    type: "GET",
    success: function (respuesta) {
   
      listaOrden=[];
      listaProductos.forEach(element => {
        $.ajax({
          dataType: "JSON",
          url: "http://localhost:8080/api/fragance/"+element,      
          type: "GET",
          success: function (respuesta) {
            
            var numero= parseInt($("."+respuesta.reference).val());
       
            Object.defineProperty(listaCantidad, respuesta.reference, {
              value: numero,
              writable: false
            });
       
            Object.defineProperty(objetoOrden, element, {
            value: respuesta,
            writable: false
          });
            
          },
          
        });
       
      });
      console.log(objetoOrden)
      console.log(listaCantidad)
      
      datos = {
        registerDay: result,
        status: $("#estados").val(),
        salesMan:respuesta,
        products: objetoOrden,
        quantities:listaCantidad,
      };
      var datosEnviar = JSON.stringify(datos);
      console.log(datosEnviar);
      // $.ajax({
      //   type: "POST",
      //   contentType: "application/json; charset=utf8",
      //   dataType: "JSON",
      //   data: datosEnviar,
      //   url: "http://localhost:8080/api/fragance/new",

      //   success: function (respuesta) {
      //     console.log("Registrado");

      //   },
      //   error: function (respuesta) {
      //     console.log("No Registrado");
      //   },
      //   complete: function (respuesta) {
      //     clear();
      //       allProducts();
      //   },
      // });
    },
  });
}
function obtenerInformacion(email) {
  console.log(email);
  var titulo = $(".modal-title");

  titulo[0].textContent = "Editar Producto";
  $("#actualizar").show();
  $("#agregar").hide();
  $("#actualizar").attr("onclick", "updateProduct('" + email + "')");
  $("#referencia").attr("readonly", "true");
  $.ajax({
    dataType: "JSON",
    url: "http://localhost:8080/api/fragance/" + email,
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
        $("#fotografia").val(respuesta.photography);
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
    price: $("#precio").val(),
    quantity: $("#cantidad").val(),
    photography: $("#fotografia").val(),
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
    url: "http://localhost:8080/api/order/" + idClient,

    contentType: "application/JSON",
    success: function (respuesta) {
      console.log("Eliminado");
    },
    error: function (respuesta) {
      console.log("No se a podido eliminar");
    },
    complete: function (respuesta) {
      allOrders();
    },
  });
}
