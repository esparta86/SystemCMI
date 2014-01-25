<?php
	session_start();
    require_once("../../../recursos/conexion/bd_CIM.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/control.php");

 $idem=$_SESSION["idempresa"];
 $idInd=$_REQUEST["idI"];

    $objcontrol=new control();
    if($objcontrol!=null){
			    	 if(!$objcontrol->open_con())
			    {
			    }
			    elseif ($objcontrol->open_con()) 
							    {
							    	$data=$objcontrol->showControlesMetas($idInd);
							    	echo json_encode($data);
							    }
		}
