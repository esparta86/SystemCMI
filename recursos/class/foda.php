<?php
class foda extends DBManager
{
	
	var  $con;
   
    function open_con()
    {
    	$this->con=parent::conectar();
	return $this->con;
    }

  
    function close_con()
    {
	parent::desconectar();
    }

/*
*
* funcion que retorna los factores del foda segun perspectiva y tipo de factor 
*   idP --> id de la perspectiva
*   tipo ---> tipo del factor donde:
*    1= fortalezas
*    2= debilidades
*    3 = amenazas
*    4 = oportunidades
*/

function get_foda($idP,$tipo){
 parent::conectar();
  $sql="SELECT IDFODA,DESCRIPCIONFACTOR FROM foda WHERE FACTOR=$tipo AND IDPERPECTIVA=$idP ORDER BY DESCRIPCIONFACTOR";
 $record_consulta=$this->obj_con->Execute($sql);
   if($record_consulta->RecordCount()<=0){
     $data1[]=array('idfoda'=>0,'descripfoda'=>'sin registros');
   }else{
        while(!$record_consulta->EOF){
          $id=$record_consulta->fields["IDFODA"];
          $descrip=$record_consulta->fields["DESCRIPCIONFACTOR"];
          $data1[]=array('idfoda'=>$id,'descripfoda'=>$descrip);
          $record_consulta->MoveNext();
           }
   }
   $respuesta=array('success'=>true,'data'=>$data1);
   return $respuesta;
} /* fin de funcion*/


/*
* guardar elemento foda
*
*/


function guardar_elementofoda($idPers,$tipoFactor,$descripo){
      parent::conectar();
      $sql="CALL guardar_foda($idPers,$tipoFactor,'$descripo')";
               if(!$this->obj_con->Execute($sql)){
                 return 2;
               }else{
                 return 1;
               }
}/*fin de funcion*/



 /*
 * funcion que modifica un elemento foda
 */

 function modificar_elementofoda($idf,$descripo){
      parent::conectar();
         $sql="CALL modificar_foda($idf,'$descripo')";
         if(!$this->obj_con->Execute($sql)){
                 return 2;
               }else{
                 return 1;
               }
}/*fin de funcion*/



/*
*
* funcion que elimina un elemento del foda
*
*/
function eliminar_elementofoda($id){
parent::conectar();
     $sql="CALL eliminar_foda($id)";
     if(!$this->obj_con->Execute($sql)){
       return 2;
     }else{
      return 1;
     }
}/*eliminar*/

/*
*  funcion que retorna los componentes del foda
*
*/

 function  componentes_foda($id){
 parent::conectar();
 $foda=$this->cuadrantesFoda($id);
 $fortaleza="";
 $debilidades="";
 $amenazas="";
 $oportunidades="";
    for($i=0;$i<count($foda);$i++){
         $factor=$foda[$i][1];
         switch ($factor) {
           case 1:
             $fortaleza=$fortaleza."<br>-".$foda[$i][0]."<br>";
             break;
           
           case 2:
             $debilidades=$debilidades."<br>-".$foda[$i][0]."<br>";
             break;

          case 3:
            $amenazas=$amenazas."<br>- ".$foda[$i][0]."<br>";
            break;

          case 4:
            $oportunidades=$oportunidades."<br>-".$foda[$i][0]."<br>";
            break;
         }

    }
$respuesta= array('success' => true,'fortalezas'=>$fortaleza,'debilidades'=>$debilidades,'amenazas'=>$amenazas,'oportunidades'=>$oportunidades);
return $respuesta;  


 }/*fin de funcion*/

 /*
 *  FUNCION que retorna un array de todos los elementos del foda
 *
 */

function cuadrantesFoda($idp){
parent::conectar();
$sql="SELECT DESCRIPCIONFACTOR,FACTOR FROM foda WHERE IDPERPECTIVA=$idp  ORDER BY FACTOR,DESCRIPCIONFACTOR";
 $record_consulta=$this->obj_con->Execute($sql);
 $datos=array();
   if($record_consulta->RecordCount()<=0){
     return 0;
   }else{
         $i=0;
        while(!$record_consulta->EOF){
          $datos[$i][0]=$record_consulta->fields["DESCRIPCIONFACTOR"];
          $datos[$i][1]=$record_consulta->fields["FACTOR"];
          $i++;
          $record_consulta->MoveNext();
           }
   }
    return $datos;
}/*FIN DE FUNCION*/

}