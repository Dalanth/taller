<?php
/*
*   @author Mirko Gueregat
*/
require_once "/../models/model.php";
require_once "/../util/Respond.php";
$app->get('/api/persona', function () {
    $result = Model::select("SELECT per_id, per_rut, per_nombre, per_apellido_pat, per_apellido_mat, per_sexo_id, per_fecha_nacimiento, per_fecha_fall, per_nombre_padre, per_nombre_madre, per_nombre_conyuge, per_nacionalidad_id, per_prais, per_telefono, per_correo FROM persona");
    if($result != null) Respond::response(200,$result); 
    else Respond::response(400);
});
$app->post('/api/persona', function() use ($app){
    $nombre = $app->request->post('nombre');
    $appaterno = $app->request->post('appaterno');
    $apmaterno = $app->request->post('apmaterno');
    $sexo = $app->request->post('sexo');
    $nacimiento = $app->request->post('nacimiento');
    $padre = $app->request->post('nombre_padre');
    $madre = $app->request->post('nombre_madre');
    $rut = $app->request->post('rut');
    $conyuge = $app->request->post('conyuge');  
    $prais = $app->request->post('prais');
    $telefono = $app->request->post('telefono') | null;
    $correo = $app->request->post('correo');
    $nacionalidad = $app->request->post('nacionalidad');
    $result = Model::query("INSERT INTO persona(per_rut, per_nombre, per_apellido_pat, per_apellido_mat, per_sexo_id, per_fecha_nacimiento, per_nombre_padre, per_nombre_madre, per_nombre_conyuge, per_nacionalidad_id, per_prais, per_telefono, per_correo, per_fecha_fall) VALUES($rut, '$nombre', '$appaterno', '$apmaterno', $sexo, '$nacimiento', '$padre','$madre', '$conyuge', $nacionalidad, '$prais', $telefono, '$correo', '0000-00-00')");
    if($result == true) {
        $result = Model::select("SELECT * FROM persona WHERE per_id = SELECT max(per_id) FROM persona");
        Respond::response(200,$result);
    } else Respond::response(400);
});
$app->get('/api/persona/search', function() use($app){
    $rut = $app->request->get('rut');
    $result = Model::select("SELECT * FROM persona WHERE per_rut = $rut");
    if($result != null) Respond::response(200,$result); 
    else Respond::response(400);
});
$app->get('/api/persona/:persona', function ($persona) {
    $result = Model::select("SELECT * FROM persona WHERE per_id = $persona");
    if($result != null) Respond::response(200,$result); 
    else Respond::response(400);
});
$app->put('/api/persona/:persona', function($persona) use ($app){
    $nombre = $app->request->put('nombre');
    $appaterno = $app->request->put('appaterno');
    $apmaterno = $app->request->put('apmaterno');
    $sexo = $app->request->put('sexo');
    $nacimiento = $app->request->put('nacimiento');
    $padre = $app->request->put('nombre_padre');
    $madre = $app->request->put('nombre_madre');
    $rut = $app->request->put('rut');
    $conyuge = $app->request->put('conyuge');  
    $prais = $app->request->put('prais');
    $telefono = $app->request->put('telefono');
    $correo = $app->request->put('correo');
    $nacionalidad = $app->request->put('nacionalidad');
    $result = Model::query("UPDATE persona SET per_rut = $rut, per_nombre = '$nombre', per_apellido_pat = '$appaterno', per_apellido_mat = '$apmaterno', per_sexo_id = $sexo, per_fecha_nacimiento = '$nacimiento', per_nombre_padre = '$padre', per_nombre_madre = '$madre', per_nombre_conyuge = '$conyuge', per_nacionalidad_id = $nacionalidad, per_prais = '$prais', per_telefono = $telefono, per_correo = '$correo' WHERE per_id = $persona");
    if($result == true) {
        $result = Model::select("SELECT * FROM persona WHERE per_id = $persona");
        Respond::response(200,$result);
    } else Respond::response(400);
});
$app->delete('/api/persona/:persona', function($persona){
    $result = Model::query("DELETE FROM persona WHERE per_id = $persona");
    if($result == true) Respond::response(200);
    else Respond::response(400);
});
$app->get('/api/persona/:persona/domicilio', function($persona){
    $result = Model::select("SELECT viv_id, viv_latitud, viv_longitud, viv_numero, viv_dpto, viv_block, viv_tel_fijo, cal_nombre, ciu_nombre, com_nombre, pro_nombre, reg_nombre, sec_nombre FROM vivienda, persona_vivienda, calle, ciudad, comuna, provincia, region, sector WHERE pev_vivienda_id = viv_id and pev_persona_id = $persona and sec_id = viv_sector_id and cal_id = viv_calle_id and cal_ciudad_id = ciu_id and ciu_comuna_id = com_id and com_provincia_id = pro_id and pro_region_id = reg_id");
    if($result != null) Respond::response(200,$result); 
    else Respond::response(400);
});
$app->post('/api/persona/:persona/domicilio', function($persona) use ($app){
    $calle = $app->request->post('calle');
    $numero = $app->request->post('numero');
    $dpto = $app->request->post('dpto') | null;
    $block = $app->request->post('block');
    $telefono = $app->request->post('telefono') | null;
    $lat = $app->request->post('lat');
    $long = $app->request->post('long');
    $sector = $app->request->post('sector');
    $result = Model::select("SELECT viv_id FROM vivienda WHERE viv_calle_id = $calle and viv_numero = $numero and viv_dpto = $dpto");
    if($result == null){
        $result = Model::query("INSERT INTO vivienda(viv_latitud, viv_longitud, viv_numero, viv_dpto, viv_block, viv_tel_fijo, viv_sector_id, viv_calle_id) VALUES('$lat', '$long', $numero, $dpto, '$block', $telefono, $sector, $calle)");
        if($result == true){
            $result = Model::query("INSERT INTO persona_vivienda(pev_persona_id, pev_vivienda_id) VALUES($persona, (SELECT max(viv_id) FROM vivienda WHERE viv_calle_id = $calle and viv_numero = $numero))");
            if($result == true) Respond::response(200,$result); 
            else Respond::response(400);
        } else Respond::response(400);
    } else {
        $id = $result[0]['viv_id'];
        $result = Model::query("INSERT INTO persona_vivienda(pev_persona_id, pev_vivienda_id) VALUES($persona, $id)");
        if($result == true) Respond::response(200,$result); 
        else Respond::response(400);
    }
});
$app->get('/api/persona/:persona/domicilio/:domicilio', function($persona,$domicilio){
    $result = Model::select("SELECT viv_id, viv_latitud, viv_longitud, viv_numero, viv_dpto, viv_block, viv_tel_fijo, cal_nombre, ciu_nombre, com_nombre, pro_nombre, reg_nombre, sec_nombre FROM vivienda, persona_vivienda, calle, ciudad, comuna, provincia, region, sector WHERE pev_vivienda_id = viv_id and pev_persona_id = $persona and sec_id = viv_sector_id and cal_id = viv_calle_id and cal_ciudad_id = ciu_id and ciu_comuna_id = com_id and com_provincia_id = pro_id and pro_region_id = reg_id and viv_id = $domicilio");
    if($result != null) Respond::response(200,$result); 
    else Respond::response(400);
});
$app->delete('/api/persona/:persona/domicilio/:domicilio', function($persona,$domicilio) use ($app){
    $result = Model::query("DELETE FROM persona_vivienda WHERE pev_persona_id=$persona and pev_vivienda_id=$domicilio");
    if($result != null) Respond::response(200); 
    else Respond::response(400);
});
$app->get('/api/persona/:persona/prevision', function($persona){
    $result = Model::select("SELECT 'titular' as rol, tpr_detalle, pre_nombre, tit_vencimiento FROM titular, prevision, tipo_prevision WHERE tit_persona_id = $persona and pre_tipo_id = tpr_id and tit_prevision_id = pre_id");
    $result2 = Model::select("SELECT 'carga' as rol, car_vencimiento as vencimiento_carga, per_rut as rut_titular, per_nombre as nombre_titular, per_apellido_pat as appat_titular, per_apellido_mat as apmat_titular, tpr_detalle, pre_nombre, tit_vencimiento as vencimiento_prevision FROM carga,titular,persona, prevision, tipo_prevision WHERE car_persona_id = $persona and car_titular_id = tit_persona_id and per_id = tit_persona_id and pre_id = tit_prevision_id and tpr_id = pre_tipo_id");
    if($result != null) Respond::response(200,$result);
    else if($result2 != null) Respond::response(200,$result2);
    else Respond::response(200,array(array('rol' => "Sin prevision"))); 
});
$app->post('/api/persona/:persona/titular', function($persona) use($app){
    $prevision = $app->request->post('prevision');
    $vencimiento = $app->request->post('vencimiento');
    $result = Model::select("SELECT true as result FROM carga WHERE car_persona_id = $persona");
    if($result == null){
        $result = Model::query("INSERT INTO titular(tit_persona_id, tit_prevision_id, tit_vencimiento) VALUES($persona, $prevision, '$vencimiento')");
        if($result == true) Respond::response(200); 
        else Respond::response(400);
    } else Respond::response(400, "La persona ya es una carga, elimínela primero");
});
$app->put('/api/persona/:persona/titular', function($persona) use($app){
    $prevision = $app->request->put('prevision');
    $vencimiento = $app->request->post('vencimiento');
    $result = Model::query("UPDATE titular SET tit_prevision_id = $prevision, tit_vencimiento = '$vencimiento' WHERE tit_persona_id = $persona");
    if($result == true) Respond::response(200); 
    else Respond::response(400);
});
$app->delete('/api/persona/:persona/titular', function($persona) use($app){
    $result = Model::query("DELETE FROM titular WHERE tit_persona_id = $persona");
    if($result == true) Respond::response(200);
    else Respond::response(400);
});
$app->get('/api/persona/:persona/carga', function($persona){
    $result = Model::select("SELECT car_id,per_id, per_rut, per_nombre, per_apellido_pat, per_apellido_mat, per_sexo_id, per_fecha_nacimiento, per_fecha_fall, per_nombre_padre, per_nombre_madre, per_nombre_conyuge, per_nacionalidad_id, per_prais, per_telefono, per_correo FROM persona,carga,titular WHERE car_persona_id = per_id and tit_persona_id = $persona and car_titular_id = $persona");
    if($result != null) Respond::response(200,$result); 
    else Respond::response(400);
});
$app->post('/api/persona/:persona/carga', function($persona) use($app){
    $titular = $app->request->post('titular');
    $vencimiento = $app->request->post('vencimiento');
    $result = Model::select("SELECT true as result FROM titular WHERE tit_persona_id = $persona");
    if($result == null){
        $result = Model::query("INSERT INTO carga(car_persona_id, car_titular_id, car_vencimiento) VALUES($persona, $titular, '$vencimiento')");
        if($result == true){
            $result = Model::select("SELECT car_id,per_id, per_rut, per_nombre, per_apellido_pat, per_apellido_mat, per_sexo_id, per_fecha_nacimiento, per_fecha_fall, per_nombre_padre, per_nombre_madre, per_nombre_conyuge, per_nacionalidad_id, per_prais, per_telefono, per_correo FROM persona,carga,titular WHERE car_persona_id = per_id and tit_persona_id = $persona and car_titular_id = $persona and car_id = max(car_id)");
            Respond::response(200,$result); 
        } else Respond::response(400);
    } else Respond::response(400, "La persona es titular de un plan de salud");
});
$app->get('/api/persona/:persona/carga/:carga', function($persona, $carga){
    $result = Model::select("SELECT car_id,per_id, per_rut, per_nombre, per_apellido_pat, per_apellido_mat, per_sexo_id, per_fecha_nacimiento, per_fecha_fall, per_nombre_padre, per_nombre_madre, per_nombre_conyuge, per_nacionalidad_id, per_prais, per_telefono, per_correo FROM persona,carga,titular WHERE car_persona_id = per_id and tit_persona_id = $persona and car_titular_id = $persona and car_id=$carga");
    if($result != null) Respond::response(200,$result); 
    else Respond::response(400);
});
$app->put('/api/persona/:persona/carga', function($persona) use($app){
    $titular = $app->request->post('titular');
    $vencimiento = $app->request->post('vencimiento');
    $result = Model::query("UPDATE carga SET car_titular_id = $titular, car_vencimiento = '$vencimiento' WHERE car_persona_id = $persona");
    if($result == true) Respond::response(200); 
    else Respond::response(400);
});
$app->delete('/api/persona/:persona/carga', function($persona) use($app){
    $result = Model::query("DELETE FROM carga WHERE car_persona_id = $persona");
    if($result == true) Respond::response(200);
    else Respond::response(400);
});
$app->get('/api/prevision/tipo', function(){
    $result = Model::select("SELECT * FROM tipo_prevision");
    if($result == true) Respond::response(200,$result);
    else Respond::response(400);
});
$app->get('/api/prevision/tipo/:tipo', function($tipo){
    $result = Model::select("SELECT * FROM prevision WHERE pre_tipo_id = $tipo");
    if($result == true) Respond::response(200,$result);
    else Respond::response(400);
});
    
?>