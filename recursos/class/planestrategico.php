<?php
class planestrategico extends DBManager
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
* funcion que retorna la lista de empresas que estan actualmente registradas
*
*/

function get_planes($idempresa){
 parent::conectar();
 $sql="SELECT * FROM viewplanesestrategico WHERE IDEMPRESA=$idempresa";
 $record_consulta=$this->obj_con->Execute($sql);
   if($record_consulta->RecordCount()<=0){
     $data1[]=array('idplan'=>0,'idempresa'=>0,'vision'=>'Sin registros','mision'=>'sin registros','valores'=>'sin registros','fechai'=>'sin registros','fechaf'=>'sin registros');
   }else{
        while(!$record_consulta->EOF){
          $id=$record_consulta->fields["IDPLAN"];
          $idE=$record_consulta->fields["IDEMPRESA"];
          $mis=$record_consulta->fields["MISION"];
          $vis=$record_consulta->fields["VISION"];
          $val=$record_consulta->fields["VALORES"];
          $fi=$record_consulta->fields["FECHAINICIO"];
          $ff=$record_consulta->fields["FECHAFINAL"];

         $data1[]=array('idplan'=>$id,'idempresa'=>$idE,'vision'=>$vis,'mision'=>$mis,'valores'=>$val,'fechai'=>$fi,'fechaf'=>$ff);
          $record_consulta->MoveNext();
           }
   }
   $respuesta=array('success'=>true,'data'=>$data1);
   return $respuesta;
} /* fin de funcion*/


/*
* funcion que retorna la mision,vision y valores de un plan estrategico
*/

function getMisionVision($idplan){
parent::conectar();
$sql="SELECT VISION,MISION,VALORES FROM planestrategico WHERE IDPLAN=$idplan";
$record_consulta=$this->obj_con->Execute($sql);
  if($record_consulta->RecordCount()<=0)
  {
      $mision='Sin registros';
      $vision="Sin registros";
      $valores="Sin registros";
  }else{
       while(!$record_consulta->EOF)
       {
          $vision=$record_consulta->fields["VISION"];
          $mision=$record_consulta->fields["MISION"];
          $valores=$record_consulta->fields["VALORES"];
          $record_consulta->MoveNext();
       }
  }
$respuesta= array('success' => true,'vision'=>$vision,'mision'=>$mision,'valores'=>$valores);
return $respuesta;  
}/*fin de funcion*/



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

function guardar_plan($ide,$vision,$mision,$valores,$fechai,$fechaf){
      parent::conectar();
      $inicio=$this->set_standarDate($fechai);
      $fin=$this->set_standarDate($fechaf);
               $sql="CALL guardar_plan($ide,'$vision','$mision','$valores','$inicio','$fin')";
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

 function modificar_plan($ide,$vision,$mision,$valores,$fechai,$fechaf,$idplan){
      parent::conectar();
      $inicio=$this->set_standarDate($fechai);
      $fin=$this->set_standarDate($fechaf);
               $sql="CALL modificar_plan('$vision','$mision','$valores','$inicio','$fin',$idplan)";
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
function eliminar_plan($id){
parent::conectar();
     $sql="CALL eliminar_plan($id)";
     if(!$this->obj_con->Execute($sql)){
       return 2;
     }else{
      return 1;
     }
}/*eliminar*/

}