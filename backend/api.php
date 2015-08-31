<html>
<!--
--    @author Mirko Gueregat
-->
    <head>
        <style>
            body{
                line-height: 150%;
                font-family: "Whitney SSm A", "Whitney SSm B", "Lucida Grande", "Lucida Sans", Verdana, Helvetica, Arial, sans-serif;
            }
            table{
                border-collapse: collapse;                
            }
            thead{
                font-weight:bold;
                font-size:14pt;
            }
            .row{
                border-bottom: 1px solid black;
            }
            td{
                padding:6px;
            }
        
        </style>
    
    </head>
    <body>
        <h2>API para el acceso a los datos</h2>
        <table>
            <thead>
                <td>URL</td>
                <td>Método</td>
                <td>Acción</td>
                <td>Parámetros</td>
            </thead>
            <tbody>
                <tr class="row">
                    <td>/api/persona</td>
                    <td>GET</td>
                    <td>Retorna todas las personas</td> 
                    <td></td>
                </tr>
                <tr class="row">
                    <td>/api/persona</td>
                    <td>POST</td>
                    <td>Añade una persona</td>  
                    <td>nombre, appaterno, apmaterno, sexo, nacimiento, nombre_padre, nombre_madre, rut, conyuge, prais, telefono, correo, nacionalidad</td>
                </tr>
                <tr class="row">
                    <td>/api/persona/search</td>
                    <td>GET</td>
                    <td>Busca una persona por su rut</td> 
                    <td>rut</td>
                </tr>
                <tr class="row">
                    <td>/api/persona/{persona]</td>
                    <td>GET</td>
                    <td>Retorna la información de una persona específica</td> 
                    <td></td>
                </tr>
                <tr class="row">
                    <td>/api/persona/{persona}</td>
                    <td>PUT</td>
                    <td>Edita una persona</td>  
                    <td>nombre, appaterno, apmaterno, sexo, nacimiento, nombre_padre, nombre_madre, rut, conyuge, prais, telefono, correo, nacionalidad</td>
                </tr>
                <tr class="row">
                    <td>/api/persona/{persona}</td>
                    <td>DELETE</td>
                    <td>Elimina una persona</td>  
                    <td></td>
                </tr>
                <tr class="row">
                    <td>/api/persona/{persona}/domicilio</td>
                    <td>GET</td>
                    <td>Retorna los domicilios de la persona</td>  
                    <td></td>
                </tr>
                <tr class="row">
                    <td>/api/persona/{persona}/domicilio</td>
                    <td>POST</td>
                    <td>Añade un domicilio a la persona</td>  
                    <td>calle, numero, dpto, block, telefono, lat, long, sector</td>
                <tr class="row">
                <tr class="row">
                    <td>/api/persona/{persona}/domicilio/{domicilio}</td>
                    <td>GET</td>
                    <td>Retorna un domicilio de la persona</td>  
                    <td></td>
                </tr>
                <tr class="row">
                    <td>/api/persona/{persona}/domicilio/{domicilio}</td>
                    <td>DELETE</td>
                    <td>Elimina un domicilio de la persona</td>  
                    <td></td>
                </tr>
                <tr class="row">
                    <td>/api/persona/{persona}/prevision</td>
                    <td>GET</td>
                    <td>Retorna el tipo de previsión y si es carga o titular</td>  
                    <td></td>
                </tr>
                <tr class="row">
                    <td>/api/persona/{persona}/titular</td>
                    <td>POST</td>
                    <td>Define a la persona como titular del plan de salud</td>  
                    <td>prevision, vencimiento</td>
                </tr>
                <tr class="row">
                    <td>/api/persona/{persona}/titular</td>
                    <td>PUT</td>
                    <td>Actualiza a la persona como titular del plan de salud</td>  
                    <td>prevision, vencimiento</td>
                </tr>
                <tr class="row">
                    <td>/api/persona/{persona}/titular</td>
                    <td>DELETE</td>
                    <td>Elimina a la persona como titular del plan de salud</td>  
                    <td></td>
                </tr>
                <tr class="row">
                    <td>/api/persona/{persona}/carga</td>
                    <td>GET</td>
                    <td>Retorna las carga de la persona como titular</td> 
                    <td></td>
                </tr>
                <tr class="row">
                    <td>/api/persona/{persona}/carga</td>
                    <td>POST</td>
                    <td>Configura a la persona como carga de una persona titular</td> 
                    <td>titular, vencimiento</td>
                </tr>
                <tr class="row">
                    <td>/api/persona/{persona}/carga/{carga}</td>
                    <td>PUT</td>
                    <td>Actualiza los datos de la carga</td> 
                    <td>titular, vencimiento</td>
                </tr>
                <tr class="row">
                    <td>/api/persona/{persona}/carga/{carga}</td>
                    <td>GET</td>
                    <td>Retorna los datos de la carga</td> 
                    <td></td>
                </tr>
                <tr class="row">
                    <td>/api/persona/{persona}/carga/{carga}</td>
                    <td>DELETE</td>
                    <td>Elimina la carga</td> 
                    <td></td>
                </tr>
                <tr class="row">
                    <td>/api/comuna</td>
                    <td>GET</td>
                    <td>Retorna todas las comunas de los Rios</td>
                    <td></td>
                </tr>
                <tr class="row">
                    <td>/api/comuna/{comuna}</td>
                    <td>GET</td>
                    <td>Retorna una comuna esecífica</td>
                    <td></td>
                </tr>
                <tr class="row">
                    <td>/api/comuna/{comuna}/ciudad</td>
                    <td>GET</td>
                    <td>Retorna todas las ciudades de la comuna</td>
                    <td></td>
                </tr>
                <tr class="row">
                    <td>/api/comuna/{comuna}/ciudad/{ciudad}</td>
                    <td>GET</td>
                    <td>Retorna una ciudad de la comuna</td>
                    <td></td>
                </tr>
                <tr class="row">
                    <td>/api/comuna/{comuna}/ciudad/{ciudad}/calle</td>
                    <td>GET</td>
                    <td>Retorna todas las calles de la ciudad</td>
                    <td></td>
                </tr>
                <tr class="row">
                    <td>/api/comuna/{comuna}/ciudad/{ciudad}/calle</td>
                    <td>POST</td>
                    <td>Agrega una calle a la ciudad</td>
                    <td>nombre</td>
                </tr>
                <tr class="row">
                    <td>/api/comuna/{comuna}/ciudad/{ciudad}/calle/{calle}</td>
                    <td>GET</td>
                    <td>Retorna una calle de la ciudad</td>
                    <td></td>
                </tr>
                <tr class="row">
                    <td>/api/comuna/{comuna}/ciudad/{ciudad}/calle/{calle}</td>
                    <td>PUT</td>
                    <td>Edita una calle de la ciudad</td>
                    <td>nombre</td>
                </tr>
                <tr class="row">
                    <td>/api/comuna/{comuna}/ciudad/{ciudad}/calle/{calle}</td>
                    <td>DELETE</td>
                    <td>Elimina una calle de la ciudad</td>
                    <td></td>
                </tr>
                <tr class="row">
                    <td>/api/comuna/{comuna}/ciudad/{ciudad}/calle/search</td>
                    <td>GET</td>
                    <td>Busca una calle por el nombre</td>
                    <td>search</td>
                </tr>
                <tr class="row">
                    <td>/api/sector</td>
                    <td>GET</td>
                    <td>Obtiene los sectores</td>
                    <td></td>
                </tr>
                <tr class="row">
                    <td>/api/sector</td>
                    <td>POST</td>
                    <td>Agrega un sector</td>
                    <td>nombre</td>
                </tr>
                <tr class="row">
                    <td>/api/sector/{sector}</td>
                    <td>GET</td>
                    <td>Retorna un sector especifico</td>
                    <td></td>
                </tr>
                <tr class="row">
                    <td>/api/sector/{sector}</td>
                    <td>PUT</td>
                    <td>Edita un sector</td>
                    <td>nombre</td>
                </tr>
                <tr class="row">
                    <td>/api/sector/{sector}</td>
                    <td>DELETE</td>
                    <td>Elimina un sector</td>
                    <td></td>
                </tr>
                <tr class="row">
                    <td>/api/establecimiento/</td>
                    <td>GET</td>
                    <td>Retorna los establecimientos</td>
                    <td></td>
                </tr>
                <tr class="row">
                    <td>/api/establecimiento/{establecimiento}</td>
                    <td>GET</td>
                    <td>Retorna un establecimiento</td>
                    <td></td>
                </tr>
                <tr class="row">
                    <td>/api/establecimiento/{establecimiento}/paciente</td>
                    <td>GET</td>
                    <td>Retorna los pacientes que posee el establecimiento</td>
                    <td></td>
                </tr>
                <tr class="row">
                    <td>/api/establecimiento/{establecimiento}/paciente</td>
                    <td>POST</td>
                    <td>Asocia pa persona con un establecimiento constituyendo un paciente</td>
                    <td>ficha, observacion, persona</td>
                </tr>
                <tr class="row">
                    <td>/api/establecimiento/{establecimiento}/paciente/{persona}</td>
                    <td>GET</td>
                    <td>Retorna un paciente</td>
                    <td></td>
                </tr>
                <tr class="row">
                    <td>/api/establecimiento/{establecimiento}/paciente/{persona}</td>
                    <td>PUT</td>
                    <td>Modifica la información de un paciente</td>
                    <td>ficha, observacion</td>
                </tr>
                <tr class="row">
                    <td>/api/establecimiento/{establecimiento}/paciente/{persona}</td>
                    <td>DELETE</td>
                    <td>Elimina el registro de un paciente</td>
                    <td></td>
                </tr>
                <tr class="row">
                    <td>/api/prevision/tipo</td>
                    <td>GET</td>
                    <td>Retorna los tipos de previsión</td>
                    <td></td>
                </tr>
                <tr class="row">
                    <td>/api/prevision/tipo/{tipo}</td>
                    <td>GET</td>
                    <td>Retorna las previsiones asociadas al tipo</td>
                    <td></td>
                </tr>
            </tbody>
            
        </table>
    
    
    </body>
    
    


</html>