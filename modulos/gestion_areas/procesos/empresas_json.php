<?php
	session_start();
    require_once("../../../recursos/conexion/bd_CIM.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/empresa.php");

    $objempresa=new empresa();
    if($objempresa!=null){//si se creo el objeto

			    	 if(!$objempresa->open_con())
			    {
			    }
			    elseif ($objempresa->open_con()) 
							    {
							    	$data=$objempresa->get_empresas();
							    	echo json_encode($data);
							    }
		}
