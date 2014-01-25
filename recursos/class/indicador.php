<?php
class indicador extends DBManager
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

function get_indicadores($ido){
 parent::conectar();

  $sql="SELECT * FROM view_indicador WHERE IDOBJ=$ido";
 $record_consulta=$this->obj_con->Execute($sql);
   if($record_consulta->RecordCount()<=0){
     $data1[]=array('idindicador'=>0,'idobj'=>0,'idperspectiva'=>0,'idarea'=>0,'correlativo'=>0,'indicador'=>'sin registros','formulaI'=>'sin registros','unidadI'=>'sin registros','direccion'=>'sin registros','direccions'=>'sin registros','checkbase'=>0,'lineabase'=>'sin registros','idperiodo'=>0,'periodo'=>'sin registros','calculo'=>'sin registros');
   }else{
    $direccS='';
        while(!$record_consulta->EOF){
          $idi=$record_consulta->fields["IDINDICADOR"];
          $ido=$record_consulta->fields["IDOBJ"];
          $ida=$record_consulta->fields["IDAREA"];
          $idp=$record_consulta->fields["IDPERPECTIVA"];
          $corr=$record_consulta->fields["CORRELATIVOINDICADOR"];
          $nombrei=$record_consulta->fields["NOMBREINDICADOR"];
          $formula=$record_consulta->fields["FORMULA"];
          $unidadm=$record_consulta->fields["UNIDADMEDIDA"];
          $direcc=$record_consulta->fields["DIRECCIONAMIENTO"];
          $check=$record_consulta->fields["CHECKBASE"];
          $lineab=$record_consulta->fields["LINEABASE"];
          $idper=$record_consulta->fields["IDPERIODO"];
          $periodo=$record_consulta->fields["PERIODO"];
          $calculo=$record_consulta->fields["CALCULO"];

          if($direcc>0){
            $direccS='(+)'; 
          }else{
            $direccS='(-)';
          }
          
          $data1[]=array('idindicador'=>$idi,'idobj'=>$ido,'idperspectiva'=>$idp,'idarea'=>$ida,'correlativo'=>$corr,'indicador'=>$nombrei,'formulaI'=>$formula,'unidadI'=>$unidadm,'direccion'=>$direcc,'direccions'=>$direccS,'checkbase'=>$check,'lineabase'=>$lineab,'idperiodo'=>$idper,'periodo'=>$periodo,'calculo'=>$calculo);
          $record_consulta->MoveNext();
           }
   }
   $respuesta=array('success'=>true,'data'=>$data1);
   return $respuesta;
} /* fin de funcion*/



function mostrar_indicadores($ido){
 parent::conectar();
 $sql="SELECT IDINDICADOR,NOMBREINDICADOR FROM view_indicador WHERE IDOBJ=$ido";
 $record_consulta=$this->obj_con->Execute($sql);
   if($record_consulta->RecordCount()<=0){
     $data1[]=array('indicadorid'=>0,'indicador'=>'sin registros');
   }else{
        while(!$record_consulta->EOF){
          $idi=$record_consulta->fields["IDINDICADOR"];
          $ida=$record_consulta->fields["NOMBREINDICADOR"];
          $data1[]=array('indicadorid'=>$idi,'indicador'=>$ida);
          $record_consulta->MoveNext();
           }
   }
   $respuesta=array('success'=>true,'data'=>$data1);
   return $respuesta;
} /* fin de funcion*/


function mostrar_anios($idplan){
parent::conectar();
$sql="SELECT DATE_FORMAT(FECHAINICIO,'%Y' ) AS INICIO, DATE_FORMAT(FECHAFINAL,'%Y' ) AS FIN FROM planestrategico WHERE IDPLAN=$idplan";
$record_consulta=$this->obj_con->Execute($sql);
  if($record_consulta->RecordCount()<=0){
        $data1[]=array('anioctrol'=>'sin registros','anio'=>'sin registros');
  }else{
            while(!$record_consulta->EOF){
              $inicio=$record_consulta->fields["INICIO"];
              $final=$record_consulta->fields["FIN"];
              $record_consulta->MoveNext();
               }
               for ($i=$inicio; $i <=$final ; $i++) { 
                 $data1[]=array('anioctrol'=>$i,'anio'=>$i);
               }
       }
   $respuesta=array('success'=>true,'data'=>$data1);
   return $respuesta;       
}/*fin de la funcion*/






function ver_objetivos($idP){
 parent::conectar();
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
*  funcion que se encarga de guardar un indicador
*  
*
*/

function guardar_indicador($idarea,$idobj,$periodo,$corr,$indicador,$formula,$unidad,$direcc,$check,$lineabase,$Fcalculo){
      parent::conectar();
      if(strcmp($check,'true')==0){
        $checksp=1;
      }else{
        $checksp=0;
      }
      $sql="CALL guardar_indicador($idarea,$idobj,$periodo,$corr,'$indicador','$formula','$unidad',$direcc,$checksp,'$lineabase',$Fcalculo)";
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

 function modificar_indicador($idarea,$periodo,$corr,$indicador,$formula,$unidad,$direcc,$check,$lineabase,$idIndicador,$Fcalculo){
      parent::conectar();
 if($check){
        $checksp=1;
      }else{
        $checksp=0;
        $lineabase='';
      }      
         $sql="CALL modificar_indicador($idarea,$periodo,$corr,'$indicador','$formula','$unidad',$direcc,$checksp,'$lineabase',$idIndicador,$Fcalculo)";
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