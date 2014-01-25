<?php
session_start();
    require_once("../../../recursos/conexion/bd_CIM.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/foda.php");

$idP=$_SESSION["idplan"];

$descripo=$_REQUEST["descrip"];
$idPers=$_REQUEST["idp"];
$tipoFactor=$_REQUEST["tipo"];


$objfoda=new foda();
    if($objfoda!=null){
			    	 if(!$objfoda->open_con())
			    {  }
			    elseif ($objfoda->open_con()) 
							    {            
							     $estado=$objfoda->guardar_elementofoda($idPers,$tipoFactor,$descripo);
											         
								       switch ($estado) {
								       	case 1:
								       		$data1[] = array('bandera'=>1,'msg'=>'Exito,Se registro.');  
								       		break;
								       	case 2:
								       	     $data1[] = array('bandera'=>2,'msg'=>'No se registro ! intente de nuevo.');
								       	     break;
								       	
								        }
							    	echo json_encode($data1);
							    }
		}
