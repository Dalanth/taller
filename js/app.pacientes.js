$(document).ready(function(){
    url_base = "http://tallerbd.azurewebsites.net/backend";
    //url_base = "http://localhost/slim";

    $.ajax({
        type: "GET",
        url: url_base+"/api/establecimiento",
        data: {},
        dataType: "json",
        crossDomain: true,
        success: function(data){
            if(data.code == 200){
                var establecimientos = data.data;
                for(var i =0; i < Object.keys(establecimientos).length; i++){
                    var option = '<option value="'+establecimientos[i].est_id+'">'+establecimientos[i].est_nombre+'</option>';
                    $('#establecimientos').append(option);
                }
                $('#establecimientos').trigger('change');
            }
        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    });
    $('#establecimientos').change(function(){
        $('#pacientes').empty();
        $.ajax({
            type: "GET",
            url: url_base+"/api/establecimiento/"+$('#establecimientos').val()+"/paciente",
            data: {},
            dataType: "json",
            crossDomain: true,
            success: function(data){
                if(data.code == 200){
                    var pacientes = data.data;
                    for(var i =0; i < Object.keys(pacientes).length; i++){
                        var tr = '<tr>';
                        tr += '<th>'+pacientes[i].per_rut+'' + jQuery.calculaDigitoVerificador(pacientes[i].per_rut) + '</th>';
                        tr += '<th>'+pacientes[i].per_nombre+'</th>';
                        tr += '<th>'+pacientes[i].per_apellido_pat+'</th>';
                        tr += '<th>'+pacientes[i].per_apellido_mat+'</th>';
                        tr += '<th>'+pacientes[i].pac_ficha+'</th>';
                        tr += '</tr>';
                        $('#pacientes').append(tr);
                    }
                }
            },
            failure: function(errMsg) {
                alert(errMsg);
            }
        });
    });
    $('#add-pac').click(function(){
        if($('#ficha').val() != "" && id != null && $('#establecimientos').val() != null){
            $.ajax({
                type: "POST",
                url: url_base+"/api/establecimiento/"+$('#establecimientos').val()+"/paciente",
                data: {ficha: $('#ficha').val(), persona: id, observacion: ""},
                dataType: "json",
                crossDomain: true,
                success: function(data){
                    if(data.code == 200){
                        $('#pacientes').empty();
                        $('#establecimientos').trigger('change');
                    }
                },
                failure: function(errMsg) {
                    alert(errMsg);
                }
            });
        }
    });
    $('#add-paciente').click(function(){
        $('#establecimiento-form').html($('#establecimientos option:selected').text());
    });
    var id;
    $('#rut-form').keyup(function(){
        if($('#rut-form').val().length >= 9){
            $.ajax({
                type: "GET",
                url: url_base+"/api/persona/search",
                data: {rut: $('#rut-form').val().split('-')[0]},
                dataType: "json",
                crossDomain: true,
                success: function(data){
                    if(data.code == 200){
                        persona = data.data[0];
                        $('#nombre-form').html(persona.per_nombre+" "+persona.per_apellido_pat+" "+persona.per_apellido_mat);
                        id = persona.per_id;
                    }
                },
                failure: function(errMsg) {
                    alert(errMsg);
                }
            });
        }
    });
});