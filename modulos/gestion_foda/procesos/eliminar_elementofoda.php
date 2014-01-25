<?php
session_start();
    require_once("../../../recursos/conexion/bd_CIM.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/foda.php");

$idp=$_REQUEST["id"];

$objfoda=new foda();
    if($objfoda!=null){//si se creo el objeto
			    	 if(!$objfoda->open_con())
			    {  }
			    elseif ($objfoda->open_con()) 
							    {            
							     $estado=$objfoda->eliminar_elementofoda($idp);
											         
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
