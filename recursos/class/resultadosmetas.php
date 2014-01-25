<?php
class ResultadoMetas extends DBManager
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
*  funcion que se encarga de guardar un resultado de una meta
*  
*
*/

function guardarResultadoMeta($anio,$idmeta,$t1,$t2,$t3,$t4){
  parent::conectar();
  $sql="CALL guardar_resultadometa($anio,$idmeta,$t1,$t2,$t3,$t4)";
      if(!$this->obj_con->Execute($sql))
               {
                 return 2;
               }else
               {
                 return 1;
               }
              
}/*fin de funcion*/


/*
* funcion que actualiza un resultado de una meta
* @idresultadoM es el id del resultado meta que se ingreso previamente y que se modificara.
*/

function modificarResultadoMeta($anio,$idmeta,$t1,$t2,$t3,$t4,$idresultadoM){
  parent::conectar();
  $sql="CALL actualizar_resultadometa($anio,$idmeta,$t1,$t2,$t3,$t4,$idresultadoM)";
      if(!$this->obj_con->Execute($sql))
               {
                 return 2;
               }else
               {
                 return 1;
               }
              
}/*fin de funcion*/


/*
* funcion que returna true si existe ya un resultado de una meta para un año especifico
*
*/
function verificarDobleAnio($anio,$metaid)
{
parent::conectar();
$sql="SELECT * FROM resultadosmetas WHERE ANIO=$anio AND IDMETA=$metaid";
$record_consulta=$this->obj_con->Execute($sql);
   if($record_consulta->RecordCount()<=0){
      return false;
   }else{
    return true;
   }
}/*fin de funcion*/


function verResultadosMetas($idIniciativa){
 parent::conectar();
  $sql="SELECT * FROM resultadosmetas WHERE IDMETA=$idIniciativa";
  $record_consulta=$this->obj_con->Execute($sql);
   if($record_consulta->RecordCount()<=0){
     $data1[]=array('idresultadometa'=>0,'idmeta'=>0,'anioctrol'=>0,'t1'=>0,'t2'=>0,'t3'=>0,'t4'=>0);
   }else{
        while(!$record_consulta->EOF){
          $idR=$record_consulta->fields["IDRESULTADOMETA"];
          $idM=$record_consulta->fields["IDMETA"];
          $anio=$record_consulta->fields["ANIO"];
          $t1=$record_consulta->fields["T1"];
          $t2=$record_consulta->fields["T2"];
          $t3=$record_consulta->fields["T3"];
          $t4=$record_consulta->fields["T4"];
          $data1[]=array('idresultadometa'=>$idR,'idmeta'=>$idM,'anioctrol'=>$anio,'t1'=>$t1,'t2'=>$t2,'t3'=>$t3,'t4'=>$t4);
          $record_consulta->MoveNext();
           }
   }
   $respuesta=array('success'=>true,'data'=>$data1);
   return $respuesta;
} /* fin de funcion*/






 /*
 * funcion que modifica una iniciativa estrategica
 */

 function modificar_actividad($Activid,$Result,$MedioV,$RecursoF,$idcargo,$observacionA,$fechaI,$fechaF,$idiniciativa,$actividad){
      parent::conectar();
    $sql="CALL modificar_actividad('$Activid','$Result','$MedioV','$RecursoF',$idcargo,'$observacionA','$fechaI','$fechaF',$idiniciativa,$actividad)";
         if(!$this->obj_con->Execute($sql)){
                return 2;
               }else{
                 return 1;
               }
}/*fin de funcion*/



/*
*
* funcion que elimina un resultado de una meta
*
*/
function eliminar_resultado($id){
parent::conectar();
     $sql="CALL eliminar_resultadometa($id)";
     if(!$this->obj_con->Execute($sql)){
       return 2;
     }else{
      return 1;
     }
}/*eliminar*/

}