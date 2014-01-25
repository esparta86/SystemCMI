<?php
	session_start();
    require_once("../../../recursos/conexion/bd_CIM.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/resultadosindicador.php");

   $idem=$_SESSION["idempresa"];
   $idControl=$_REQUEST["idC"];

   $objResultadosIndicador=new ResultadosIndicador();

    if($objResultadosIndicador!=null){
		if(!$objResultadosIndicador->open_con())
			    {
			       
			    }
			    elseif ($objResultadosIndicador->open_con()) 
							    {
							      $data=$objResultadosIndicador->obtenerResultadosControl($idControl);
			        	    	  echo json_encode($data);
							    }
		}




