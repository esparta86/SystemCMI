<?php
session_start();
    require_once("../../../recursos/conexion/bd_CIM.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/planestrategico.php");

$idplan=$_REQUEST["id"];

$objplanestrategico=new planestrategico();
    if($objplanestrategico!=null){//si se creo el objeto
			    	 if(!$objplanestrategico->open_con())
			    {  }
			    elseif ($objplanestrategico->open_con()) 
							    {            
							     $estado=$objplanestrategico->eliminar_plan($idplan);
											         
								       switch ($estado) {
								       	case 1:
								       		$data1[] = array('bandera'=>1,'msg'=>'Exito, Se elimino el plan estrategico.');  
								       		break;
								       	case 2:
								       	     $data1[] = array('bandera'=>2,'msg'=>'No se registro ! intente de nuevo.');
								       	     break;
								       	case 3:
								       		 $data1[] = array('bandera'=>2,'msg'=>'Ya existe un plan estrategico.');
								       	     break;
								        }
							    	echo json_encode($data1);
							    }
		}
