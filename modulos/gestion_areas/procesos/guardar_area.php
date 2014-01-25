<?php
session_start();
    require_once("../../../recursos/conexion/bd_CIM.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/area.php");


$idE=$_REQUEST["idempresa"];
$area=$_REQUEST["area"];


$objarea=new area();
    if($objarea!=null){
			    	 if(!$objarea->open_con())
			    {  }
			    elseif ($objarea->open_con()) 
							    {            
							     $estado=$objarea->guardar_area($idE,$area);
											         
								       switch ($estado) {
								       	case 1:
								       		$data1[] = array('bandera'=>1,'msg'=>'Exito,Se agrego nueva area ');  
								       		break;
								       	case 2:
								       	     $data1[] = array('bandera'=>2,'msg'=>'No se registro ! intente de nuevo.');
								       	     break;
								       	case 3:
								       		 $data1[] = array('bandera'=>2,'msg'=>'Ya existe un area de igual nombre.');
								       	     break;
								        }
							    	echo json_encode($data1);
							    }
		}
