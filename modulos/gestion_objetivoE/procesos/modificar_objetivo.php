<?php
session_start();
    require_once("../../../recursos/conexion/bd_CIM.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/objetivoestrategico.php");

$idP=$_SESSION["idplan"];
$corr=$_REQUEST["correlativo"];
$descripo=$_REQUEST["descrip"];
$idPers=$_REQUEST["idp"];
$idobj=$_REQUEST["idobj"];

$objobjetivoestrategico=new objetivoestrategico();
    if($objobjetivoestrategico!=null){
			    	 if(!$objobjetivoestrategico->open_con())
			    {  }
			    elseif ($objobjetivoestrategico->open_con()) 
							    {            
							     $estado=$objobjetivoestrategico->modificar_objetivo($idPers,$corr,$descripo,$idobj);
											         
								       switch ($estado) {
								       	case 1:
								       		$data1[] = array('bandera'=>1,'msg'=>'Exito,Se modifico Objetivo estrategico.');  
								       		break;
								       	case 2:
								       	     $data1[] = array('bandera'=>2,'msg'=>'No se registro ! intente de nuevo.');
								       	     break;
								       	case 3:
								       		 $data1[] = array('bandera'=>2,'msg'=>'Ya existe un objetivo de igual nombre.');
								       	     break;
								        }
							    	echo json_encode($data1);
							    }
		}
