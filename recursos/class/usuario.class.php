<?php
class Usuario extends DBManager
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



 function login($nick,$pass)
    {
parent::conectar();
	$pass_md5 = md5($pass);
	$consulta = "SELECT * FROM `view_usuarios_empresas` WHERE USUARIO='$nick' AND PASSWORD=MD5('$pass')";
	$exe_consulta = $this->obj_con->Execute($consulta);
	$verificar = $exe_consulta->RecordCount();
  $record_consulta = $this->obj_con->GetRow($consulta);
  $datos=array();
  	if($verificar > 0)
	  {
            $id_usuario = $record_consulta["IDUSUARIO"];
            $nombreUsuario = $record_consulta["USUARIO"];
            $tipo_usuario=$record_consulta["TIPO"];
            $idempresa=$record_consulta["IDEMPRESA"];
            $empresa=$record_consulta["NOMBREEMPRESA"];
            $img=$record_consulta["IMAGEN"];
            $this->create_session_usuario($id_usuario,$nombreUsuario,$tipo_usuario,$idempresa,$empresa,$img);
            $datos[0]=true;
            $datos[1]=$tipo_usuario;
           return $datos;
   	}            
	else
	    {
            session_destroy();
            $datos[0]=false;
            return $datos;
	    }

}/*fin de funcion login*/

/*
* funcion que se encarga de crear la sesion
*
*/
    function create_session_usuario($id_usuario,$nombreusuario,$tipo_usuario,$idempresa,$empresa,$img){
                $_SESSION["id_usuario"] = $id_usuario;
                $_SESSION["nombreUsuario"] = $nombreusuario;
                $_SESSION["tipousuario"]=$tipo_usuario;
                $_SESSION["idempresa"]=$idempresa;
                $_SESSION["empresa"]=$empresa;
                $_SESSION["imagen"]=$img;

    }//fin de funcion.


  /*
  *  funcion que despliega los usuarios por empresa
  *
  */
   function ver_usuarios($ide){
    parent::conectar();
     $sql="SELECT * FROM view_usuarios WHERE IDEMPRESA=$ide";
 $record_consulta=$this->obj_con->Execute($sql);
   if($record_consulta->RecordCount()<=0){
     $data1[]=array('idusuario'=>0,'usuario'=>'sin registros','tipo'=>0,'tipoU'=>'sin registros');
   }else{
        while(!$record_consulta->EOF){
          $idU=$record_consulta->fields["IDUSUARIO"];
          $user=$record_consulta->fields["USUARIO"];
          $tip=$record_consulta->fields["TIPO"];
          $tipou=$record_consulta->fields["TIPOU"];
         $data1[]=array('idusuario'=>$idU,'usuario'=>$user,'tipo'=>$tip,'tipoU'=>$tipou);
          $record_consulta->MoveNext();
           }
   }
   $respuesta=array('success'=>true,'data'=>$data1);
   return $respuesta;
   }/*fin de funcion*/


 function guardar_usuario($ide,$usuario,$pass,$tipo){
  parent::conectar();
         $sql="CALL guardar_usuario($ide,'$usuario','$pass','$tipo')";
               if(!$this->obj_con->Execute($sql)){
                 return 2;
               }else{
                 return 1;
               }  
   }/*fin de funcion*/

/*
*  funcioon que modifica los datos del usuario
*  si pass=='' no se actualiza el password
*  si pass!='' se actualiza el password
*/
   function modificar_usuario($usuario,$pass,$tipo,$iduser){
    parent::conectar();
    if(strcmp($pass,'')==0){
       $bandera=0;
    }else{
       $bandera=1;
    }
    $sql="CALL modificar_usuario('$usuario','$pass','$tipo',$iduser,$bandera)";
           if(!$this->obj_con->Execute($sql)){
             return 2;
           }else{
            return 1;
           }
   }/*fin de funcion*/



/*
*
* funcion que elimina un usuario
*
*/
function eliminar_usuario($id){
parent::conectar();
     $sql="CALL eliminar_usuario($id)";
     if(!$this->obj_con->Execute($sql)){
       return 2;
     }else{
      return 1;
     }
}/*eliminar*/

}