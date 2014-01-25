<?php
session_start();
    require_once("../../../recursos/conexion/bd_CIM.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/indicador.php");

$idP=$_SESSION["idplan"];

$idarea=$_REQUEST["idarea"];
$idobj=$_REQUEST["idobj"];
$periodo=$_REQUEST["periodo"];
$corr=$_REQUEST["correlativo"];
$indicador=$_REQUEST["indicador"];
$formula=$_REQUEST["formula"];
$unidad=$_REQUEST["unidad"];
$direcc=$_REQUEST["direccion"];
$check=$_REQUEST["checkbase"];
$lineabase=$_REQUEST["lineab"];
$Fcalculo=$_REQUEST["calculo"];

$idInd=$_REQUEST["idindicador"];

$objindicador=new indicador();
    if($objindicador!=null){
			    	 if(!$objindicador->open_con())
			    {  }
			    elseif ($objindicador->open_con()) 
							    {            
							     $estado=$objindicador->modificar_indicador($idarea,$periodo,$corr,$indicador,$formula,$unidad,$direcc,$check,$lineabase,$idInd,$Fcalculo);
											         
								       switch ($estado) {
								       	case 1:
								       		$data1[] = array('bandera'=>1,'msg'=>'Exito,Se modifico indicador.');  
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
