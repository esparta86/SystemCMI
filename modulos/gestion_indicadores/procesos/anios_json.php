<?php
	session_start();
    require_once("../../../recursos/conexion/bd_CIM.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/indicador.php");

 $idem=$_SESSION["idempresa"];
 $idplan=$_SESSION["idplan"];

    $objindicador=new indicador();
    if($objindicador!=null){//si se creo el objeto

			    	 if(!$objindicador->open_con())
			    {
			    }
			    elseif ($objindicador->open_con()) 
							    {
							    	$data=$objindicador->mostrar_anios($idplan);
							    	echo json_encode($data);
							    }
		}
