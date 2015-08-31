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
                try {
                    var prevision = data.data[0];
                    $('#rol').val(prevision.rol);
                }
                catch(err) {
                    var prevision = data.data;
                    alert(prevision.rol);
                }
                    
                if (prevision.rol == "carga") {
                    $('#rol').prop( "disabled", true );
                    $('.form-carga').removeClass( "hidden" );
                    $('#save-prev').removeClass( "hidden" );
                    $('#vencimiento_carga').val(prevision.vencimiento_carga);
                    $('#rut_titular').val(prevision.rut_titular);
                    $('#nombre_titular').val(prevision.nombre_titular);
                    $('#appat_titular').val(prevision.appat_titular);
                    $('#apmat_titular').val(prevision.apmat_titular);
                    $('#table-cargas').addClass( "hidden" );
                } else if (prevision.rol == "titular") {
                    $('#rol').prop( "disabled", true );
                    $('#table-cargas').removeClass( "hidden" );
                    $('.form-carga').addClass( "hidden" );
                    $('#add-carga').removeClass( "hidden" );
                    $('#save-prev').removeClass( "hidden" );
                    $('#eliminar-prev').removeClass( "hidden" );
                } else {
                    $('#asignar-prev').removeClass( "hidden" );
                }
                $('#tpr_detalle').val(prevision.tpr_detalle);
                $('#pre_nombre').val(prevision.pre_nombre);
                $('#vencimiento_prevision').val(prevision.vencimiento_prevision);
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
                                                location.href = location.pathname+"prevision.html?idPersona="+idPersona;
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
                    e.preventDefault();
                    if ($('#rol').val() == "carga") {
                        if(confirm("¿Está seguro que desea completar ésta acción?")){
                            if ($('#rol').val() == prevision.rol) {
                                $.ajax({
                                    type: "POST",
                                    url: url_base+"/api/persona/"+idPersona+"/carga",
                                    data: { titular: $('#titular').val(),
                                            vencimiento: $('#vencimiento').val() },
                                    dataType: "json",
                                    contentType: "application/json",
                                    crossDomain: true,
                                    success: function(data){
                                        if(data.code == 200){
                                            location.href = location.pathname+"prevision.html?idPersona="+idPersona;
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
                                    data: { titular: $('#titular').val(),
                                            vencimiento: $('#vencimiento').val() },
                                    dataType: "json",
                                    contentType: "application/json",
                                    crossDomain: true,
                                    success: function(data){
                                        if(data.code == 200){
                                            location.href = location.pathname+"prevision.html?idPersona="+idPersona;
                                        }
                                    },
                                    failure: function(errMsg) {
                                        alert(errMsg);
                                    }
                                });
                            }
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
                                contentType: "application/json",
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
                        } else {
                            //Asignar prevision
                            $.ajax({
                                type: "POST",
                                url: url_base+"/api/persona/"+idPersona+"/titular",
                                data: { tpr_detalle: $('#tpr_detalle').val(),
                                        pre_nombre: $('#pre_nombre').val(),
                                        vencimiento: $('#vencimiento').val() },
                                dataType: "json",
                                contentType: "application/json",
                                crossDomain: true,
                                success: function(data){
                                    if(data.code == 200){
                                        location.href = location.pathname+"prevision.html?idPersona="+idPersona;
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
                                    location.href = location.pathname+"prevision.html?idPersona="+idPersona;
                                }
                            },
                            failure: function(errMsg) {
                                alert(errMsg);
                            }
                        });
                    }
                });
                $('#asignar-prev').click(function(e){
                    e.preventDefault();
                    if ($('#rol').val() == "carga") {
                        if(confirm("¿Está seguro que desea completar ésta acción?")){
                            //post persona carga
                            $.ajax({
                                type: "POST",
                                url: url_base+"/api/persona/"+idPersona+"/carga",
                                data: { titular: $('#titular').val(),
                                        vencimiento: $('#vencimiento').val() },
                                dataType: "json",
                                contentType: "application/json",
                                crossDomain: true,
                                success: function(data){
                                    if(data.code == 200){
                                        location.href = location.pathname+"prevision.html?idPersona="+idPersona;
                                    }
                                },
                                failure: function(errMsg) {
                                    alert(errMsg);
                                }
                            });  
                        }
                    } else if ($('#rol').val() == "titular") {
                        if(confirm("¿Está seguro que desea completar ésta acción?")){
                            //post persona titular
                            $.ajax({
                                type: "POST",
                                url: url_base+"/api/persona/"+idPersona+"/titular",
                                data: { prevision: $('#prevision').val(),
                                        vencimiento: $('#vencimiento').val() },
                                dataType: "json",
                                contentType: "application/json",
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
            }
        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    });
});
/*



*/