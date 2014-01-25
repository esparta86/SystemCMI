<?php
session_start();
    require_once("../../../recursos/conexion/bd_CIM.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/perspectiva.php");

$idp=$_REQUEST["id"];

$objperspectiva=new perspectiva();
    if($objperspectiva!=null){//si se creo el objeto
			    	 if(!$objperspectiva->open_con())
			    {  }
			    elseif ($objperspectiva->open_con()) 
							    {            
							     $estado=$objperspectiva->eliminar_perspectivas($idp);
											         
								       switch ($estado) {
								       	case 1:
								       		$data1[] = array('bandera'=>1,'msg'=>'Exito, Se elimino la perspectiva.');  
								       		break;
								       	case 2:
								       	     $data1[] = array('bandera'=>2,'msg'=>'No se elimino ! intente de nuevo.');
								       	     break;
								       	}
							    	echo json_encode($data1);
							    }
		}
