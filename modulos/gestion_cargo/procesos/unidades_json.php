<?php
	session_start();
    require_once("../../../recursos/conexion/bd_CIM.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/unidadorganizativa.php");

 $idarea=$_REQUEST["area"];

    $objunidadOrganizativa=new unidadOrganizativa();
    if($objunidadOrganizativa!=null){
			    	 if(!$objunidadOrganizativa->open_con())
			    {
			    }
			    elseif ($objunidadOrganizativa->open_con()) 
							    {
							    	$data=$objunidadOrganizativa->mostrar_unidades($idarea);
							    	echo json_encode($data);
							    }
		}
