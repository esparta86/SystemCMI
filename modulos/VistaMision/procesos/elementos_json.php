<?php
	session_start();
    require_once("../../../recursos/conexion/bd_CIM.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/planestrategico.php");

  $idplan=$_SESSION["idplan"];
  //$idPerspectiva=$_REQUEST["idp"];
  

  $objPlanEstrategico=new planestrategico();
    if($objPlanEstrategico!=null){
			    	 if(!$objPlanEstrategico->open_con())
			    {
			    }
			    elseif ($objPlanEstrategico->open_con()) 
							    {
							    	$data=$objPlanEstrategico->getMisionVision($idplan);
							    	echo json_encode($data);
							    }
		}
