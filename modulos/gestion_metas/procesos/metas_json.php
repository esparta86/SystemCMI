<?php
	session_start();
    require_once("../../../recursos/conexion/bd_CIM.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/metaoperativa.php");

 $idem=$_SESSION["idempresa"];
 $idiniciativa=$_REQUEST["idI"];

    $objMetaOperativa=new MetaOperativa();
    if($objMetaOperativa!=null){//si se creo el objeto
			    	 if(!$objMetaOperativa->open_con())
			    {
			    }
			    elseif ($objMetaOperativa->open_con()) 
							    {
							    	$data=$objMetaOperativa->listarMetasOperativas($idiniciativa);
							    	echo json_encode($data);
							    }
		}
