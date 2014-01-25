<?php
	session_start();
    require_once("../../../recursos/conexion/bd_CIM.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/resultadosmetas.php");

 $idem=$_SESSION["idempresa"];
 $idmeta=$_REQUEST["idM"];

    $objResultadoMetas=new ResultadoMetas();
    if($objResultadoMetas!=null){//si se creo el objeto
			    	 if(!$objResultadoMetas->open_con())
			    {
			    }
			    elseif ($objResultadoMetas->open_con()) 
							    {
							    	$data=$objResultadoMetas->verResultadosMetas($idmeta);
							    	echo json_encode($data);
							    }
		}
