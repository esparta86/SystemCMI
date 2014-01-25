<?php
class unidadOrganizativa extends DBManager
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
* funcion que retorna la lista de unidades
*
*/

function get_unidades($idempresa){
 parent::conectar();
  $sql="SELECT * FROM view_unidades WHERE IDEMPRESA=$idempresa";
 $record_consulta=$this->obj_con->Execute($sql);
   if($record_consulta->RecordCount()<=0){
     $data1[]=array('idarea'=>0,'idunidad'=>0,'nombrearea'=>'sin registros','unidad'=>'sin registros');
   }else{
        while(!$record_consulta->EOF){
          $idu=$record_consulta->fields["IDUNIDAD"];
          $ida=$record_consulta->fields["IDAREA"];
          $nombreA=$record_consulta->fields["NOMBREAREA"];
          $nombreU=$record_consulta->fields["NOMBREUNIDAD"];

          $data1[]=array('idarea'=>$ida,'idunidad'=>$idu,'nombrearea'=>$nombreA,'unidad'=>$nombreU);
          $record_consulta->MoveNext();
           }
   }
   $respuesta=array('success'=>true,'data'=>$data1);
   return $respuesta;
} /* fin de funcion*/




function getUnidadesEmpresa($idempresa){
 parent::conectar();
  $sql="SELECT * FROM view_unidades WHERE IDEMPRESA=$idempresa";
 $record_consulta=$this->obj_con->Execute($sql);
   if($record_consulta->RecordCount()<=0){
     $data1[]=array('idunidad'=>0,'unidad'=>'sin registros');
   }else{
        while(!$record_consulta->EOF){
          $idu=$record_consulta->fields["IDUNIDAD"];
          $nombreU=$record_consulta->fields["NOMBREUNIDAD"];

          $data1[]=array('idunidad'=>$idu,'unidad'=>$nombreU);
          $record_consulta->MoveNext();
           }
   }
   $respuesta=array('success'=>true,'data'=>$data1);
   return $respuesta;
} /* fin de funcion*/

/*
* funcion que retirna las unidades
*
*/


function mostrar_unidades($idarea){
parent::conectar();
  $sql="SELECT IDUNIDAD,NOMBREUNIDAD FROM view_unidades WHERE IDAREA=$idarea";
  $record_consulta=$this->obj_con->Execute($sql);
    if($record_consulta->RecordCount()<=0){
      $data1[]=array('idunidad'=>0,'unidad'=>'sin registros');
    }else{
          while(!$record_consulta->EOF){
            $id=$record_consulta->fields["IDUNIDAD"];
            $u=$record_consulta->fields["NOMBREUNIDAD"];
            $data1[]=array('idunidad'=>$id,'unidad'=>$u);
            $record_consulta->MoveNext();
           }
    }
    $respuesta=array('success'=>true,'data'=>$data1);
    return $respuesta;
}/* fin de funcion*/


/*
* funcion que muestra las unidades.
*    si iniciativa=0 muestra todas las unidades
*    si iniciativa>0 muestra las unidades que no estan involucradas dentro de la iniciativa
*/
function mostrar_unidades_empresa($idempresa,$iniciativaid){
parent::conectar();
if($iniciativaid==0)
{
  $sql="SELECT * FROM view_unidades WHERE IDEMPRESA=$idempresa";
}else{/*unidades que no estan involucradas con la iniciativa*/
  $sql="SELECT * FROM `view_unidades` WHERE IDEMPRESA=$idempresa AND IDUNIDAD NOT IN(SELECT IDUNIDAD FROM unidades_involucradas WHERE IDINICIATIVA=$iniciativaid)";
}
  $record_consulta=$this->obj_con->Execute($sql);
    if($record_consulta->RecordCount()<=0){
      $data1[]=array('idunidad'=>0,'unidad'=>'Sin registros');
    }else{
          while(!$record_consulta->EOF){
            $id=$record_consulta->fields["IDUNIDAD"];
            $u=$record_consulta->fields["NOMBREUNIDAD"];
            $data1[]=array('idunidad'=>$id,'unidad'=>$u);
            $record_consulta->MoveNext();
           }
    }
    $respuesta=array('success'=>true,'data'=>$data1);
    return $respuesta;
}/* fin de funcion*/

/*
* funcion que muestra las unidades de la empresa
*  si iniciativaid=0 no muestra ninguna unidad
*  si iniciativaid >0 muestra las unidades que estan involucradas en la iniciativa
*/

function mostrar_unidades_actuales($idempresa,$iniciativaid){
  parent::conectar();
  $sql="SELECT * FROM view_unidades WHERE IDEMPRESA=$idempresa AND IDUNIDAD IN(SELECT IDUNIDAD FROM unidades_involucradas WHERE IDINICIATIVA=$iniciativaid)";
  $record_consulta=$this->obj_con->Execute($sql);
    if($record_consulta->RecordCount()<=0){
    //  $data1[]=array('idunidad'=>0,'unidad'=>'sin registros');
    }else{
          while(!$record_consulta->EOF){
            $id=$record_consulta->fields["IDUNIDAD"];
            $u=$record_consulta->fields["NOMBREUNIDAD"];
            $data1[]=array('idunidad'=>$id,'unidad'=>$u);
            $record_consulta->MoveNext();
           }
    }
    $respuesta=array('success'=>true,'data'=>$data1);
    return $respuesta;


}


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

function guardar_unidad($idarea,$unidad){
      parent::conectar();
$verificar=$this->verificar_unidad($idarea,$unidad);
if(!$verificar){
      $sql="CALL guardar_unidad($idarea,'$unidad')";
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
function verificar_unidad($idarea,$unidad){
 parent::conectar();
 $sql="SELECT * FROM unidadorganizativa WHERE NOMBREUNIDAD LIKE '$unidad' AND IDAREA=$idarea";
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

function modificar_unidad($idunidad,$idarea,$unidad){
parent::conectar();
$verificar=$this->verificar_unidad($idarea,$unidad);
if(!$verificar){
      $sql="CALL modificar_unidad($idunidad,$idarea,'$unidad')";
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
function eliminar_unidad($id){
parent::conectar();
     $sql="CALL eliminar_unidad($id)";
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