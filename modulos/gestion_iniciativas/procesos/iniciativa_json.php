<?php
	session_start();
    require_once("../../../recursos/conexion/bd_CIM.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/iniciativaestrategica.php");

 $idem=$_SESSION["idempresa"];
 $idindicador=$_REQUEST["idI"];

    $objiniciativaEstrategica=new iniciativaEstrategica();
    if($objiniciativaEstrategica!=null){//si se creo el objeto
			    	 if(!$objiniciativaEstrategica->open_con())
			    {
			    }
			    elseif ($objiniciativaEstrategica->open_con()) 
							    {
							    	$data=$objiniciativaEstrategica->ver_iniciativasE($idindicador);
							    	echo json_encode($data);
							    }
		}
