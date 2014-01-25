<?php
class control extends DBManager
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
* funcion que retorna la lista de indicadores x objetivo estrategico
*
*/
function get_controles($id){
 parent::conectar();
  $sql="SELECT * FROM view_control WHERE IDINDICADOR=$id";
 $record_consulta=$this->obj_con->Execute($sql);
   if($record_consulta->RecordCount()<=0){
     $data1[]=array('idcontrol'=>0,'anioctrol'=>0,'limitecontrol'=>'sin registros','observacioncontrol'=>'sin registros','meta'=>'sin registros','observacionmeta'=>'sin registros');
   }else{
        while(!$record_consulta->EOF){
          $idc=$record_consulta->fields["IDCONTROL"];
          $anioid=$record_consulta->fields["ANIO"];
          $limite=$record_consulta->fields["LIMTECTROL"];
          $obslimite=$record_consulta->fields["OBSCTROL"];
          $metas=$record_consulta->fields["META"];
          $obserMeta=$record_consulta->fields["OBSMETA"];
          $data1[]=array('idcontrol'=>$idc,'anioctrol'=>$anioid,'limitecontrol'=>$limite,'observacioncontrol'=>$obslimite,'meta'=>$metas,'observacionmeta'=>$obserMeta);
          $record_consulta->MoveNext();
           }
   }
   $respuesta=array('success'=>true,'data'=>$data1);
   return $respuesta;
} /* fin de funcion*/


/*FUNCION que recupera los controles y metas segun idindicador */

function showControlesMetas($idindicador){
parent::conectar();
  $sql="SELECT IDCONTROL,CONCAT('AÑO: ',ANIO,' limite control: ',LIMITECTROL,' meta: ',META) as CONTROL FROM control WHERE IDINDICADOR=$idindicador";
  $record_consulta=$this->obj_con->Execute($sql);
  if($record_consulta->RecordCount()<=0)
  {
    $data1[]=array('idcontrol'=>0,'control'=>'Sin registros');
  }else
    {
        while (!$record_consulta->EOF) 
        {
          $idc=$record_consulta->fields["IDCONTROL"];
          $ctrol=$record_consulta->fields["CONTROL"];
          $data1[]=array('idcontrol'=>$idc,'control'=>$ctrol);   
          $record_consulta->MoveNext();
        }
    }
    $respuesta=array('success'=>true,'data'=>$data1);
    return $respuesta;
}/*fin de funcion*/







/*
*  funcion que se encarga de guardar un control de un indicador
*  
*
*/

function guardar_control($anioid,$control_d,$observacionControl,$meta_d,$observacionMeta,$indicadorid){
      parent::conectar();
     $sql="CALL guardar_control($indicadorid,$anioid,'$control_d','$observacionControl','$meta_d','$observacionMeta')";
     if(!$this->obj_con->Execute($sql)){
                 return 2;
               }else{
                 return 1;
               }
              
}/*fin de funcion*/





 /*
 * funcion que modifica un control de un indicador 
 */

 function modificar_control($anioid,$control_d,$observacionControl,$meta_d,$observacionMeta,$controlid){
      parent::conectar();
         $sql="CALL modificar_control($controlid,$anioid,'$control_d','$observacionControl','$meta_d','$observacionMeta')";
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
function eliminar_control($id){
parent::conectar();
     $sql="CALL eliminar_control($id)";
     if(!$this->obj_con->Execute($sql)){
       return 2;
     }else{
      return 1;
     }
}/*eliminar*/

}