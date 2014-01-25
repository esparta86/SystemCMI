<?php
	session_start();
    require_once("../../../recursos/conexion/bd_CIM.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/cargo.php");

 $idem=$_SESSION["idempresa"];
 $idiniciativa=$_REQUEST["idI"];

    $objCargo=new Cargo();
    if($objCargo!=null){//si se creo el objeto
			    	 if(!$objCargo->open_con())
			    {
			    }
			    elseif ($objCargo->open_con()) 
							    {
							    	$data=$objCargo->get_cargosInvolucrados($idiniciativa);
							    	echo json_encode($data);
							    }
		}
