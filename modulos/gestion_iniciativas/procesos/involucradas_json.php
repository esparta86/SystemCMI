<?php
	session_start();
    require_once("../../../recursos/conexion/bd_CIM.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/unidadorganizativa.php");

 $idem=$_SESSION["idempresa"];
 $idinicitiva=$_REQUEST["iniciativaid"];

 $objunidadOrganizativa=new unidadOrganizativa();
    if($objunidadOrganizativa!=null){//si se creo el objeto
			    	 if(!$objunidadOrganizativa->open_con())
			    {
			    }
			    elseif ($objunidadOrganizativa->open_con()) 
							    {
							    	$data=$objunidadOrganizativa->mostrar_unidades_empresa($idem,$idinicitiva);
							    	echo json_encode($data);
							    }
		}
