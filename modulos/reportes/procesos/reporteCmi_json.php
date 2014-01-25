<?php
	session_start();
    require_once("../../../recursos/conexion/bd_CIM.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/ConsultaReportes.php");

  $idplan=$_SESSION["idplan"];
  $idP=$_REQUEST["idp"];
  $objConsultaReportes=new ConsultaReportes();
    if($objConsultaReportes!=null){
			    	 if(!$objConsultaReportes->open_con())
			    {
			    }
			    elseif ($objConsultaReportes->open_con()) 
							    {
							    	$data=$objConsultaReportes->ReporteCmiPerspectivasMetasHTML($idP,$idplan);
							    	echo $data;
							    }
		}
