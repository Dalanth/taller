$(document).ready(function(){
    url_base = "http://tallerbd.azurewebsites.net/backend";
    //url_base = "http://localhost/slim";
    
    $.ajax({
        type: "GET",
        url: url_base+"/api/persona",
        data: { },
        dataType: "json",
        crossDomain: true,
        success: function(data){
            if(data.code == 200){
                var personas = data.data;
                for(var i = 0; i < Object.keys(personas).length; i++){
                    var tr = '<tr id="'+personas[i].per_id+'">';
                    tr += '<th>'+personas[i].per_rut+'</th>';
                    tr += '<th>'+personas[i].per_nombre+'</th>';
                    tr += '<th>'+personas[i].per_apellido_pat+'</th>';
                    tr += '<th>'+personas[i].per_apellido_mat+'</th>';
                    tr += '<th>'+personas[i].per_fecha_nacimiento+'</th>';
                    tr += '<th><button class="btn btn-info ver-persona" data-toggle="modal" data-target="#modalVer">Ver Detalle</button> ';
                    tr += '<button class="btn btn-success ver-prevision">Previsión</button> ';
                    tr += '<button class="btn btn-warning ver-direcciones">Direcciones</button></th>';
                    tr += '</tr>'
                    $('#personas').append(tr);
                }
                $('.ver-persona').click(function(){
                    var idPersona = $(this).parent().parent().attr('id');                    
                    $.ajax({
                        type: "GET",
                        url: url_base+"/api/persona/"+idPersona,
                        data: { },
                        dataType: "json",
                        crossDomain: true,
                        success: function(data){
                            if(data.code == 200){
                                $('#persona-detalle').show();
                                $('#rut').val(data.data[0].per_rut);
                                $('#nombre').val(data.data[0].per_nombre);
                                $('#appaterno').val(data.data[0].per_apellido_pat);
                                $('#apmaterno').val(data.data[0].per_apellido_mat);
                                $('#nacimiento').val(data.data[0].per_fecha_nacimiento);
                                $('#sexo').val(data.data[0].per_sexo_id);
                                $('#nombre_padre').val(data.data[0].per_nombre_padre);
                                $('#nombre_madre').val(data.data[0].per_nombre_madre);
                                $('#conyuge').val(data.data[0].per_nombre_conyuge);
                                $('#nacionalidad').val(data.data[0].per_nacionalidad_id);
                                $('#prais').val(data.data[0].per_prais);
                                $('#telefono').val(data.data[0].per_telefono);
                                $('#correo').val(data.data[0].per_correo);
                                
                                $('#guardar').click(function(){                  
                                    $.ajax({
                                        type: "PUT",
                                        url: url_base+"/api/persona/"+idPersona,
                                        data: {
                                            per_nombre: $('#nombre').val(),
                                            per_apellido_pat: $('#appaterno').val(),
                                            per_apellido_mat: $('#apmaterno').val(),
                                            per_sexo_id: $('#sexo').val(),
                                            per_nacimiento: $('#nacimiento').val(),
                                            per_nombre_padre: $('#nombre_padre').val(),
                                            per_nombre_madre: $('#nombre_madre').val(),
                                            per_rut: $('#rut').val(),
                                            per_conyuge: $('#conyuge').val(),
                                            per_prais: $('#prais').val(),
                                            per_telefono: $('#telefono').val(),
                                            per_correo: $('#correo').val(),
                                            per_nacionalidad_id: $('#nacionalidad').val()
                                            },
                                        dataType: "json",
                                        crossDomain: true,
                                        success: function(data){
                                            if(data.code == 200){
                                                alert("Datos actualizados");
                                            }
                                        },
                                        failure: function(errMsg) {
                                            alert(errMsg);
                                        }
                                    });
                                    
                                });
                            }
                        },
                        failure: function(errMsg) {
                            alert(errMsg);
                        }
                    });
                    
                });
                $('.ver-direcciones').click(function(){
                    var idPersona = $(this).parent().parent().attr('id');   
                    location.href="direcciones.html?idPersona="+idPersona;
                });
                $('.ver-prevision').click(function(){
                    var idPersona = $(this).parent().parent().attr('id');
                    location.href="prevision.html?idPersona="+idPersona;
                });
            }
        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    });
    $('#AgregarEnviar').click(function(){              
        $.ajax({
            type: "POST",
            url: url_base+"/api/persona",
            data: {
                per_nombre: $('#add-nombre').val(),
                per_apellido_pat: $('#add-appaterno').val(),
                per_apellido_mat: $('#add-apmaterno').val(),
                per_sexo_id: $('#add-sexo').val(),
                per_nacimiento: $('#add-nacimiento').val(),
                per_nombre_padre: $('#add-nombre_padre').val(),
                per_nombre_madre: $('#add-nombre_madre').val(),
                per_rut: $('#add-rut').val(),
                per_conyuge: $('#add-conyuge').val(),
                per_prais: $('#add-prais').val(),
                per_telefono: $('#add-telefono').val(),
                per_correo: $('#add-correo').val(),
                per_nacionalidad_id: $('#add-nacionalidad').val()
            },
            dataType: "json",
            crossDomain: true,
            success: function(data){
                alert("derp");
            },
            failure: function(errMsg) {
                alert(errMsg);
            }
        });
        
    });
    $('#buscar').click(function(){
        $.ajax({
            type: "GET",
            url: url_base+"/api/persona/search",
            data: {rut:$('#search').val()},
            dataType: "json",
            crossDomain: true,
            success: function(data){
                if(data.code == 200){
                    var personas = data.data;
                    $('#personas').html("");
                    for(var i = 0; i < Object.keys(personas).length; i++){
                        var tr = '<tr id="'+personas[i].per_id+'">';
                        tr += '<th>'+personas[i].per_rut+'</th>';
                        tr += '<th>'+personas[i].per_nombre+'</th>';
                        tr += '<th>'+personas[i].per_apellido_pat+'</th>';
                        tr += '<th>'+personas[i].per_apellido_mat+'</th>';
                        tr += '<th>'+personas[i].per_fecha_nacimiento+'</th>';
                        tr += '<th><button class="btn ver-persona" data-toggle="modal" data-target="#modalVer">Ver</button></th>';
                        tr += '</tr>'
                        $('#personas').append(tr);
                    }
                }
                else {
                    $("#aviso").append('<div class="alert alert-warning" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>No hay resultados</div>')
                }
            },
            failure: function(errMsg) {
                alert(errMsg);
            }
        });
    });
    $("#reload").click(function(){
        location.href = location.pathname;
    });
});

