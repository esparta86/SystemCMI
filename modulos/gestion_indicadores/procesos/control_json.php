<?php
	session_start();
    require_once("../../../recursos/conexion/bd_CIM.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/control.php");
 $idem=$_SESSION["idempresa"];
 $id=$_REQUEST["id"];
    $objcontrol=new control();
    if($objcontrol!=null){//si se creo el objeto
			    	 if(!$objcontrol->open_con())
			    {
			    }
			    elseif ($objcontrol->open_con()) 
							    {
							    	$data=$objcontrol->get_controles($id);
							    	echo json_encode($data);
							    }
		}
