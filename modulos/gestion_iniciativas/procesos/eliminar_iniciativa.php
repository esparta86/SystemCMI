<?php
session_start();
    require_once("../../../recursos/conexion/bd_CIM.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/iniciativaestrategica.php");

$idI=$_REQUEST["id"];
$objiniciativaEstrategica=new iniciativaEstrategica();
    if($objiniciativaEstrategica!=null){
			    	 if(!$objiniciativaEstrategica->open_con())
			    {  }
			    elseif ($objiniciativaEstrategica->open_con()) 
							    {            
							     $estado=$objiniciativaEstrategica->eliminar_iniciativa($idI);
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
