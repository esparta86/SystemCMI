<?php
	session_start();
    require_once("../../../recursos/conexion/bd_CIM.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/objetivoestrategico.php");

  $idplan=$_SESSION["idplan"];
  $idPerspectiva=$_REQUEST["idp"];

  $objobjetivoestrategico=new objetivoestrategico();
    if($objobjetivoestrategico!=null){
			    	 if(!$objobjetivoestrategico->open_con())
			    {
			    }
			    elseif ($objobjetivoestrategico->open_con()) 
							    {
							    	$data=$objobjetivoestrategico->get_objetivos($idPerspectiva);
							    	echo json_encode($data);
							    }
		}
