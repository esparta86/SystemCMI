<?php
class periodo extends DBManager
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

function get_periodo(){
 parent::conectar();
  $sql="SELECT IDPERIODO,NOMBREPERIODO FROM periodo";
 $record_consulta=$this->obj_con->Execute($sql);
   if($record_consulta->RecordCount()<=0){
     $data1[]=array('idperiodo'=>0,'periodo'=>'sin registros');
   }else{
        while(!$record_consulta->EOF){
          $idP=$record_consulta->fields["IDPERIODO"];
          $peri=$record_consulta->fields["NOMBREPERIODO"];
          
          $data1[]=array('idperiodo'=>$idP,'periodo'=>$peri);
          $record_consulta->MoveNext();
           }
   }
   $respuesta=array('success'=>true,'data'=>$data1);
   return $respuesta;
} /* fin de funcion*/



}