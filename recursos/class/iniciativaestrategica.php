<?php
class iniciativaEstrategica extends DBManager
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
* funcion que retorna la lista de iniciativas por indicador seleccionado
*
*/

function ver_iniciativasE($idI){
 parent::conectar();
  $sql="SELECT * FROM view_iniciativas WHERE IDINDICADOR=$idI";
  $record_consulta=$this->obj_con->Execute($sql);
   if($record_consulta->RecordCount()<=0){
     $data1[]=array('idiniciativa'=>0,'correlativoI'=>0,'iniciativa'=>'sin registros','idarea'=>0,'idunidad'=>0,'unidadText'=>'sin registros');
   }else{
    $direccS='';
        while(!$record_consulta->EOF){
          $idini=$record_consulta->fields["IDINICIATIVA"];
          $areaid=$record_consulta->fields["IDAREA"];
          $unidadid=$record_consulta->fields["IDUNIDAD"];
          $unidad=$record_consulta->fields["UNIDAD"];
          $correlativo=$record_consulta->fields["CORRELATIVOINICIATIVA"];
          $iniciativa=$record_consulta->fields["NOMBREINICIATIVA"];
          $data1[]=array('idiniciativa'=>$idini,'correlativoI'=>$correlativo,'iniciativa'=>$iniciativa,'idarea'=>$areaid,'idunidad'=>$unidadid,'unidadText'=>$unidad);         
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




/*
*  funcion que se encarga de guardar una iniciativa
*  
*
*/

function guardar_iniciativaE($indicadorid,$areaid,$unidadid,$corr,$iniciativaText){
      parent::conectar();
  $sql="CALL guardar_iniciativa($indicadorid,$areaid,$unidadid,$corr,'$iniciativaText')";
      if(!$this->obj_con->Execute($sql)){
                 return 2;
               }else{
                 return 1;
               }
              
}/*fin de funcion*/





 /*
 * funcion que modifica una iniciativa estrategica
 */

 function modificar_iniciativaE($areaid,$unidadid,$corr,$iniciativaText,$idiniciativa){
      parent::conectar();
    $sql="CALL modificar_iniciativa($idiniciativa,$areaid,$unidadid,$corr,'$iniciativaText')";
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
function eliminar_iniciativa($id){
parent::conectar();
     $sql="CALL eliminar_iniciativa($id)";
     if(!$this->obj_con->Execute($sql)){
       return 2;
     }else{
      return 1;
     }
}/*eliminar*/

}