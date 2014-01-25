<?php
session_start();
    require_once("../../../recursos/conexion/bd_CIM.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/objetivoestrategico.php");

$ido=$_REQUEST["id"];

$objobjetivoestrategico=new objetivoestrategico();
    if($objobjetivoestrategico!=null){//si se creo el objeto
			    	 if(!$objobjetivoestrategico->open_con())
			    {  }
			    elseif ($objobjetivoestrategico->open_con()) 
							    {            
							     $estado=$objobjetivoestrategico->eliminar_objetivo($ido);
											         
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
