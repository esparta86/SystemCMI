<?php
class Cargo extends DBManager
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
* funcion que retorna la lista de periodos
*
*/

function get_cargos($unidadId){
 parent::conectar();
  $sql="SELECT IDCARGO,NOMBRECARGO FROM cargo WHERE IDUNIDAD=$unidadId";
 $record_consulta=$this->obj_con->Execute($sql);
   if($record_consulta->RecordCount()<=0){
     $data1[]=array('idcargo'=>0,'cargo'=>'sin registros');
   }else{
        while(!$record_consulta->EOF){
          $id=$record_consulta->fields["IDCARGO"];
          $cargo=$record_consulta->fields["NOMBRECARGO"];
          $data1[]=array('idcargo'=>$id,'cargo'=>$cargo);
          $record_consulta->MoveNext();
           }
   }
   $respuesta=array('success'=>true,'data'=>$data1);
   return $respuesta;
} /* fin de funcion*/




function get_cargosInvolucrados($iniciativaId){
 parent::conectar();
 $sql="SELECT IDCARGO,NOMBRECARGO FROM cargo WHERE IDUNIDAD IN(SELECT IDUNIDAD FROM unidades_involucradas WHERE IDINICIATIVA=$iniciativaId)";
 $record_consulta=$this->obj_con->Execute($sql);
   if($record_consulta->RecordCount()<=0){
     $data1[]=array('idcargo'=>0,'cargo'=>'sin registros');
   }else{
        while(!$record_consulta->EOF){
          $id=$record_consulta->fields["IDCARGO"];
          $cargo=$record_consulta->fields["NOMBRECARGO"];
          $data1[]=array('idcargo'=>$id,'cargo'=>$cargo);
          $record_consulta->MoveNext();
           }
   }
   $respuesta=array('success'=>true,'data'=>$data1);
   return $respuesta;
} /* fin de funcion*/



function guardar_cargo($nombreCargo,$unidadId){
      parent::conectar();
  $existe=$this->existeCargo($unidadId,$nombreCargo);
  if(!$existe)
    {
      $sql="CALL guardar_cargo($unidadId,'$nombreCargo')";
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
* retorna true si existe un cargo con el mismo nombre en la misma unidad
*/
function existeCargo($unidadId,$cargo){
  parent::conectar();
  $sql="SELECT COUNT(*) AS N FROM cargo WHERE NOMBRECARGO LIKE '$cargo' AND IDUNIDAD=$unidadId";
  $record_consulta=$this->obj_con->Execute($sql);
   if($record_consulta->RecordCount()<=0){

   }else{
          while (!$record_consulta->EOF) {
              $N=$record_consulta->fields["N"];
              $record_consulta->MoveNext();
            }
            if($N>0){
              return true;
            }else{
              return false;
            }
   }

}

function modificar_cargo($nombreCargo,$unidadId,$cargoid){
      parent::conectar();
    $sql="CALL modificar_cargo($unidadId,'$nombreCargo',$cargoid)";
        if(!$this->obj_con->Execute($sql))
               {
                 return 2;
               }else{
                 return 1;
               }
   
              
}/*fin de funcion*/



function eliminar_cargo($id){
      parent::conectar();
  $sql="CALL eliminar_cargo($id)";
        if(!$this->obj_con->Execute($sql))
               {
                 return 2;
               }else{
                 return 1;
               }
   
              
}/*fin de funcion*/



}