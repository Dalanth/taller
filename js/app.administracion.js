$(document).ready(function(){
    url_base = "http://tallerbd.azurewebsites.net/backend";
    //url_base = "http://localhost/slim";
    
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
                        $('#ciudad').trigger('change');                        
                    }
                }
            },
            failure: function(errMsg) {
                alert(errMsg);
            }
        });
    });
    $('#ciudad').change(function(){
        $.ajax({
            type: "GET",
            url: url_base+"/api/comuna/"+$('#comuna').val()+"/ciudad/"+$('#ciudad').val()+"/calle",
            data: {},
            dataType: "json",
            crossDomain: true,
            success: function(data){
                if(data.code == 200){
                    $('#calles').empty();
                    var calles = data.data;
                    for(var i =0; i < Object.keys(calles).length; i++){
                        var tr = '<tr id="'+calles[i].cal_id+'">';
                        tr += '<th>'+calles[i].cal_id+'</th>';
                        tr += '<th>'+calles[i].cal_nombre+'</th>';
                        tr += '</tr>';
                        $('#calles').append(tr);
                    }
                }
            },
            failure: function(errMsg) {
                alert(errMsg);
            }
        });
    });
    $('#add-street').click(function(){
        $('#comuna-add').html($('#comuna option:selected').text());
        $('#ciudad-add').html($('#ciudad option:selected').text());
    });
    $('#add-street').click(function(){
        if($('#ciudad').val() != null && $('#calle-add').val() != ""){
            $.ajax({
                type: "POST",
                url: url_base+"/api/comuna/"+$('#comuna').val()+"/ciudad/"+$('#ciudad').val()+"/calle",
                data: {nombre: $('#calle-add').val()},
                dataType: "json",
                crossDomain: true,
                success: function(data){
                    if(data.code == 200){
                        $('#calles').empty();
                        $('#ciudad').trigger('change');
                    }
                },
                failure: function(errMsg) {
                    alert(errMsg);
                }
            });
        }
    });
});