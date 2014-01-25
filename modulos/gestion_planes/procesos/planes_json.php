<?php
	session_start();
    require_once("../../../recursos/conexion/bd_CIM.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/planestrategico.php");

  $id=$_REQUEST["ide"];
    $objplanestrategico=new planestrategico();

    if($objplanestrategico!=null){//si se creo el objeto

			    	 if(!$objplanestrategico->open_con())
			    {
			    }
			    elseif ($objplanestrategico->open_con()) 
							    {
							    	$data=$objplanestrategico->get_planes($id);
							    	echo json_encode($data);
							    }
		}
