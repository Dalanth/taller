$(document).ready(function(){
    url_base = "http://tallerbd.azurewebsites.net/backend";
    //url_base = "http://localhost/slim";
    var idPersona = location.href.split('?')[1].split('=')[1];
    // pestaña prevision
    $.ajax({
        type: "GET",
        url: url_base+"/api/persona/"+idPersona+"/prevision",
        data: { },
        dataType: "json",
        crossDomain: true,
        success: function(data){
            if(data.code == 200){
                $('#rol').val(data.data[0].rol);
                if (data.data[0].rol == "carga") {
                    $('.form-carga').removeClass( "hidden" );
                    $('#vencimiento_carga').val(data.data[0].vencimiento_carga);
                    $('#rut_titular').val(data.data[0].rut_titular);
                    $('#nombre_titular').val(data.data[0].nombre_titular);
                    $('#appat_titular').val(data.data[0].appat_titular);
                    $('#apmat_titular').val(data.data[0].apmat_titular);
                    $('#table-cargas').addClass( "hidden" );
                } else {
                    $('#table-cargas').removeClass( "hidden" );
                    $('.form-carga').addClass( "hidden" );
                }
                $('#tpr_detalle').val(data.data[0].tpr_detalle);
                $('#pre_nombre').val(data.data[0].pre_nombre);
                $('#vencimiento_prevision').val(data.data[0].vencimiento_prevision);
                $.ajax({
                    type: "GET",
                    url: url_base+"/api/persona/"+idPersona+"/carga",
                    data: { },
                    dataType: "json",
                    crossDomain: true,
                    success: function(data){
                        $('#cargas').html("");
                        if(data.code == 200){
                            cargas = data.data;
                            for (var i = 0; i < Object.keys(cargas).length; i++){
                                var tr = '<tr id="'+cargas[i].per_id+'">';
                                tr += '<th>'+cargas[i].per_rut+'</th>';
                                tr += '<th>'+cargas[i].per_nombre+'</th>';
                                tr += '<th>'+cargas[i].per_apellido_pat+'</th>';
                                tr += '<th>'+cargas[i].per_apellido_mat+'</th>';
                                tr += '<th><button class="btn btn-danger" id="del-carga">Eliminar</button></th>';
                                tr += '</tr>'
                                $('#cargas').append(tr);
                            }
                        }
                    },
                    failure: function(errMsg) {
                        alert(errMsg);
                    }
                });  
                $('#del-carga').click(function(e){
                    e.preventDefault();
                    if(confirm("¿Está seguro que desea completar ésta acción?")){
                        $.ajax({
                            type: "DELETE",
                            url: url_base+"/api/persona/"+idPersona+"/carga/"+$(this).parent().parent().attr('id'),
                            data: {},
                            dataType: "json",
                            contentType: "application/json",
                            crossDomain: true,
                            success: function(data){
                                if(data.code == 200){
                                    location.href = "prevision.html?idPersona="+idPersona;
                                }
                            },
                            failure: function(errMsg) {
                                alert(errMsg);
                            }
                        });   
                    }
                }); 
            }
        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    });
});