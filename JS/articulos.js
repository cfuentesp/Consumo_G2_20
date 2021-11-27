var UrlGetArticulos = 'http://34.68.196.220:90/G2_20/articulos/controller/articulos.php?op=GetArticulos';
var UrlPostArticulo = 'http://34.68.196.220:90/G2_20/articulos/controller/articulos.php?op=InsertArticulo';
var UrlPostUno = 'http://34.68.196.220:90/G2_20/articulos/controller/articulos.php?op=GetUno';
var UrlUpdateArticulo = 'http://34.68.196.220:90/G2_20/articulos/controller/articulos.php?op=UpdateArticulo';
var UrlDeleteArticulo = 'http://34.68.196.220:90/G2_20/articulos/controller/articulos.php?op=DeleteArticulo';

$(document).ready(function(){
    CargarArticulos();
});

function CargarArticulos(){

    $.ajax({
        url : UrlGetArticulos,
        type : 'GET',
        datatype : 'JSON',
        success : function(response){
            var items = response;
            var valores = '';

            for(i=0; i<items.length; i++){
                valores += '<tr>'+
                '<td>'+ items[i].id+'</td>'+
                '<td>'+ items[i].descripcion+'</td>'+
                '<td>'+ items[i].unidad+'</td>'+
                '<td>'+ items[i].costo+'</td>'+
                '<td>'+ items[i].precio+'</td>'+
                '<td>'+ items[i].aplica_isv+'</td>'+
                '<td>'+ items[i].porcentaje_isv+'</td>'+
                '<td>'+ items[i].estado+'</td>'+
                '<td>'+ items[i].id_socio+'</td>'+
                '<td>'+
                '<button class="btn btn-warning" onclick="CargarArticulo('+ items[i].id +')">Editar</button>'+
                '<button class="btn btn-danger" onclick="EliminarArticulo('+ items[i].id +')">Eliminar</button>'+
                '</td>'+
                '</tr>';
                $('.articulos').html(valores);
            }
        }
    });
}

function AgregarArticulo(){
    var datosarticulo = {
        id : $('#id').val(),
        descripcion : $('#descripcion').val(),
        unidad : $('#unidad').val(),
        costo : $('#costo').val(),
        precio : $('#precio').val(),
        aplica_isv : $('#aplica_isv').val(),
        porcentaje_isv : $('#porcentaje_isv').val(),
        estado : $('#estado').val(),
        id_socio : $('#id_socio').val()  
    };

    var datosarticulojson = JSON.stringify(datosarticulo);
    $.ajax({
        url : UrlPostArticulo,
        type : 'POST',
        data : datosarticulojson,
        datatype : 'JSON',
        contentType : 'application/json',
        success : function(response){
            console.log(response);
        }
    });
    alert("Articulo Agregado");
}

function CargarArticulo(idart){
    var datosarticulo = {
        id : idart
    };
    var datosarticulojson = JSON.stringify(datosarticulo);
    $.ajax({
        url : UrlPostUno,
        type : 'POST',
        data : datosarticulojson,
        datatype : 'JSON',
        contentType : 'application/json',
        success : function(response){
            var items = response;
            $('#id').val(items[0].id);
            $('#descripcion').val(items[0].descripcion);
            $('#unidad').val(items[0].unidad);
            $('#costo').val(items[0].costo);
            $('#precio').val(items[0].precio);
            $('#aplica_isv').val(items[0].aplica_isv);
            $('#porcentaje_isv').val(items[0].porcentaje_isv);
            $('#estado').val(items[0].estado);
            $('#id_socio').val(items[0].id_socio);
             var btnactualizar = '<input type="submit" id=btn_actualizar onclick="ActualizarArticulo('+ items[0].id +')" value="Actualizar Articulo" class="btn btn-primary"></input>';
            $('.btnagregar').html(btnactualizar);
        }
    });
}

function ActualizarArticulo(idart){
    var datosarticulo = {
        id : idart,
        descripcion : $('#descripcion').val(),
        unidad : $('#unidad').val(),
        costo : $('#costo').val(),
        precio : $('#precio').val(),
        aplica_isv : $('#aplica_isv').val(),
        porcentaje_isv : $('#porcentaje_isv').val(),
        estado : $('#estado').val(),
        id_socio : $('#id_socio').val()  
    };
    var datosarticulojson = JSON.stringify(datosarticulo);

    $.ajax({
        url : UrlUpdateArticulo,
        type : 'PUT',
        data : datosarticulojson,
        datatype : 'JSON',
        contentType : 'application/json',
        success : function(response){
            console.log(response);
        } 
    });
    alert("Articulo Actualizado");
}

function EliminarArticulo(idart){
    var datosarticulo = {
        id : idart
    };
    var datosarticulojson = JSON.stringify(datosarticulo);

    $.ajax({
        url : UrlDeleteArticulo,
        type : 'DELETE',
        data : datosarticulojson,
        datatype : 'JSON',
        contentType : 'application/json',
        success : function(response){
            console.log(response);
        } 
    });
    alert("Articulo Eliminado");
}