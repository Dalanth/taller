<?php
/*
*   @author Mirko Gueregat
*/
    mb_internal_encoding('UTF-8');
    header('Content-type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Credentials: true"); 
    header('Access-Control-Allow-Headers: X-Requested-With');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT');
    require 'vendor/autoload.php';
    $app = new Slim\Slim();
    $app->get('/', function() use($app){
        $app->render('/../api.php');
    });
    $app->get('/api', function() use($app){
        $app->render("/../api.php");
    });    
    require 'controllers/pacientes.php';
    require 'controllers/personas.php';
    require 'controllers/direcciones.php';
    
    $app->run();
?>