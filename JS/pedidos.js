var UrlGetPedido = 'http://34.68.196.220:90:90/G2_20/pedidos/controller/Pedidos.php?op=GetPedido';
var UrlPostPedido = 'http://34.68.196.220:90:90/G2_20/pedidos/controller/pedidos.php?op=InsertPedido';
var UrlGetUno = 'http://34.68.196.220:90:90/G2_20/pedidos/controller/Pedidos.php?op=GetUno';
var UrlPutUpdate = 'http://34.68.196.220:90:90/G2_20/pedidos/controller/pedidos.php?op=UpdatePedido'; 
var UrlDelDelete = 'http://34.68.196.220:90:90/G2_20/pedidos/controller/pedidos.php?op=DeletePedido';

$(document).ready(function(){
    CargarPedidos();
});

function CargarPedidos(){
$.ajax({
    url: UrlGetPedido,
    type: 'GET',
    datatype: 'JSON',
    success: function(response){
        var Items = response;
        var Valores = '  ';

        for(i=0; i<Items.length; i++){
            Valores += '<tr>' +
            '<td>'+Items[i].id_pedido+'</td>'+
            '<td>'+Items[i].id_socio+'</td>'+
            '<td>'+Items[i].fecha_pedido+'</td>'+
            '<td>'+Items[i].detalle+'</td>'+
            '<td>'+Items[i].sub_total+'</td>'+
            '<td>'+Items[i].total_isv+'</td>'+
            '<td>'+Items[i].total+'</td>'+
            '<td>'+Items[i].fecha_entrega+'</td>'+
            '<td>'+Items[i].estado+'</td>'+
            '<td>'+
            '<button class ="btn btn-warning" onclick="CargaPedidoU('+Items[i].id_pedido+')">Editar</button>'+
            '<button class = "btn btn-danger" onclick ="CargaPedidoD('+Items[i].id_pedido+')">Eliminar</button>'+
            '</td>'+
        '</tr>';
        $('.pedidos').html(Valores);
        }
        }
});
}

function AgregarPedidos(){
    var datospedidos = {
        
            id_socio:$('#id_socio').val(),
            fecha_pedido:$('#fecha_pedido').val(),
            detalle:$('#detalle').val(),
            subtotal:$('#sub_total').val(),
            total_isv:$('#total_isv').val(),
            total:$('#total').val(),
            fecha_entrega:$('#fecha_entrega').val(),
            estado:$('#estado').val()
    };

    var datospedidosjson = JSON.stringify(datospedidos);
    $.ajax({
        url: UrlPostPedido,
        type: 'POST',
        data: datospedidosjson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            console.log(response)
        } 
    })
    alert("Pedido Agregado")
}

function CargaPedidoU(id_pedido) {
    var datospedido = {
       id_pedido: id_pedido
    };
    var datospedidojson = JSON.stringify(datospedido);

    $.ajax({
       url: UrlGetUno,
       type: 'POST',
       data: datospedidojson,
       datatype: 'JSON',
       contentType: 'application/json',
       success: function(response){
           var Items = response;
           $('#id_socio').val(Items[0].id_socio);
           $('#fecha_pedido').val(Items[0].fecha_pedido);
           $('#detalle').val(Items[0].detalle);
           $('#sub_total').val(Items[0].sub_total);
           $('#total_isv').val(Items[0].total_isv);
           $('#total').val(Items[0].total);
           $('#fecha_entrega').val(Items[0].fecha_entrega);
           $('#estado').val(Items[0].estado);
            
             var btnactualizar = '<input type = "submit" id="btn_actualizar" onclick="UpdatePedido('+Items[0].id_pedido+')"'+
              'value= "Actualizar Pedido" class = "btn btn-warning"></input>';         
             $('.btnagregar').html(btnactualizar);
          

       }
    });
}

function CargaPedidoD(id_pedido) {
    var datospedido = {
       id_pedido: id_pedido
    };
    var datospedidojson = JSON.stringify(datospedido);

    $.ajax({
       url: UrlGetUno,
       type: 'POST',
       data: datospedidojson,
       datatype: 'JSON',
       contentType: 'application/json',
       success: function(response){
           var Items = response;
           $('#id_socio').val(Items[0].id_socio);
           $('#fecha_pedido').val(Items[0].fecha_pedido);
           $('#detalle').val(Items[0].detalle);
           $('#sub_total').val(Items[0].sub_total);
           $('#total_isv').val(Items[0].total_isv);
           $('#total').val(Items[0].total);
           $('#fecha_entrega').val(Items[0].fecha_entrega);
           $('#estado').val(Items[0].estado);
            
             var btneliminar = '<input type = "submit" id="btn_eliminar" onclick="DeletePedido('+Items[0].id_pedido+')"'+
              'value= "Eliminar Pedido" class = "btn btn-danger"></input>';         
             $('.btnagregar').html(btneliminar);
          

       }
    });
}

function UpdatePedido(id_pedido){
    var datospedido = {
        id_pedido: id_pedido,
        id_socio: $('#id_socio').val(),
        fecha_pedido: $('#fecha_pedido').val(),
        detalle: $('#detalle').val(),
        subtotal: $('#sub_total').val(),
        total_isv: $('#total_isv').val(),
        total: $('#total').val(),
        fecha_entrega: $('#fecha_entrega').val(),
        estado: $('#estado').val(),
    };
    var datospedidojson = JSON.stringify(datospedido);

    $.ajax ({
        url: UrlPutUpdate,
        type: 'PUT',
        data:datospedidojson,
        datatype:'JSON',
        contentType: 'application/json', 
        success: function(response){
            console.log(response);
           
        }
    });
    alert("Pedido Actualizado");
            

}

function DeletePedido(id_pedido) {
    var datospedido = {
       id_pedido: id_pedido
    };
    var datospedidojson = JSON.stringify(datospedido);

    $.ajax({
       url: UrlDelDelete,
       type: 'DELETE',
       data: datospedidojson,
       datatype: 'JSON',
       contentType: 'application/json',
       success: function(response){
        console.log(response);
    
    }
   });
   alert("Pedido Eliminado");
   
}