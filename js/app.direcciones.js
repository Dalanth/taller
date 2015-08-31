$(document).ready(function(){
    url_base = "http://tallerbd.azurewebsites.net/backend";
    //url_base = "http://localhost/slim";
    var idPersona = location.href.split('?')[1].split('=')[1];
    var lat = -39.850885;
    var lon = -73.213073;
    var zoom = 17;

    $.ajax({
        type: "GET",
        url: url_base+"/api/persona/"+idPersona+"/domicilio",
        data: {},
        dataType: "json",
        crossDomain: true,
        success: function(data){
            if(data.code == 200){
                direcciones = data.data;
                for(var i = 0; i < Object.keys(direcciones).length; i++){
                    var tr = '<tr id="'+direcciones[i].viv_id+'">';
                    tr += '<th>'+direcciones[i].cal_nombre+'</th>';
                    tr += '<th>'+direcciones[i].viv_numero+'</th>';
                    tr += '<th>'+direcciones[i].viv_dpto+'</th>';
                    tr += '<th>'+direcciones[i].viv_block+'</th>';
                    tr += '<th>'+direcciones[i].ciu_nombre+'</th>';
                    tr += '<th>'+direcciones[i].com_nombre+'</th>';
                    tr += '<th>'+direcciones[i].reg_nombre+'</th>';
                    tr += '<th><button class="btn btn-dafault ver-direccion">Ver</button><button class="btn btn-danger eliminar-direccion">x</button></th>';
                    tr += '</tr>';
                    $('#direcciones').append(tr);
                }
                lat = direcciones[0].viv_latitud; 
                lon = direcciones[0].viv_longitud;
                $('.ver-direccion').click(function(){
                    $.ajax({
                        type: "GET",
                        url: url_base+"/api/persona/"+idPersona+"/domicilio/"+$(this).parent().parent().attr('id'),
                        data: {},
                        dataType: "json",
                        crossDomain: true,
                        success: function(data){
                            if(data.code == 200){
                                var direccion = data.data;
                                var _address = $.goMap.createListener({type:'marker', marker:'address'}, 'position_changed', function() { 
                                    $.goMap.fitBounds();
                                    $.goMap.removeListener(_address);
                                    $.goMap.setMap({zoom:17});
                                });
                                $.goMap.setMarker('address', {latitude: direccion[0].viv_latitud,longitude: direccion[0].viv_longitud, zoom: 17});
                            }
                        },
                        failure: function(errMsg) {
                            alert(errMsg);
                        }
                    });
                });
                $('.eliminar-direccion').click(function(e){
                    e.preventDefault();
                    if(confirm("¿Esta seguro de la eliminación?")){
                        $.ajax({
                            type: "DELETE",
                            url: url_base+"/api/persona/"+idPersona+"/domicilio/"+$(this).parent().parent().attr('id'),
                            data: {},
                            dataType: "json",
                            contentType: "application/json",
                            crossDomain: true,
                            success: function(data){
                                if(data.code == 200){
                                    location.href = "direcciones.html?idPersona="+idPersona;
                                }
                            },
                            failure: function(errMsg) {
                                alert(errMsg);
                            }
                        });   
                    }
                });
            }
            $("#map").goMap({
                scaleControl: true, 
                maptype: 'HYBRID', 
                streetViewControl: false,
                markers: [], 
                zoom: zoom,
                markers: [{
                    id: 'address',
                    latitude: lat, 
                    longitude: lon,
                    draggable: false
                }]
            });
            var _address = $.goMap.createListener({type:'marker', marker:'address'}, 'position_changed', function() { 
                $.goMap.fitBounds();
                $.goMap.removeListener(_address);
                $.goMap.setMap({zoom:17});
            });
        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    });
    $.ajax({
        type: "GET",
        url: url_base+"/api/comuna",
        data: {},
        dataType: "json",
        crossDomain: true,
        success: function(data){
            if(data.code == 200){
                var comunas = data.data;
                for(var i =0; i < Object.keys(comunas).length; i++){
                    var option = '<option value="'+comunas[i].com_id+'">'+comunas[i].com_nombre+'</option>';
                    $('#comuna').append(option);
                }
                $('#comuna').trigger('change');
            }
        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    });
    $.ajax({
        type: "GET",
        url: url_base+"/api/sector",
        data: {},
        dataType: "json",
        crossDomain: true,
        success: function(data){
            if(data.code == 200){
                var sectores = data.data;
                for(var i =0; i < Object.keys(sectores).length; i++){
                    var option = '<option value="'+sectores[i].sec_id+'">'+sectores[i].sec_nombre+'</option>';
                    $('#sector').append(option);
                }
            }
        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    });
    $('#add-address').click(function(){
        $('#table-direcciones').toggle('slide');
        $('#add-form').toggle('slide');
        $.goMap.setMarker('address', {latitude: -39.818855, longitude: -73.240232});
        $.goMap.setMap({latitude: -39.818855, longitude: -73.240232, zoom:14, draggable: true});
        $('#ciudad').empty();
        
    });
    $('#comuna').change(function(){
        $.ajax({
            type: "GET",
            url: url_base+"/api/comuna/"+$('#comuna').val()+"/ciudad",
            data: {},
            dataType: "json",
            crossDomain: true,
            success: function(data){
                if(data.code == 200){
                    var ciudades = data.data;
                    for(var i =0; i < Object.keys(ciudades).length; i++){
                        var option = '<option value="'+ciudades[i].ciu_id+'">'+ciudades[i].ciu_nombre+'</option>';
                        $('#ciudad').append(option);
                    }
                }
            },
            failure: function(errMsg) {
                alert(errMsg);
            }
        });
    });
    $('#calle').keyup(function(){
        $('#search-result').show();
        if($('#calle').val() != ""){
            $.ajax({
                type: "GET",
                url: url_base+"/api/comuna/"+$('#comuna').val()+"/ciudad/"+$('#ciudad').val()+"/calle/search/"+$('#calle').val(),
                data: {},
                dataType: "json",
                crossDomain: true,
                success: function(data){
                    if(data.code == 200){
                        var calles = data.data;
                        $('#search-result').empty();
                        for(var i =0; i < Object.keys(calles).length; i++){
                            var tr = '<tr id="'+calles[i].cal_id+'" class="calle-result">';
                            tr += '<th>'+calles[i].cal_nombre+'</th>';
                            tr += '</th>';
                            $('#search-result').append(tr);
                        }
                        $('.calle-result').click(function(){
                            $('#calle').val($(this).children().html());
                            $('#calle').attr('calle-id', $(this).attr('id'));
                            $('#search-result').empty();
                            $('#search-result').hide();
                            var _address = $.goMap.createListener({type:'marker', marker:'address'}, 'position_changed', function() { 
                                $.goMap.fitBounds();
                                $.goMap.removeListener(_address);
                                $.goMap.setMap({zoom:17});
                            });
                            $.goMap.setMarker('address', {address: $(this).children().html()+', '+$('#ciudad option:selected').text(), draggable: true});
                            
                        })
                    }
                },
                failure: function(errMsg) {
                    alert(errMsg);
                }
            });
        } else {
            $('#search-result').empty();
        }
    });
    $('#aceptar').click(function(e){
        e.preventDefault();
        if($('#ciudad').val() != "" && $('#calle').val() != "" && $('#numero').val() != "" && $('#calle').attr('calle-id') != ""){
            var departamento = $('#departamento').val();
            if(departamento == "") departamento = null;
            var latlon = $($.goMap.mapId).data('address').getPosition().toUrlValue();
            var lat = latlon.split(',')[0];
            var lon = latlon.split(',')[1];
            $.ajax({
                type: "POST",
                url: url_base+"/api/persona/"+idPersona+"/domicilio",
                data: {calle: $('#calle').attr('calle-id'),
                       numero: $('#numero').val(),
                       dpto: $('#dpto').val(),
                       block: $('#block').val(),
                       lat: lat,
                       long: lon,
                       sector: $('#sector').val()}
                ,
                dataType: "json",
                crossDomain: true,
                success: function(data){
                    if(data.code == 200){
                        location.href = "direcciones.html?idPersona="+idPersona;
                    }
                },
                failure: function(errMsg) {
                    alert(errMsg);
                }
            });
        }
    });
    $('#cancelar').click(function(e){
        e.preventDefault();
        $('#table-direcciones').toggle('slide');
        $('#add-form').toggle('slide');
    });
});