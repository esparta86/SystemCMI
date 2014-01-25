<?php
session_start();
    require_once("../../../recursos/conexion/bd_CIM.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/indicador.php");

$idI=$_REQUEST["id"];

$objindicador=new indicador();
    if($objindicador!=null){//si se creo el objeto
			    	 if(!$objindicador->open_con())
			    {  }
			    elseif ($objindicador->open_con()) 
							    {            
							     $estado=$objindicador->eliminar_indicador($idI);
											         
								       switch ($estado) {
								       	case 1:
								       		$data1[] = array('bandera'=>1,'msg'=>'Exito, Se elimino.');  
								       		break;
								       	case 2:
								       	     $data1[] = array('bandera'=>2,'msg'=>'No se elimino,si el indicador posee controles y metas registradas, elimine primero estas');
								       	     break;
								       	}
							    	echo json_encode($data1);
							    }
		}
