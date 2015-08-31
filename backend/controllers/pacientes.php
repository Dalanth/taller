<?php
/*
*   @author Mirko Gueregat
*/
require_once "/../models/model.php";
require_once "/../util/Respond.php";

$app->get('/api/establecimiento', function () {
    $result = Model::select("SELECT est_id,est_nombre FROM establecimiento");
    if($result != null) Respond::response(200,$result);
    else Respond::response(400);
});
$app->get('/api/establecimiento/:establecimiento', function ($establecimiento) {
    $result = Model::select("SELECT est_id,est_nombre FROM establecimiento WHERE est_id=$establecimiento");
    if($result != null) Respond::response(200,$result);
    else Respond::response(400);
});
$app->get('/api/establecimiento/:establecimiento/paciente', function ($establecimiento) {
    $result = Model::select("SELECT pac_establecimiento_id, pac_ficha, pac_fecha_admision, pac_observacion, per_id, per_nombre, per_apellido_pat, per_apellido_mat, per_rut FROM paciente,persona WHERE pac_establecimiento_id=$establecimiento and pac_persona_id = per_id");
    if($result != null) Respond::response(200,$result);
    else Respond::response(400);
});
$app->post('/api/establecimiento/:establecimiento/paciente', function ($establecimiento) use ($app){
    $ficha = $app->request->post('ficha');
    $observacion = $app->request->post('observacion');
    $persona = $app->request->post('persona');
    $result = Model::query("INSERT INTO paciente(pac_ficha,pac_fecha_admision,pac_observacion,pac_persona_id,pac_establecimiento_id, pac_fecha_salida) VALUES($ficha,now(),'$observacion',$persona,$establecimiento,'0000-00-00')");
    if($result == true){
        $result = Model::select("SELECT * FROM paciente WHERE pac_persona_id = $persona and pac_establecimiento_id = $establecimiento");
        Respond::response(200,$result);
    } else Respond::response(400);
});
$app->get('/api/establecimiento/:establecimiento/paciente/:paciente', function ($establecimiento,$paciente) use ($app){
    $result = Model::select("SELECT pac_establecimiento_id, pac_ficha, pac_fecha_admision, pac_observacion, per_id, per_nombre, per_apellido_pat, per_apellido_mat, per_rut FROM paciente,persona WHERE pac_persona_id = $paciente and pac_establecimiento_id = $establecimiento and pac_persona_id = per_id");
    if($result != null) Respond::response(200,$result);
    else Respond::response(400);
});
$app->put('/api/establecimiento/:establecimiento/paciente/:paciente', function ($establecimiento,$paciente) {
    $ficha = $app->request->put('ficha');
    $observacion = $app->request->put('observacion');
    $result = Model::query("UPDATE paciente SET pac_ficha = $ficha, pac_observacion = '$observacion' WHERE pac_id = $paciente");
    if($result == true){
        $result = Model::select("SELECT * FROM paciente WHERE pac_persona_id = max(pac_id)");
        Respond::response(200,$result);
    } else Respond::response(400);
});
$app->delete('/api/establecimiento/:establecimiento/paciente/:paciente', function ($establecimiento,$paciente) {
    $result = Model::query("DELETE FROM paciente WHERE pac_persona_id = $paciente and pac_establecimiento_id = $establecimiento");
    if($result == true) Respond::response(200);
    else Respond::response(400);
});
?>