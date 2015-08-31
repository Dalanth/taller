<?php
/*
*   @author Mirko Gueregat
*/
require_once "/../models/model.php";
require_once "/../util/Respond.php";
$app->get('/api/comuna', function(){
    $result = Model::select("SELECT com_id,com_nombre,pro_id,pro_nombre FROM comuna,provincia WHERE com_provincia_id=pro_id ORDER BY com_nombre");
    if($result != null) Respond::response(200,$result);
    else Respond::response(400);
});
$app->get('/api/comuna/:comuna', function($comuna){
    $result = Model::select("SELECT com_id,com_nombre FROM comuna WHERE com_id=$comuna");
    if($result != null) Respond::response(200,$result);
    else Respond::response(400);
});
$app->get('/api/comuna/:comuna/ciudad', function($comuna){
    $result = Model::select("SELECT ciu_id,ciu_nombre FROM ciudad WHERE ciu_comuna_id=$comuna ORDER BY ciu_nombre");
    if($result != null) Respond::response(200,$result);
    else Respond::response(400);
});
$app->get('/api/comuna/:comuna/ciudad/:ciudad', function($comuna,$ciudad){
    $result = Model::select("SELECT ciu_id,ciu_nombre FROM ciudad WHERE ciu_id=$ciudad and ciu_comuna_id=$comuna ORDER BY ciu_nombre");
    if($result != null) Respond::response(200,$result);
    else Respond::response(400);
});
$app->get('/api/comuna/:comuna/ciudad/:ciudad/calle', function($comuna,$ciudad){
    $result = Model::select("SELECT cal_id,cal_nombre FROM calle,ciudad WHERE ciu_id=$ciudad and ciu_comuna_id=$comuna ORDER BY cal_nombre");
    if($result != null) Respond::response(200,$result);
    else Respond::response(400);
});
$app->post('/api/comuna/:comuna/ciudad/:ciudad/calle', function($comuna,$ciudad) use ($app){
    $nombre = $app->request->post('nombre');
    $result = Model::query("INSERT INTO calle(cal_nombre,cal_ciudad_id) VALUES('$nombre',$ciudad)");
    if($result == true) {
        $result = Model::select("SELECT cal_id,cal_nombre FROM calle WHERE cal_id = (SELECT max(cal_id) FROM calle)");
        Respond::response(200,$result);
    }
    else Respond::response(400);
});
$app->get('/api/comuna/:comuna/ciudad/:ciudad/calle/search/:search', function($comuna,$ciudad,$search) use($app){
    if($search != ""){
        $result = Model::select("SELECT cal_id,cal_nombre FROM calle,ciudad WHERE ciu_id=$ciudad and ciu_comuna_id=$comuna and cal_ciudad_id = ciu_id and cal_nombre LIKE '%".$search."%' ORDER BY cal_nombre");
        if($result != null) Respond::response(200,$result);
        else Respond::response(400);
    } else Respond::response(400);

});
$app->get('/api/comuna/:comuna/ciudad/:ciudad/calle/:calle', function($comuna,$ciudad,$calle){
    $result = Model::select("SELECT cal_id,cal_nombre FROM calle WHERE cal_id = $calle");
    if($result != null) Respond::response(200,$result);
    else Respond::response(400);
});

$app->put('/api/comuna/:comuna/ciudad/:ciudad/calle/:calle', function($comuna,$ciudad,$calle) use ($app){
    $nombre = $app->request->put('nombre');
    $result = Model::query("UPDATE calle SET cal_nombre='$nombre',cal_ciudad_id=$ciudad WHERE cal_id=$calle");
    if($result == true) {
        $result = Model::select("SELECT cal_id,cal_nombre FROM calle WHERE cal_id=$calle");
        Respond::response(200,$result);
    }
    else Respond::response(400);
});
$app->delete('/api/comuna/:comuna/ciudad/:ciudad/calle/:calle', function($comuna,$ciudad,$calle){
    $result = Model::query("DELETE FROM calle WHERE cal_id=$calle");
    if($result == true) {
        Respond::response(200);
    }
    else Respond::response(400);
});
$app->get('/api/sector', function(){
    $result = Model::select("SELECT sec_id,sec_nombre FROM sector");
    if($result != null) Respond::response(200,$result);
    else Respond::response(400);
});
$app->post('/api/sector', function() use($app){
    $nombre = $app->request->post('nombre');
    $result = Model::query("INSERT INTO sector(sec_nombre) VALUES('$nombre')");
    if($result == true) {
        $result = Model::select("SELECT sec_id,sec_nombre FROM sector WHERE sec_id = SELECT max(sec_id) FROM sector");
        Respond::response(200,$result);
    }
    else Respond::response(400);
});
$app->get('/api/sector/:sector', function($sector){
    $result = Model::select("SELECT sec_id,sec_nombre FROM sector WHERE sec_id=$sector");
    if($result != null) Respond::response(200,$result);
    else Respond::response(400);
});
$app->put('/api/sector/:sector', function($sector) use($app){
    $nombre = $app->request->put('nombre');
    $result = Model::query("UPDATE sector SET sec_nombre='$nombre' WHERE sec_id=$sector");
    if($result == true) {
        $result = Model::select("SELECT sec_id,sec_nombre FROM sector WHERE sec_id=$sector");
        Respond::response(200,$result);
    }
    else Respond::response(400);
});
$app->delete('/api/sector/:sector', function($sector){
    $result = Model::query("DELETE FROM sector WHERE sec_id=$sector");
    if($result == true) {
        Respond::response(200);
    }
    else Respond::response(400);
});
?>