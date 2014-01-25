<?php
class empresa extends DBManager
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
* funcion que retorna la lista de empresas que estan actualmente registradas
*
*/

function get_empresas(){
 parent::conectar();
 $sql="SELECT * FROM empresa";
 $record_consulta=$this->obj_con->Execute($sql);
   if($record_consulta->RecordCount()<=0){
     $data1[]=array('idempresa'=>0,'empresa'=>'Sin empresas actualmente.');
   }else{
        while(!$record_consulta->EOF){
          $id=$record_consulta->fields["IDEMPRESA"];
          $nombre=$record_consulta->fields["NOMBREEMPRESA"];
          $data1[]=array('idempresa'=>$id,'empresa'=>$nombre);
          $record_consulta->MoveNext();
           }
   }
   $respuesta=array('success'=>true,'data'=>$data1);
   return $respuesta;
} /* fin de funcion*/

/*
*  funcion que se encarga de guardar una empresa
*  
*
*/

function guardar_empresa($nombre,$img){
      parent::conectar();
      $verificar=$this->verificar_empresa($nombre);
      if(!$verificar){
                       
               $sql="CALL guardar_empresa('$nombre','$img')";
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
 * funcion que modifica el nombre de una empresa
 *
 */

function modificar_empresa($nombre,$id){
parent::conectar();
$verificar=$this->verificar_empresa($nombre);
if(!$verificar){
             $sql="CALL modificar_empresa('$nombre',$id)";
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
* funcion que elimina una empresa
*
*/
function eliminar_empresa($id){
parent::conectar();
     $sql="CALL eliminar_empresa($id)";
     if(!$this->obj_con->Execute($sql)){
       return 2;
     }else{
      return 1;
     }
}/*eliminar*/

}