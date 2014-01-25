<?php
session_start();
    require_once("../../../recursos/conexion/bd_CIM.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/usuario.class.php");


$user=$_REQUEST["usuario"];
$passw=$_REQUEST["pass"];
$tipo=$_REQUEST["tipo"];
$userId=$_REQUEST["iduser"];



$objUsuario=new Usuario();
    if($objUsuario!=null){//si se creo el objeto
			    	 if(!$objUsuario->open_con())
			    {  }
			    elseif ($objUsuario->open_con()) 
							    {            
							     $estado=$objUsuario->modificar_usuario($user,$passw,$tipo,$userId);
											         
								       switch ($estado) {
								       	case 1:
								       		$data1[] = array('bandera'=>1,'msg'=>'Exito, Se registro el usuario.');  
								       		break;
								       	case 2:
								       	     $data1[] = array('bandera'=>2,'msg'=>'No se registro ! intente de nuevo.');
								       	     break;
								       	case 3:
								       		 $data1[] = array('bandera'=>2,'msg'=>'Ya existe un usuario.');
								       	     break;
								        }
							    	echo json_encode($data1);
							    }
		}
