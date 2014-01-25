<?php
class perspectiva extends DBManager
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
* funcion que retorna la lista de perspectivas x plan 
*
*/

function get_perspectivas($idplan){
 parent::conectar();
  $sql="SELECT IDPERPECTIVA,NOMBREPERSPECTIVA,DESCRIPCIONPERSPECTIVA  FROM perspectiva WHERE IDPLAN=$idplan";
 $record_consulta=$this->obj_con->Execute($sql);
   if($record_consulta->RecordCount()<=0){
     $data1[]=array('idperspectiva'=>0,'nombrep'=>'sin registros','descripcionp'=>'sin registros');
   }else{
        while(!$record_consulta->EOF){
          $idp=$record_consulta->fields["IDPERPECTIVA"];
          $nombre=$record_consulta->fields["NOMBREPERSPECTIVA"];
          $descripcion=$record_consulta->fields["DESCRIPCIONPERSPECTIVA"];
          $data1[]=array('idperspectiva'=>$idp,'nombrep'=>$nombre,'descripcionp'=>$descripcion);
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
*  funcion que se encarga de guardar un plan estrategico
*  
*
*/

function guardar_perspectiva($idP,$nombrep,$descripp){
      parent::conectar();
      $sql="CALL guardar_perspectiva($idP,'$nombrep','$descripp')";
               if(!$this->obj_con->Execute($sql)){
                 return 2;
               }else{
                 return 1;
               }
}/*fin de funcion*/


/*
*   setea una fecha al formato de mysql
*
*/
function set_standarDate($fecha){
  return  date("Y-m-d",strtotime($fecha));
}/*fin de funcion*/


/*
*  funcion que retorna true si ya esta registrada la empresa
*  y false si no.
*/
function verificar_empresa($nombre){
 parent::conectar();
 $sql="SELECT * FROM empresa WHERE NOMBREEMPRESA LIKE '$nombre'";
 $record_consulta=$this->obj_con->Execute($sql);
if($record_consulta->RecordCount()<=0){
          return false;    
    }else{
      return true;
         }
 }/*fin de funcion*/

 /*
 * funcion que modifica el nombre de un plan
 *
 */

 function modificar_perspectiva($nombrep,$descripp,$idper){
      parent::conectar();
         $sql="CALL modificar_perspectiva('$nombrep','$descripp',$idper)";
               if(!$this->obj_con->Execute($sql)){
                 return 2;
               }else{
                 return 1;
               }
}/*fin de funcion*/



/*
*
* funcion que elimina un plan
*
*/
function eliminar_perspectivas($id){
parent::conectar();
     $sql="CALL eliminar_perspectiva($id)";
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
 $sql="select IDPERPECTIVA,CONCAT(NOMBREPERSPECTIVA,' : ',DESCRIPCIONPERSPECTIVA) AS NOMBREPERSPECTIVA FROM perspectiva WHERE IDPLAN=$idplan ORDER BY NOMBREPERSPECTIVA";
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