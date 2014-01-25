<?php
session_start();
    require_once("../../../recursos/conexion/bd_CIM.conf");
    require_once("../../../recursos/adodb/adodb.inc.php");
    require_once("../../../recursos/conexion/conexion.class.php");
    require_once("../../../recursos/class/perspectiva.php");

$idP=$_SESSION["idplan"];
$nombrep=$_REQUEST["nombre"];
$descripp=$_REQUEST["descrip"];
$idper=$_REQUEST["id"];

$objperspectiva=new perspectiva();
    if($objperspectiva!=null){//si se creo el objeto
			    	 if(!$objperspectiva->open_con())
			    {  }
			    elseif ($objperspectiva->open_con()) 
							    {            
							     $estado=$objperspectiva->modificar_perspectiva($nombrep,$descripp,$idper);
											         
								       switch ($estado) {
								       	case 1:
								       		$data1[] = array('bandera'=>1,'msg'=>'Exito, Se modifico la perspectiva.');  
								       		break;
								       	case 2:
								       	     $data1[] = array('bandera'=>2,'msg'=>'No se modifico ! intente de nuevo.');
								       	     break;
								       	case 3:
								       		 $data1[] = array('bandera'=>2,'msg'=>'Ya existe una perspectiva de igual nombre.');
								       	     break;
								        }
							    	echo json_encode($data1);
							    }
		}
