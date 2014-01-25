<?php
	session_start();
    require_once("../../../recursos/conexion/bd_CIM.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/objetivoestrategico.php");

  $idplan=$_SESSION["idplan"];

  $idperspectiva=$_REQUEST["idp"];

  $objetivoestrategico=new objetivoestrategico();
    if($objetivoestrategico!=null){
			    	 if(!$objetivoestrategico->open_con())
			    {
			    }
			    elseif ($objetivoestrategico->open_con()) 
							    {
							    	$data=$objetivoestrategico->ver_objetivos($idperspectiva);
							    	echo json_encode($data);
							    }
		}
