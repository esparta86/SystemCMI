<?php
session_start();
    require_once("../../../recursos/conexion/bd_CIM.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/foda.php");

$idP=$_SESSION["idplan"];

$descripo=$_REQUEST["descrip"];
$idf=$_REQUEST["idfoda"];


$objfoda=new foda();
    if($objfoda!=null){
			    	 if(!$objfoda->open_con())
			    {  }
			    elseif ($objfoda->open_con()) 
							    {            
							     $estado=$objfoda->modificar_elementofoda($idf,$descripo);
											         
								       switch ($estado) {
								       	case 1:
								       		$data1[] = array('bandera'=>1,'msg'=>'Exito,Se modifico.');  
								       		break;
								       	case 2:
								       	     $data1[] = array('bandera'=>2,'msg'=>'No se registro ! intente de nuevo.');
								       	     break;
								       	
								        }
							    	echo json_encode($data1);
							    }
		}
