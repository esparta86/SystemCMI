<?php
class area extends DBManager
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
* funcion que retorna la lista de areas
*
*/

function get_areas($idempresa){
 parent::conectar();
  $sql="SELECT IDAREA,NOMBREAREA FROM areas WHERE IDEMPRESA=$idempresa ORDER BY NOMBREAREA";
 $record_consulta=$this->obj_con->Execute($sql);
   if($record_consulta->RecordCount()<=0){
     $data1[]=array('idarea'=>0,'nombrearea'=>'sin registros');
   }else{
        while(!$record_consulta->EOF){
          $ida=$record_consulta->fields["IDAREA"];
          $nombre=$record_consulta->fields["NOMBREAREA"];
          $data1[]=array('idarea'=>$ida,'nombrearea'=>$nombre);
          $record_consulta->MoveNext();
           }
   }
   $respuesta=array('success'=>true,'data'=>$data1);
   return $respuesta;
} /* fin de funcion*/



function get_planesxempresa($idempresa){
 parent::conectar();
 $sql="SELECT IDPLAN,CONCAT(FECHAINICIO,' - ',FECHAFINAL) AS PERIODO,DATE_FORMAT(CURDATE(),'%Y' ) AS ANIO,DATE_FORMAT(CURDATE(),'%M' ) AS MES,ESTADO FROM viewplanesestrategico WHERE IDEMPRESA=$idempresa";
 $record_consulta=$this->obj_con->Execute($sql);
   if($record_consulta->RecordCount()<=0){
     $data1[]=array('idplan'=>0,'periodo'=>0,'anio'=>'Sin registros','estado'=>'sin registros','mes'=>'sin registros');
   }else{
        while(!$record_consulta->EOF){
          $id=$record_consulta->fields["IDPLAN"];
          $perio=$record_consulta->fields["PERIODO"];
          $ani=$record_consulta->fields["ANIO"];
          $mess=$record_consulta->fields["MES"];
          $estad=$record_consulta->fields["ESTADO"];
          $data1[]=array('idplan'=>$id,'periodo'=>$perio,'anio'=>$ani,'estado'=>$estad,'mes'=>$mess);
          $record_consulta->MoveNext();
           }
   }
   $respuesta=array('success'=>true,'data'=>$data1);
   return $respuesta;
} /* fin de funcion*/

/*
*  funcion que se encarga de guardar un area
*  
*
*/

function guardar_area($idempresa,$area){
      parent::conectar();
$verificar=$this->verificar_area($area,$idempresa);
if(!$verificar){
      $sql="CALL guardar_area($idempresa,'$area')";
               if(!$this->obj_con->Execute($sql)){
                 return 2;
               }else{
                 return 1;
               }
  }else{
    return 3;
  }
}/*fin de funcion*/

/*
*  funcion que retorna true si ya esta registrada una area
*  y false si no.
*/
function verificar_area($nombre,$idempresa){
 parent::conectar();
 $sql="SELECT * FROM areas WHERE NOMBREAREA LIKE '$nombre' AND IDEMPRESA=$idempresa";
 $record_consulta=$this->obj_con->Execute($sql);
if($record_consulta->RecordCount()<=0){
          return false;    
    }else{
      return true;
         }
 }/*fin de funcion*/





 /*
 * funcion que modifica el nombre de un area
 *
 */

 function modificar_area($idempresa,$area,$idarea){
parent::conectar();
$verificar=$this->verificar_area($area,$idempresa);
if(!$verificar){
      $sql="CALL modificar_area($idarea,'$area')";
               if(!$this->obj_con->Execute($sql)){
                 return 2;
               }else{
                 return 1;
               }
  }else{
    return 3;
  }
}/*fin de funcion*/

 


/*
*
* funcion que elimina un plan
*
*/
function eliminar_area($id){
parent::conectar();
     $sql="CALL eliminar_area($id)";
     if(!$this->obj_con->Execute($sql)){
       return 2;
     }else{
      return 1;
     }
}/*eliminar*/


/*
*
* funcion que retorna la lista de perspectivas
*
*/

function ver_perspectivas($idplan){
 parent::conectar();
 $sql="SELECT IDPERPECTIVA,NOMBREPERSPECTIVA FROM perspectiva WHERE IDPLAN=$idplan ORDER BY NOMBREPERSPECTIVA";
 $record_consulta=$this->obj_con->Execute($sql);
   if($record_consulta->RecordCount()<=0){
     $data1[]=array('idperspectiva'=>0,'perspectiva'=>'Sin registros.');
   }else{
        while(!$record_consulta->EOF){
          $id=$record_consulta->fields["IDPERPECTIVA"];
          $nombre=$record_consulta->fields["NOMBREPERSPECTIVA"];
          $data1[]=array('idperspectiva'=>$id,'perspectiva'=>$nombre);
          $record_consulta->MoveNext();
           }
   }
   $respuesta=array('success'=>true,'data'=>$data1);
   return $respuesta;
} /* fin de funcion*/

}