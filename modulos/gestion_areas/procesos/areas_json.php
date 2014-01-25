<?php
	session_start();
    require_once("../../../recursos/conexion/bd_CIM.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/area.php");

 $idem=$_REQUEST["ide"];

    $objarea=new area();
    if($objarea!=null){//si se creo el objeto

			    	 if(!$objarea->open_con())
			    {
			    }
			    elseif ($objarea->open_con()) 
							    {
							    	$data=$objarea->get_areas($idem);
							    	echo json_encode($data);
							    }
		}
