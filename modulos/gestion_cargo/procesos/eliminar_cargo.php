<?php
session_start();
    require_once("../../../recursos/conexion/bd_CIM.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/cargo.php");

$idC=$_REQUEST["id"];

$objCargo=new Cargo();
    if($objCargo!=null){
			    	 if(!$objCargo->open_con())
			    {  }
			    elseif ($objCargo->open_con()) 
							    {            
							     $estado=$objCargo->eliminar_cargo($idC);
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
