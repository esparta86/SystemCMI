<?php
class MetaOperativa extends DBManager
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
* funcion que retorna la lista las metas operativas
*
*/

function ver_metasO($idA){
 parent::conectar();
  $sql="SELECT * FROM view_actividades WHERE IDINICIATIVA=$idA";
  $record_consulta=$this->obj_con->Execute($sql);
   if($record_consulta->RecordCount()<=0){
     $data1[]=array('idactividad'=>0,'idcargo'=>0,'actividad'=>'sin registros','resultadoE'=>'sin registros','medioV'=>'sin registros','recursosF'=>'sin registros','fechaI'=>'sin registros','fechaF'=>'sin registros','cargo'=>'sin registros','observacionA'=>'sin registros');
   }else{
    $direccS='';
        while(!$record_consulta->EOF){
          $idM=$record_consulta->fields["IDMETA"];
          $idIniciativa=$record_consulta->fields["IDINICIATIVA"];
          $idCargo=$record_consulta->fields["IDCARGO"];
          $nombreC=$record_consulta->fields["NOMBRECARGO"];
          $actividadN=$record_consulta->fields["ACTIVIDAD"];
          $result=$record_consulta->fields["RESULTADO"];
          $medio=$record_consulta->fields["MEDIOVERIFICACION"];
          $financiero=$record_consulta->fields["RECURSOFINANCIERO"];
          $fechaI=$record_consulta->fields["FECHAI"];
          $fechaF=$record_consulta->fields["FECHAF"];
          $observa=$record_consulta->fields["OBSERVACION"];

          $data1[]=array('idactividad'=>$idM,'idcargo'=>$idCargo,'actividad'=>$actividadN,'resultadoE'=>$result,'medioV'=>$medio,'recursosF'=>$financiero,'fechaI'=>$fechaI,'fechaF'=>$fechaF,'cargo'=>$nombreC,'observacionA'=>$observa);          
          $record_consulta->MoveNext();
           }
   }
   $respuesta=array('success'=>true,'data'=>$data1);
   return $respuesta;
} /* fin de funcion*/






function ver_iniciativas($idI){
 parent::conectar();
  $sql="SELECT * FROM view_iniciativas WHERE IDINDICADOR=$idI";
  $record_consulta=$this->obj_con->Execute($sql);
   if($record_consulta->RecordCount()<=0){
     $data1[]=array('idiniciativa'=>0,'iniciativa'=>'Sin registros');
   }else{
    $direccS='';
        while(!$record_consulta->EOF){
          $idini=$record_consulta->fields["IDINICIATIVA"];
          $iniciativa=$record_consulta->fields["NOMBREINICIATIVA"];
          $data1[]=array('idiniciativa'=>$idini,'iniciativa'=>$iniciativa);          
          $record_consulta->MoveNext();
           }
   }
   $respuesta=array('success'=>true,'data'=>$data1);
   return $respuesta;
} /* fin de funcion*/


function listarMetasOperativas($idI){
 parent::conectar();
  $sql="SELECT IDMETA,ACTIVIDAD FROM metaoperativa WHERE IDINICIATIVA=$idI";
  $record_consulta=$this->obj_con->Execute($sql);
   if($record_consulta->RecordCount()<=0){
     $data1[]=array('idmetaO'=>0,'metaO'=>'Sin registros');
   }else{
    $direccS='';
        while(!$record_consulta->EOF){
          $idMeta=$record_consulta->fields["IDMETA"];
          $metaO=$record_consulta->fields["ACTIVIDAD"];
          $data1[]=array('idmetaO'=>$idMeta,'metaO'=>$metaO);          
          $record_consulta->MoveNext();
           }
   }
   $respuesta=array('success'=>true,'data'=>$data1);
   return $respuesta;
} /* fin de funcion*/




/*
*  funcion que se encarga de guardar una iniciativa
*  
*
*/

function guardar_actividad($Activid,$Result,$MedioV,$RecursoF,$idcargo,$observacionA,$fechaI,$fechaF,$idiniciativa){
  parent::conectar();
  $sql="CALL guardar_actividad('$Activid','$Result','$MedioV','$RecursoF',$idcargo,'$observacionA','$fechaI','$fechaF',$idiniciativa)";
      if(!$this->obj_con->Execute($sql))
               {
                 return 2;
               }else
               {
                 return 1;
               }
              
}/*fin de funcion*/





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
* funcion que elimina una actividad
*
*/
function eliminar_actividad($id){
parent::conectar();
     $sql="CALL eliminar_actividad($id)";
     if(!$this->obj_con->Execute($sql)){
       return 2;
     }else{
      return 1;
     }
}/*eliminar*/

}