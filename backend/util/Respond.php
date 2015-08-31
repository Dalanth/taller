<?php
/*
*   @author Mirko Gueregat
*/
class Respond{
    private static $codes  = array(
        200 => 'OK',
        400 => 'Bad Request',
        401 => 'Unauthorized',
        403 => 'Forbidden',
        404 => 'Not found'
    );
    public static function response($status,$content = ""){  
        header('Content-type: application/json; charset=utf-8');
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Credentials: true"); 
        header('Access-Control-Allow-Headers: X-Requested-With');
        header('Access-Control-Allow-Headers: Content-Type');
        header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT');
        header('Access-Control-Max-Age: 86400'); 
        echo json_encode(array("code" => $status, "status" => self::$codes[$status], "data" => $content), JSON_NUMERIC_CHECK | JSON_FORCE_OBJECT | JSON_PRETTY_PRINT);        
    }
}


?>