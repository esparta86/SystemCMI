<?php
class unidadesInvolucradas extends DBManager
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




/*
*  funcion que se encarga de guardar las unidades involucradas de la iniciativa
*  
*
*/

function guardarUnidadesInvolucradas($involucradasid,$indicadorid,$unidadid,$iniciativaText){
parent::conectar();
  $id=$this->get_idiniciativa($indicadorid,$unidadid,$iniciativaText);
  if($id!=0){
       $bandera=true;
       foreach ($involucradasid as $item => $valor) {
                       $sql="CALL guardarUnidadesInvolucradas($valor,$id)";
                      if(!$this->obj_con->Execute($sql))
                        { 
                          $bandera=false;
                        }                       
                      }
                      if($bandera){
                        return 1;
                      }else{
                        return 2;
                      }
       
  }else{
    return 3;
  }
}/*fin de funcion*/


/*
*   funcion que se encarga de actualizar las unidades de la iniciativa
*/
function actualizarUnidadesInvolucradas($involucradasid,$idiniciativa){
parent::conectar();
$unidadesactuales=$this->get_unidadesactuales($idiniciativa);
  if($unidadesactuales!=0){
                  for ($i=0;$i<count($unidadesactuales);$i++) 
                         { 
                          $eliminar=true;
                          $unidad=$unidadesactuales[$i];
                              foreach ($involucradasid as $item => $idunidad) 
                              {
                                    if($unidad==$idunidad){
                                      $eliminar=false;
                                    }
                              }
                               if($eliminar){
                                      $this->eliminar_unidadinvolucrada($unidad,$idiniciativa);
                                    }
                              
                          }
                      /*ingresa nuevas si hay*/
                      $bandera=true;
                       foreach ($involucradasid as $item => $idunidad) 
                               {
                                 $sql="CALL guardarUnidadesInvolucradas($idunidad,$idiniciativa)";
                                   if(!$this->obj_con->Execute($sql))
                                           { 
                                                      $bandera=false;
                                           }                       
                                  }
                                if($bandera){
                                             return 1;
                                            }else
                                            {
                                             return 2;
                                            }                              
                           

                   

  }else{/*no pose unidades por lo tanto ingresarlas*/
        $bandera=true;
       foreach ($involucradasid as $item => $valor) {
                       $sql="CALL guardarUnidadesInvolucradas($valor,$idiniciativa)";
                      if(!$this->obj_con->Execute($sql))
                        { 
                          $bandera=false;
                        }                       
                      }
                      if($bandera){
                        return 1;
                      }else{
                        return 2;
                      }


  }

}

/*
*  funcion que elimina la unidad de unidades involucradas
*
*/

function eliminar_unidadinvolucrada($idunidad,$idiniciativa){
  parent::conectar();
  $sql="CALL eliminar_unidadinvolucrada($idunidad,$idiniciativa)";
       if(!$this->obj_con->Execute($sql))
                        { 
                         return false;
                        }else{
                          return true;
                        }  
}

/*
*
*  funcion que recupera las unidades que posee la iniciativa actualmente.
*/
function get_unidadesactuales($idiniciativa){
  parent::conectar();
  $sql="SELECT IDUNIDAD FROM unidades_involucradas WHERE IDINICIATIVA=$idiniciativa";
  $record_consulta=$this->obj_con->Execute($sql);
  if($record_consulta->RecordCount()<=0){
      return 0;
      }else{
          while (!$record_consulta->EOF) {
          $unidades[]=$record_consulta->fields["IDUNIDAD"];
          $record_consulta->MoveNext();
        }
        return $unidades;
      }

}




/*
* funcion que recupera el id de una iniciativa
*/
function get_idiniciativa($indicadorid,$unidadid,$iniciativaText){
parent::conectar();
  $sql="SELECT IDINICIATIVA FROM view_iniciativas where IDINDICADOR=$indicadorid AND IDUNIDAD=$unidadid AND NOMBREINICIATIVA='$iniciativaText' LIMIT 0,1";
  $record_consulta=$this->obj_con->Execute($sql);
 if($record_consulta->RecordCount()<=0){
     return 0;
   }else{   
      while(!$record_consulta->EOF){
          $id=$record_consulta->fields["IDINICIATIVA"];
          $record_consulta->MoveNext();
      }
      return $id;
    }

}




 /*
 * funcion que modifica UN OBJETIVO 
 */

 function modificar_indicador($idarea,$periodo,$corr,$indicador,$formula,$unidad,$direcc,$check,$lineabase,$idIndicador){
      parent::conectar();
 if($check){
        $checksp=1;
      }else{
        $checksp=0;
        $lineabase='';
      }      
         $sql="CALL modificar_indicador($idarea,$periodo,$corr,'$indicador','$formula','$unidad',$direcc,$checksp,'$lineabase',$idIndicador)";
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
function eliminar_indicador($id){
parent::conectar();
     $sql="CALL eliminar_indicador($id)";
     if(!$this->obj_con->Execute($sql)){
       return 2;
     }else{
      return 1;
     }
}/*eliminar*/

}