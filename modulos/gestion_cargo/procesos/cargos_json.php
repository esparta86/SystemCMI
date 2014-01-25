<?php
	session_start();
    require_once("../../../recursos/conexion/bd_CIM.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/cargo.php");

 $idUnidad=$_REQUEST["id"];

    $objCargo=new Cargo();
    if($objCargo!=null){
			    	 if(!$objCargo->open_con())
			    {
			    }
			    elseif ($objCargo->open_con()) 
							    {
							    	$data=$objCargo->get_cargos($idUnidad);
							    	echo json_encode($data);
							    }
		}
