<?php
session_start();
    require_once("../../../recursos/conexion/bd_CIM.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/control.php");

$idP=$_SESSION["idplan"];

$anioid=$_REQUEST["anio"];
$control_d=$_REQUEST["control"];
$observacionControl=$_REQUEST["obsctrol"];
$meta_d=$_REQUEST["meta"];
$observacionMeta=$_REQUEST["obsmeta"];
$controlid=$_REQUEST["idcontrol"];

$objcontrol=new control();
    if($objcontrol!=null){
			    	 if(!$objcontrol->open_con())
			    {  

			    }
			    elseif ($objcontrol->open_con()) 
							    {            
							     $estado=$objcontrol->modificar_control($anioid,$control_d,$observacionControl,$meta_d,$observacionMeta,$controlid);
								       switch ($estado) {
								       	case 1:
								       		$data1[] = array('bandera'=>1,'msg'=>'Exito,Se modifico control.');  
								       		break;
								       	case 2:
								       	     $data1[] = array('bandera'=>2,'msg'=>'No se registro ! intente de nuevo.');
								       	     break;
								       	case 3:
								       		 $data1[] = array('bandera'=>2,'msg'=>'Ya existe un control de igual nombre.');
								       	     break;
								        }
							    	echo json_encode($data1);
							    }
		}
