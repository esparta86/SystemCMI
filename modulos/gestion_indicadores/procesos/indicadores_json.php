<?php
	session_start();
    require_once("../../../recursos/conexion/bd_CIM.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/indicador.php");

 $idem=$_SESSION["idempresa"];
 $ido=$_REQUEST["idobj"];

    $objindicador=new indicador();
    if($objindicador!=null){//si se creo el objeto

			    	 if(!$objindicador->open_con())
			    {
			    }
			    elseif ($objindicador->open_con()) 
							    {
							    	$data=$objindicador->get_indicadores($ido);
							    	echo json_encode($data);
							    }
		}
