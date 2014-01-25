<?php
session_start();
    require_once("../../../recursos/conexion/bd_CIM.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/control.php");

$idC=$_REQUEST["id"];
$objcontrol=new control();
    if($objcontrol!=null){
			    	 if(!$objcontrol->open_con())
			    {  }
			    elseif ($objcontrol->open_con()) 
							    {            
							     $estado=$objcontrol->eliminar_control($idC);
								       switch ($estado) {
								       	case 1:
								       		$data1[] = array('bandera'=>1,'msg'=>'Exito, Se elimino.');  
								       		break;
								       	case 2:
								       	     $data1[] = array('bandera'=>2,'msg'=>'No se elimino ! intente de nuevo.');
								       	     break;
								       	}
							    	echo json_encode($data1);
							    }
		}
