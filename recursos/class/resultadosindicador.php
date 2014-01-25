<?php
class ResultadosIndicador extends DBManager
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

/*funcion que recupera los resultados segun indicador */

function obtenerResultadosControl($idcontrol){
 parent::conectar();
 if(is_numeric($idcontrol)){
 $verifica=$this->verificarResultados($idcontrol);
   if($verifica)
    {
      $sql="SELECT * FROM resultadosindicador WHERE IDCONTROL=$idcontrol";
      $record_consulta=$this->obj_con->Execute($sql);
       while (!$record_consulta->EOF) 
         {
          $corr=$record_consulta->fields["CORRELATIVO"];
          $result=$record_consulta->fields["RESULTADOCTROL"];
          $data[]=array('correlativo'=>$corr,'resultado'=>$result);
          $record_consulta->MoveNext();
         }


    }else
        {
          $N_elementos=$this->getNumeroResultado($idcontrol);
          for ($i=0; $i <$N_elementos ; $i++) 
            { 
              $data[]=array('correlativo'=>($i+1),'resultado'=>'');
            }
        }
    }

        if(isset($data)){
          $respuesta=array('success'=>true,'data'=>$data);
        }else{
          $respuesta=array('success'=>false);
        }
        return $respuesta;
}/*fin de funcion*/

/*
* funcion que verifica si existen resultados de un indicador
*/

function verificarResultados($idcontrol)
{
parent::conectar();
$sql="SELECT * FROM resultadosindicador WHERE IDCONTROL=$idcontrol";
$record_consulta=$this->obj_con->Execute($sql);
 if($record_consulta->RecordCount()<=0)
 {
    return false;
 }else{
      return true;
      }
}/*fin de funcion*/

/*
* funcion que retorna un entero el cual es el numero de elementos
* segun idcontrol
*/
function getNumeroResultado($idcontrol)
{
parent::conectar();
$sql="SELECT indicador.IDINDICADOR,(SELECT FRECUENCIA FROM periodo WHERE IDPERIODO=indicador.IDPERIODO) AS F FROM control INNER JOIN indicador ON(control.IDINDICADOR=indicador.IDINDICADOR)
WHERE IDCONTROL=$idcontrol";
  $record_consulta=$this->obj_con->Execute($sql);
  if($record_consulta->RecordCount()<=0)
  {
    return 0;
  }else{
             while (!$record_consulta->EOF) 
             {
             $n=$record_consulta->fields["F"];
             $record_consulta->MoveNext();
             }
             return $n;
      }
 }/*fin de funcion*/







/*
*  funcion que se encarga de guardar el resultado de un control
*  idcontrol = el control o meta de un indicador.
*  resultados = vector que tiene la estructura:  [correlativo_resultado] almacena el correlativo y resultado
*/

function guardar_resultadosIndicador($idcontrol,$resultados){
      parent::conectar();
      $bandera=true;
      foreach ($resultados as $key => $resultado) 
        {
            $Result=explode("_",$resultado);
            $correlativo=$Result[0];
            $R=$Result[1];
            $sql="CALL guardar_resultadosindicador($correlativo,$R,$idcontrol)"; 
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