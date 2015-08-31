$(document).ready(function(){
    var idPersona = location.href.split('?')[1].split('=')[1];
    // pestaña prevision
    $.ajax({
        type: "GET",
        url: url_base+"/api/prevision/tipo",
        dataType: "json",
        contentType: "application/json",
        crossDomain: true,
        success: function(data){
            if(data.code == 200){
                var previsiones = data.data;
                for(var i = 0; i < Object.keys(previsiones).length; i++){
                    var option = '<option value="'+previsiones[i].tpr_id+'">'+previsiones[i].tpr_detalle+'</option>';
                    $('#tpr_detalle').append(option);
                    $('#tpr_detalle').trigger('change');
                    
                }
            }
        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    }); 
    $.ajax({
        type: "GET",
        url: url_base+"/api/persona/"+idPersona+"/prevision",
        data: { },
        dataType: "json",
        crossDomain: true,
        success: function(data){
            if(data.code == 200){
                try {
                    var prevision = data.data[0];
                    $('#rol').val(prevision.rol);
                }
                catch(err) {
                    var prevision = data.data;
                }
                    
                if (prevision.rol == "carga") {
                    $('#rol').prop( "disabled", true );
                    $('#tpr_detalle').prop( "disabled", true );
                    $('#pre_nombre').prop( "disabled", true );
                    $('#vencimiento_carga').prop( "disabled", false );
                    $('#rut_titular').prop( "disabled", true );
                    $('#nombre_titular').prop( "disabled", true );
                    $('#appat_titular').prop( "disabled", true );
                    $('#apmat_titular').prop( "disabled", true );
                    $('#vencimiento_prevision').prop( "disabled", true );
                    $('.form-carga').removeClass( "hidden" );
                    $('#save-prev').removeClass( "hidden" );
                    $('#vencimiento_carga').val(prevision.vencimiento_carga);
                    $('#rut_titular').val(prevision.rut_titular);
                    $('#nombre_titular').val(prevision.nombre_titular);
                    $('#appat_titular').val(prevision.appat_titular);
                    $('#apmat_titular').val(prevision.apmat_titular);
                    $('#table-cargas').addClass( "hidden" );
                    $('#vencimiento_prevision').val(prevision.vencimiento_prevision);
                    
                } 
                else if (prevision.rol == "titular") {
                    $('#rol').prop( "disabled", true );
                    $('#table-cargas').removeClass( "hidden" );
                    $('.form-carga').addClass( "hidden" );
                    $('#add-carga').removeClass( "hidden" );
                    $('#save-prev').removeClass( "hidden" );
                    $('#eliminar-prev').removeClass( "hidden" );
                    $('#vencimiento_prevision').val(prevision.tit_vencimiento);
                } else {
                    $('#asignar-prev').removeClass( "hidden" );
                }
                $("#tpr_detalle option").filter(function() {
                    return $(this).text() == prevision.tpr_detalle; 
                }).prop('selected', true);
                $.when(getPrevisions()).done(function(){
                    $("#pre_nombre option").filter(function() {
                        return $(this).text() == prevision.pre_nombre; 
                    }).prop('selected', true);
                });                
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
                                tr += '<th><button class="btn btn-danger del-carga">Eliminar</button></th>';
                                tr += '</tr>'
                                $('#cargas').append(tr);
                            }
                            $('.del-carga').click(function(e){
                                e.preventDefault();
                                if(confirm("¿Está seguro que desea completar ésta acción?")){
                                    $.ajax({
                                        type: "DELETE",
                                        url: url_base+"/api/persona/"+$(this).parent().parent().attr('id')+"/carga",
                                        data: {},
                                        dataType: "json",
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
                $('#save-prev').click(function(e){
                    console.log('save');
                    e.preventDefault();
                    if ($('#rol').val() == "carga") {
                        if(confirm("¿Está seguro que desea completar ésta acción?")){
                            $.ajax({
                                type: "GET",
                                url: url_base+"/api/persona/search",
                                data: {rut:$('#rut_carga_titular').val().split('-')[0]},
                                dataType: "json",
                                crossDomain: true,
                                success: function(data){
                                    if(data.code == 200){
                                        var personas = data.data;
                                        for(var i = 0; i < Object.keys(personas).length; i++){
                                            if ($('#rol').val() == prevision.rol) {
                                                $.ajax({
                                                    type: "POST",
                                                    url: url_base+"/api/persona/"+idPersona+"/carga",
                                                    data: { titular: personas[i].per_id,
                                                            vencimiento: $('#vencimiento').val() },
                                                    dataType: "json",
        
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
                                            } else {
                                                $.ajax({
                                                    type: "PUT",
                                                    url: url_base+"/api/persona/"+idPersona+"/carga",
                                                    data: { titular: personas[i].per_id,
                                                            vencimiento: $('#vencimiento').val() },
                                                    dataType: "json",
        
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
                                         }
                                    } else {
                                        alert('No hay titular con ese rut');
                                    }
                                },
                                failure: function(errMsg) {
                                    alert(errMsg);
                                }
                            });
                        }
                    } else if ($('#rol').val() == "titular") {
                        if ($('#rol').val() == prevision.rol) {
                            //put persona titular
                            $.ajax({
                                type: "PUT",
                                url: url_base+"/api/persona/"+idPersona+"/titular",
                                data: { titular: $('#titular').val(),
                                        vencimiento: $('#vencimiento').val() },
                                dataType: "json",
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
                        } else {
                            //Asignar prevision
                            $.ajax({
                                type: "POST",
                                url: url_base+"/api/persona/"+idPersona+"/titular",
                                data: { tpr_detalle: $('#tpr_detalle').val(),
                                        pre_nombre: $('#pre_nombre').val(),
                                        vencimiento: $('#vencimiento').val() },
                                dataType: "json",
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
                    }
                });
                $('#eliminar-prev').click(function(e){
                    e.preventDefault();
                    if ($('#rol').val() == "titular") {
                        $.ajax({
                            type: "DELETE",
                            url: url_base+"/api/persona/"+idPersona+"/titular",
                            data: { },
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
                $('#cargaEnviar').click(function(e){
                    console.log('enviar');
                    e.preventDefault();
                    $.ajax({
                        type: "GET",
                        url: url_base+"/api/persona/search",
                        data: {rut:$('#rut_carga_titular').val().split('-')[0]},
                        dataType: "json",
                        crossDomain: true,
                        success: function(data){
                            if(data.code == 200){
                                var personas = data.data;
                                for(var i = 0; i < Object.keys(personas).length; i++){
                                    if(confirm("¿Está seguro que desea completar ésta acción?")){
                                        //post persona carga
                                        $.ajax({
                                            type: "POST",
                                            url: url_base+"/api/persona/"+personas[i].per_id+"/carga",
                                            data: {titular: idPersona, vencimiento: $('#vencimiento_prevision').val()},
                                            dataType: "json",
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
                                }
                            }
                            else {
                                alert('No hay titular con ese rut');
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
    $('#tpr_detalle').change(function(){
        $('#pre_nombre').empty();
        getPrevisions();
    });
    var titularId;
    $('#rol').change(function(){
        if ($('#rol').val() == "carga") {
            $('.form-carga').removeClass( "hidden" );
            $('#tpr_detalle').parent().parent().hide();
            $('#pre_nombre').parent().parent().hide();
            $('#vencimiento_prevision').parent().parent().hide();
            $('#nombre_titular').prop( "disabled", true );
            $('#appat_titular').prop( "disabled", true );
            $('#apmat_titular').prop( "disabled", true );
            $('#rut_titular').keyup(function(){
                if($('#rut_titular').val().length >= 9){
                    $.ajax({
                        type: "GET",
                        url: url_base+"/api/persona/search",
                        data: {rut:$('#rut_titular').val().split('-')[0]},
                        dataType: "json",
                        crossDomain: true,
                        success: function(data){
                            if(data.code == 200){
                                titularId = data.data[0].per_id;
                                persona = data.data[0];
                                $.ajax({
                                    type: "GET",
                                    url: url_base+"/api/persona/"+titularId+"/prevision",
                                    data: {rut:$('#rut_titular').val().split('-')[0]},
                                    dataType: "json",
                                    crossDomain: true,
                                    success: function(data){
                                        if(data.code == 200){
                                            titular = data.data[0];
                                            if(titular.rol == "titular"){
                                                $('#nombre_titular').val(persona.per_nombre);
                                                $('#appat_titular').val(persona.per_apellido_pat);
                                                $('#apmat_titular').val(persona.per_apellido_mat);
                                            } else {
                                                alert('No hay titular con ese rut');
                                            }                                            
                                        } else {
                                            alert('No hay titular con ese rut');
                                        }
                                    },
                                    failure: function(errMsg) {
                                        alert(errMsg);
                                    }
                                });
                            } else {
                            }
                        },
                        failure: function(errMsg) {
                            alert(errMsg);
                        }
                    });
                }
            });
            
        } else{
            $('.form-carga').addClass( "hidden" );
            $('#tpr_detalle').parent().parent().show();
            $('#pre_nombre').parent().parent().show();
            $('#vencimiento_prevision').parent().parent().show();
            $('#nombre_titular').prop( "disabled", false );
            $('#appat_titular').prop( "disabled", false );
            $('#apmat_titular').prop( "disabled", false );
        }
    });
    $('#asignar-prev').click(function(e){
        e.preventDefault();
        if ($('#rol').val() == "carga") {
            $.ajax({
                type: "POST",
                url: url_base+"/api/persona/"+idPersona+"/carga",
                data: { titular: titularId,
                       vencimiento: $('#vencimiento_carga').val() },
                dataType: "json",
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
        } else if ($('#rol').val() == "titular") {
            if(confirm("¿Está seguro que desea completar ésta acción?")){
                //post persona titular
                $.ajax({
                    type: "POST",
                    url: url_base+"/api/persona/"+idPersona+"/titular",
                    data: { prevision: $('#pre_nombre').val(),
                           vencimiento: $('#vencimiento_prevision').val() },
                    dataType: "json",
                    crossDomain: true,
                    success: function(data){
                        if(data.code == 200){
                            location.href = location.pathname;
                        }
                    },
                    failure: function(errMsg) {
                        alert(errMsg);
                    }
                });
            }
        }
    });
    $('#rut_carga_titular').keyup(function(){
        if($('#rut_carga_titular').val().length >= 9){
            $.ajax({
                type: "GET",
                url: url_base+"/api/persona/search",
                data: {rut:$('#rut_carga_titular').val().split('-')[0]},
                dataType: "json",
                crossDomain: true,
                success: function(data){
                    if(data.code == 200){
                        titularId = data.data[0].per_id;
                        persona = data.data[0];
                        $.ajax({
                            type: "GET",
                            url: url_base+"/api/persona/"+titularId+"/prevision",
                            data: {},
                            dataType: "json",
                            crossDomain: true,
                            success: function(data){
                                if(data.code == 200){
                                    titular = data.data[0];
                                    if(titular.rol == "Sin prevision"){
                                        $('#nombre-carga').val(persona.per_nombre+' '+persona.per_apellido_pat);
                                    } else {
                                        alert('No hay titular con ese rut');
                                    }                                            
                                } else {
                                    alert('No hay titular con ese rut');
                                }
                            },
                            failure: function(errMsg) {
                                alert(errMsg);
                            }
                        });
                    } else {
                    }
                },
                failure: function(errMsg) {
                    alert(errMsg);
                }
            });
        }
    });
    function getPrevisions(){
        return $.ajax({
            type: "GET",
            url: url_base+"/api/prevision/tipo/"+$('#tpr_detalle').val(),
            dataType: "json",
            contentType: "application/json",
            crossDomain: true,
            success: function(data){
                if(data.code == 200){
                    $('#pre_nombre').empty();
                    var previsiones = data.data;
                    for(var i = 0; i < Object.keys(previsiones).length; i++){
                        var option = '<option value="'+previsiones[i].pre_id+'">'+previsiones[i].pre_nombre+'</option>';
                        $('#pre_nombre').append(option);

                    }
                }
            },
            failure: function(errMsg) {
                alert(errMsg);
            }
        }); 
    }
});
/*



*/