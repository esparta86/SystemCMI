<?php
	session_start();
    require_once("../../../recursos/conexion/bd_CIM.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/periodo.php");

  $idplan=$_SESSION["idplan"];

  $objperiodo=new periodo();
    if($objperiodo!=null){
			    	 if(!$objperiodo->open_con())
			    {
			    }
			    elseif ($objperiodo->open_con()) 
							    {
							    	$data=$objperiodo->get_periodo();
							    	echo json_encode($data);
							    }
		}
