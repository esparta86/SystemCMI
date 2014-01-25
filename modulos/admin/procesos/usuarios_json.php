<?php
	session_start();
    require_once("../../../recursos/conexion/bd_CIM.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/usuario.class.php");

  $id=$_REQUEST["ide"];
    $objUsuario=new Usuario();

    if($objUsuario!=null){

			    	 if(!$objUsuario->open_con())
			    {
			    }
			    elseif ($objUsuario->open_con()) 
							    {
							    	$data=$objUsuario->ver_usuarios($id);
							    	echo json_encode($data);
							    }
		}
