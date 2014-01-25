<?php
class objetivoestrategico extends DBManager
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

function get_objetivos($idP){
 parent::conectar();
  $sql="SELECT * FROM view_objetivos WHERE IDPERPECTIVA=$idP";
 $record_consulta=$this->obj_con->Execute($sql);
   if($record_consulta->RecordCount()<=0){
     $data1[]=array('idobj'=>0,'correlativo'=>'sin registros','descripciono'=>'sin registros');
   }else{
        while(!$record_consulta->EOF){
          $idO=$record_consulta->fields["IDOBJ"];
          $numero=$record_consulta->fields["CORRELATIVOOBJ"];
          $descrip=$record_consulta->fields["DESCRIPCIONOBJ"];
          $data1[]=array('idobj'=>$idO,'correlativo'=>$numero,'descripciono'=>$descrip);
          $record_consulta->MoveNext();
           }
   }
   $respuesta=array('success'=>true,'data'=>$data1);
   return $respuesta;
} /* fin de funcion*/


function ver_objetivos($idP){
 parent::conectar();
 if(is_numeric($idP)){
  $sql="SELECT * FROM view_objetivos WHERE IDPERPECTIVA=$idP";
 $record_consulta=$this->obj_con->Execute($sql);
   if($record_consulta->RecordCount()<=0){
     $data1[]=array('idobj'=>0,'objE'=>'sin registros');
   }else{
        while(!$record_consulta->EOF){
          $idO=$record_consulta->fields["IDOBJ"];
          $descrip=$record_consulta->fields["DESCRIPCIONOBJ"];
          $data1[]=array('idobj'=>$idO,'objE'=>$descrip);
          $record_consulta->MoveNext();
           }
   }
 }else{
  $data1[]=array('idobj'=>0,'objE'=>'sin registros');
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
*  funcion que se encarga de guardar un objetivo estrategico
*  
*
*/

function guardar_objetivo($idPers,$corr,$descripo){
      parent::conectar();
      $sql="CALL guardar_objetivo($idPers,$corr,'$descripo')";
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
 * funcion que modifica UN OBJETIVO 
 */

 function modificar_objetivo($idPers,$corr,$descripo,$idobj){
      parent::conectar();
         $sql="CALL modificar_objetivo($idPers,$corr,'$descripo',$idobj)";
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
function eliminar_objetivo($id){
parent::conectar();
     $sql="CALL eliminar_objetivo($id)";
     if(!$this->obj_con->Execute($sql)){
       return 2;
     }else{
      return 1;
     }
}/*eliminar*/

}