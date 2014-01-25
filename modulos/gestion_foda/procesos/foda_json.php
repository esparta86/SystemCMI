<?php
	session_start();
    require_once("../../../recursos/conexion/bd_CIM.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/foda.php");

  $idplan=$_SESSION["idplan"];
  $idPerspectiva=$_REQUEST["id"];
  $tipo=$_REQUEST["tip"];

  $objfoda=new foda();
    if($objfoda!=null){
			    	 if(!$objfoda->open_con())
			    {
			    }
			    elseif ($objfoda->open_con()) 
							    {
							    	$data=$objfoda->get_foda($idPerspectiva,$tipo);
							    	echo json_encode($data);
							    }
		}
