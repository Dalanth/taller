<?php
/*
*   @author Mirko Gueregat
*/
    class Model{
        
        private static $conn;
        
        public static function connect(){
            self::$conn = mysqli_connect("localhost","root","root","hospital") or die("Some error occurred during connection " . mysqli_error(self::$conn));
            mysqli_set_charset(self::$conn, "utf8");
        }
        
        public static function disconnect(){
            mysqli_close(self::$conn);
        }
        
        public static function select($sql){
            self::connect();
            $query = mysqli_query(self::$conn, $sql);
            while($query != null and self::numRows($query) > 0 and $row = self::fetchRow($query)){
                $result[] = $row;
            }
            self::disconnect();
            if(isset($result))return $result;
            else return null;
        }
        public static function query($sql){
            self::connect();
            $query = mysqli_query(self::$conn, $sql);
            if($query != null and self::affectedRows() > 0){
                self::disconnect();
                return true;
            }else {
                self::disconnect();
                return false;
            }
        }
        
        public static function fetchArray($result){
            return mysqli_fetch_array($result,MYSQLI_ASSOC);
        }
        
        public static function fetchRow($result){
            return mysqli_fetch_assoc($result);
        }
        
        public static function numRows($result){
            return mysqli_num_rows($result);
        }
        
        public static function affectedRows(){
            return mysqli_affected_rows(self::$conn);
        }
    }

?>