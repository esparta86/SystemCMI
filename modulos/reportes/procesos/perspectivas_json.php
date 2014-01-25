<?php
	session_start();
    require_once("../../../recursos/conexion/bd_CIM.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/perspectiva.php");

  $idplan=$_SESSION["idplan"];
  $objperspectiva=new perspectiva();
    if($objperspectiva!=null){
			    	 if(!$objperspectiva->open_con())
			    {
			    }
			    elseif ($objperspectiva->open_con()) 
							    {
							    	$data=$objperspectiva->ver_perspectivas($idplan);
							    	echo json_encode($data);
							    }
		}
